export type IHttpRequest = {
  url: string;
  method: IHttpMethod;
  body?: any;
  params?: any;
  headers?: any;
};

export interface IHttpClient<R = any> {
  request: (data: IHttpRequest) => Promise<HttpResponse<R>>;
}

export type IHttpMethod = "post" | "get" | "put" | "patch" | "delete";

export type HttpResponse<T = any> = {
  statusCode: number;
  body: T;
};
