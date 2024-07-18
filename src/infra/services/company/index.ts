import { AxiosHttpClient } from "@http/httpClient";
import { CompanyRegisterRequestDTO } from "./dtos/request/CompanyRegisterRequestDTO";
import { CompanyRegisterResponseDTO } from "./dtos/response/CompanyRegisterResponseDTO";
import { HttpResponse } from "@model/http/httpClient";

export default class CompanyService {
  public async register({
    companyName,
    companyDocument,
    name,
    email,
    password,
  }: CompanyRegisterRequestDTO): Promise<
    HttpResponse<CompanyRegisterResponseDTO>
  > {
    return await new AxiosHttpClient().request({
      method: "post",
      url: "company/",
      body: { companyName, companyDocument, name, email, password },
    });
  }
}
