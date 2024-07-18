import { AxiosHttpClient } from "@http/httpClient";
import { UserRegisterRequestDTO } from "./dtos/request/UserRegisterRequestDTO";
import { UserRegisterResponseDTO } from "./dtos/response/UserRegisterResponseDTO";
import { HttpResponse } from "@model/http/httpClient";
import { UserGetRequestDTO } from "./dtos/request/UserGetRequestDTO";
import {
  IPaginationParams,
  IPaginationResponse,
} from "@model/http/paginationRequest";
import { UserGetResponseDTO } from "./dtos/response/UserGetResponseDTO";

export default class UserService {
  public async register({
    name,
    email,
    password,
  }: UserRegisterRequestDTO): Promise<HttpResponse<UserRegisterResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "post",
      url: "user/",
      body: { name, email, password },
    });
  }

  public async update(
    userId: number,
    body: UserRegisterRequestDTO
  ): Promise<HttpResponse<UserGetResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "put",
      url: `user/${userId}`,
      body,
    });
  }

  public async get({
    userId,
  }: UserGetRequestDTO): Promise<HttpResponse<UserGetResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "get",
      url: `user/${userId}`,
    });
  }

  public async list({
    limit,
    page,
    column,
    order,
    search,
  }: IPaginationParams<"name" | "email">): Promise<
    HttpResponse<IPaginationResponse<UserGetResponseDTO>>
  > {
    return await new AxiosHttpClient().request({
      method: "get",
      url: "user/list",
      params: { limit, page, column, order, search },
    });
  }
}
