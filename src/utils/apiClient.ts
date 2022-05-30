import { ApiMethods } from "../types";

export const apiClient = async <T>(url: string, method: ApiMethods, data = {}): Promise<T> => {
  const token = localStorage.getItem("loginToken");

  if (method === ApiMethods.GET) {
    const config = {
      method: ApiMethods.GET,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }
    return fetch(url, config).then(async response => {
      if (response.status === 401) return Promise.reject({ message: 'Error' });
      if (response.status === 201) return null;

      const data = await response.json();
    
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    })
  }

  if (method === ApiMethods.POST) {
    const config = {
      method: method || ApiMethods.GET,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }
    return fetch(url, config).then(async response => {
      if (response.status === 401) return Promise.reject({ message: 'Error' });
      if (response.status === 201) return null;

      const data = await response.json();
    
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
         
    })
  }

  return Promise.reject(new Error("No method provided"));
}
