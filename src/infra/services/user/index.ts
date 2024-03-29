import { AxiosHttpClient } from "@http/httpClient";
import { UserRegisterRequestDTO } from "./dtos/request/UserRegisterRequestDTO";
import { UserRegisterResponseDTO } from "./dtos/response/UserRegisterResponseDTO";
import { HttpResponse } from "@model/http/httpClient";

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
}
