import { AxiosHttpClient } from "@http/httpClient";
import { ServiceOrderRegisterRequestDTO } from "./dtos/request/ServiceOrderRegisterRequestDTO";
import { ServiceOrderRegisterResponseDTO } from "./dtos/response/ServiceOrderRegisterResponseDTO";
import { HttpResponse } from "@model/http/httpClient";
import {
  IPaginationParams,
  IPaginationResponse,
} from "@model/http/paginationRequest";
import { ServiceOrderGetRequestDTO } from "./dtos/request/ServiceOrderGetRequestDTO";
import { ServiceOrderGetResponseDTO } from "./dtos/response/ServiceOrderGetResponseDTO";
import { SignatureRequestDTO } from "./dtos/request/SignatureRequestDTO";
import { SignatureResponseDTO } from "./dtos/response/SignatureResponseDTO";
import { convertUint8ArrayToUri } from "@utils/convertUint8ArrayToUri";

export default class ServiceOrderService {
  public async register(
    body: ServiceOrderRegisterRequestDTO
  ): Promise<HttpResponse<ServiceOrderRegisterResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "post",
      url: "service-order/",
      body,
    });
  }

  public async registerSignature(
    body: SignatureRequestDTO
  ): Promise<HttpResponse<SignatureResponseDTO>> {
    const uri = await convertUint8ArrayToUri(body.signature);

    const formData = new FormData();

    // formData.append("signature", uri);

    return await new AxiosHttpClient().request({
      method: "post",
      url: "service-order/signature",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });
  }

  public async update(
    serviceOrderId: number,
    body: ServiceOrderRegisterRequestDTO
  ): Promise<HttpResponse<ServiceOrderRegisterResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "put",
      url: `service-order/${serviceOrderId}`,
      body,
    });
  }

  public async get({
    serviceOrderId,
  }: ServiceOrderGetRequestDTO): Promise<
    HttpResponse<ServiceOrderGetResponseDTO>
  > {
    return await new AxiosHttpClient().request({
      method: "get",
      url: `service-order/${serviceOrderId}`,
    });
  }

  public async list({
    limit,
    page,
    column,
    order,
    search,
  }: IPaginationParams<"id" | "status" | "created_at">): Promise<
    HttpResponse<IPaginationResponse<ServiceOrderRegisterResponseDTO>>
  > {
    return await new AxiosHttpClient().request({
      method: "get",
      url: "service-order/list",
      params: { limit, page, column, order, search },
    });
  }
}
