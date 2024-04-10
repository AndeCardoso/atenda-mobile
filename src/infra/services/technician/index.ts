import { AxiosHttpClient } from "@http/httpClient";
import { TechnicianRegisterRequestDTO } from "./dtos/request/TechnicianRegisterRequestDTO";
import { TechnicianRegisterResponseDTO } from "./dtos/response/TechnicianRegisterResponseDTO";
import { HttpResponse } from "@model/http/httpClient";
import {
  IPaginationParams,
  IPaginationResponse,
} from "@model/http/paginationRequest";
import { TechnicianGetRequestDTO } from "./dtos/request/TechnicianGetRequestDTO";
import { TechnicianGetResponseDTO } from "./dtos/response/TechnicianGetResponseDTO";

export default class TechnicianService {
  public async register(
    body: TechnicianRegisterRequestDTO
  ): Promise<HttpResponse<TechnicianRegisterResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "post",
      url: "technician/",
      body,
    });
  }

  public async update(
    technicianId: number,
    body: TechnicianRegisterRequestDTO
  ): Promise<HttpResponse<TechnicianRegisterResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "put",
      url: `technician/${technicianId}`,
      body,
    });
  }

  public async get({
    technicianId,
  }: TechnicianGetRequestDTO): Promise<HttpResponse<TechnicianGetResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "get",
      url: `technician/${technicianId}`,
    });
  }

  public async list({
    limit,
    page,
    column,
    order,
    search,
  }: IPaginationParams<"name" | "cpf">): Promise<
    HttpResponse<IPaginationResponse<TechnicianRegisterResponseDTO>>
  > {
    return await new AxiosHttpClient().request({
      method: "get",
      url: "technician/list",
      params: { limit, page, column, order, search },
    });
  }
}
