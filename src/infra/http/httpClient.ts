import axios from "axios";
import { HttpStatusCode } from "axios";
import {
  HttpResponse,
  IHttpClient,
  IHttpRequest,
} from "@model/http/httpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncAuthEnum } from "@model/asyncStorage/auth";

interface CreateHeadersProps {
  token?: string | null;
  headers?: any;
}

export class AxiosHttpClient implements IHttpClient {
  private baseUrl: string;
  private apiUrl = process.env.EXPO_PUBLIC_API_URL;
  private token?: string;

  constructor(baseUrl?: string, token?: string) {
    this.baseUrl = baseUrl ?? `${this.apiUrl}`;
    this.token = token;
  }

  async request(data: IHttpRequest): Promise<HttpResponse> {
    try {
      const response = await axios.request({
        baseURL: this.baseUrl,
        url: data.url,
        method: data.method,
        data: data.body,
        params: data.params,
        headers: this.createHeaders({
          token:
            this.token ?? (await AsyncStorage.getItem(AsyncAuthEnum.TOKEN)),
          headers: data.headers,
        }),
        timeoutErrorMessage: "timeout",
        timeout: 90000,
      });

      return {
        statusCode: response.status,
        body: response.data,
      };
    } catch (err: any) {
      if (err?.response?.status === HttpStatusCode.Unauthorized) {
        await AsyncStorage.removeItem(AsyncAuthEnum.TOKEN);
      }
      if (err?.response?.status === HttpStatusCode.InternalServerError) {
      }

      return {
        statusCode: err?.response?.status,
        body: err?.response?.data,
      };
    }
  }

  private createHeaders({ token, headers }: CreateHeadersProps) {
    const tokenAuth = token ? { authorization: `${token}` } : null;
    return {
      "Content-Type": "application/json",
      ...tokenAuth,
      ...(headers && headers),
    };
  }
}
