import { AxiosHttpClient } from "@http/httpClient";
import { AuthenticationRequestDTO } from "./dtos/AuthenticationRequestDTO";
import { AuthenticationResponseDTO } from "./dtos/AuthenticationResponseDTO";
import { HttpResponse } from "@model/http/httpClient";

export default class AuthService {
  public async authentication({
    email,
    password,
  }: AuthenticationRequestDTO): Promise<
    HttpResponse<AuthenticationResponseDTO>
  > {
    return await new AxiosHttpClient().request({
      method: "post",
      url: "auth/",
      body: { email, password },
    });
  }
}
