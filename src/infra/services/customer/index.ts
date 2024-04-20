import { AxiosHttpClient } from "@http/httpClient";
import { CustomerRegisterRequestDTO } from "./dtos/request/CustomerRegisterRequestDTO";
import { CustomerRegisterResponseDTO } from "./dtos/response/CustomerRegisterResponseDTO";
import { HttpResponse } from "@model/http/httpClient";
import {
  IPaginationParams,
  IPaginationResponse,
} from "@model/http/paginationRequest";
import { CustomerGetRequestDTO } from "./dtos/request/CustomerGetRequestDTO";
import { CustomerGetResponseDTO } from "./dtos/response/CustomerGetResponseDTO";

export default class CustomerService {
  public async register(
    body: CustomerRegisterRequestDTO
  ): Promise<HttpResponse<CustomerRegisterResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "post",
      url: "customer/",
      body,
    });
  }

  public async update(
    customerId: number,
    body: CustomerRegisterRequestDTO
  ): Promise<HttpResponse<CustomerRegisterResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "put",
      url: `customer/${customerId}`,
      body,
    });
  }

  public async get({
    customerId,
  }: CustomerGetRequestDTO): Promise<HttpResponse<CustomerGetResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "get",
      url: `customer/${customerId}`,
    });
  }

  public async list({
    limit,
    page,
    column,
    order,
    search,
  }: IPaginationParams<"name" | "document">): Promise<
    HttpResponse<IPaginationResponse<CustomerRegisterResponseDTO>>
  > {
    return await new AxiosHttpClient().request({
      method: "get",
      url: "customer/list",
      params: { limit, page, column, order, search },
    });
  }
}
