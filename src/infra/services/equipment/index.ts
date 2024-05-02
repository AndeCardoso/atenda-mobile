import { AxiosHttpClient } from "@http/httpClient";
import { EquipmentRegisterRequestDTO } from "./dtos/request/EquipmentRegisterRequestDTO";
import { EquipmentRegisterResponseDTO } from "./dtos/response/EquipmentRegisterResponseDTO";
import { HttpResponse } from "@model/http/httpClient";
import { IPaginationResponse } from "@model/http/paginationRequest";
import { GetEquipmentListRequestDTO } from "./dtos/request/GetEquipmentListRequestDTO";
import { EquipmentGetResponseDTO } from "./dtos/response/EquipmentGetResponseDTO";

export default class EquipmentService {
  public async register(
    body: EquipmentRegisterRequestDTO
  ): Promise<HttpResponse<EquipmentRegisterResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "post",
      url: "equipment/",
      body,
    });
  }

  public async update(
    equipmentId: number,
    body: EquipmentRegisterRequestDTO
  ): Promise<HttpResponse<EquipmentRegisterResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "put",
      url: `equipment/${equipmentId}`,
      body,
    });
  }

  public async get(
    equipmentId: number
  ): Promise<HttpResponse<EquipmentGetResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "get",
      url: `equipment/${equipmentId}`,
    });
  }

  public async list({
    limit,
    page,
    column,
    order,
    search,
    customerId,
  }: GetEquipmentListRequestDTO): Promise<
    HttpResponse<IPaginationResponse<EquipmentRegisterResponseDTO>>
  > {
    return await new AxiosHttpClient().request({
      method: "get",
      url: "equipment/list",
      params: { limit, page, column, order, search, customerId },
    });
  }
}
