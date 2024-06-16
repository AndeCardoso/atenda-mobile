import { AxiosHttpClient } from "@http/httpClient";
import { HttpResponse } from "@model/http/httpClient";
import { GetAdvertiseResponseDTO } from "./dtos/response/GetAdvertiseResponseDTO";
import { EquipmentGetResponseDTO } from "@services/equipment/dtos/response/EquipmentGetResponseDTO";
import { ServiceOrderGetResponseDTO } from "@services/serviceOrder/dtos/response/ServiceOrderGetResponseDTO";
import { GetDatasInfoResponseDTO } from "./dtos/response/GetDatasInfoResponseDTO";

export default class HomeService {
  public async getAdvertise(): Promise<HttpResponse<GetAdvertiseResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "get",
      url: `home/advertise/`,
    });
  }

  public async getEquipmentQueue(): Promise<
    HttpResponse<EquipmentGetResponseDTO[]>
  > {
    return await new AxiosHttpClient().request({
      method: "get",
      url: `home/equipment-queue/`,
    });
  }

  public async getServiceOrderList(): Promise<
    HttpResponse<ServiceOrderGetResponseDTO[]>
  > {
    return await new AxiosHttpClient().request({
      method: "get",
      url: `home/so-list/`,
    });
  }

  public async getDatasInfo(): Promise<HttpResponse<GetDatasInfoResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "get",
      url: `home/so-datas/`,
    });
  }
}
