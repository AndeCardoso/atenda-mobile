import { AxiosHttpClient } from "@http/httpClient";
import { HttpResponse } from "@model/http/httpClient";

import { AuthenticationRequestDTO } from "./dtos/request/AuthenticationRequestDTO";
import { SendRecoverTokenRequestDTO } from "./dtos/request/SendRecoverTokenRequestDTO";
import { RecoverPasswordRequestDTO } from "./dtos/request/RecoverPasswordRequestDTO";

import { AuthenticationResponseDTO } from "./dtos/response/AuthenticationResponseDTO";
import { SendRecoverTokenResponseDTO } from "./dtos/response/SendRecoverTokenResponseDTO";
import { RecoverPasswordResponseDTO } from "./dtos/response/RecoverPasswordResponseDTO";

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

  public async sendRecoverToken({
    email,
  }: SendRecoverTokenRequestDTO): Promise<
    HttpResponse<SendRecoverTokenResponseDTO>
  > {
    return await new AxiosHttpClient().request({
      method: "post",
      url: "auth/recover/",
      body: { email },
    });
  }

  public async recoverPassword({
    email,
    password,
    token,
  }: RecoverPasswordRequestDTO): Promise<
    HttpResponse<RecoverPasswordResponseDTO>
  > {
    return await new AxiosHttpClient().request({
      method: "put",
      url: "auth/recover/",
      body: { email, password, token },
    });
  }
}
