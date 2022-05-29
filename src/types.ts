export enum ApiMethods {
  GET = "GET",
  POST = "POST",
}

export interface User {
  _id: string;
  email: string;
  name: string;
  token: string;
}