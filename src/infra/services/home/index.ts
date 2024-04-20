import { AxiosHttpClient } from "@http/httpClient";
import { HttpResponse } from "@model/http/httpClient";
import { AdvertiseGetResponseDTO } from "./dtos/response/AdvertiseGetResponseDTO";

export default class HomeService {
  public async getAdvertise(): Promise<HttpResponse<AdvertiseGetResponseDTO>> {
    return await new AxiosHttpClient().request({
      method: "get",
      url: `home/advertise/`,
    });
  }
}
