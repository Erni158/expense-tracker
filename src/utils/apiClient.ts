import { ApiMethods } from "../types";

export const apiClient = async <T>(url: string, method: ApiMethods, data = {}): Promise<T> => {

  if (method === ApiMethods.GET) {
    return fetch(url).then(async response => {
      if (response.status === 401) return Promise.reject({ message: 'Error' });
      if (response.status === 201) return null;
    
      const data = await response.json();
    
      if (response.ok) return data;
    })
  }

  if (method === ApiMethods.POST) {
    return fetch(url, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }).then(async response => {
      if (response.status === 401) return Promise.reject({ message: 'Error' });
      if (response.status === 201) return null;
    
      const data = await response.json();
    
      if (response.ok) return data;
    })
  }

  return Promise.reject(new Error("No method provided"));
}
