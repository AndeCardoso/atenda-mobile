import { AxiosHttpClient } from "@http/httpClient";
import { HttpResponse } from "@model/http/httpClient";
import { GetStatesRequestDTO } from "./dtos/request/GetStatesRequestDTO";
import { GetStatesResponseDTO } from "./dtos/response/GetStatesResponseDTO";
import { GetCitiesResponseDTO } from "./dtos/response/GetCitiesResponseDTO";
import { GetCitiesRequestDTO } from "./dtos/request/GetCitiesRequestDTO";

export default class LocationService {
  public async stateList({
    orderBy,
    view,
  }: GetStatesRequestDTO): Promise<HttpResponse<GetStatesResponseDTO[]>> {
    return await new AxiosHttpClient().request({
      method: "get",
      url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
      params: { orderBy, view },
    });
  }

  public async cityList({
    state,
    orderBy,
    view,
  }: GetCitiesRequestDTO): Promise<HttpResponse<GetCitiesResponseDTO[]>> {
    return await new AxiosHttpClient().request({
      method: "get",
      url: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
      params: { orderBy, view },
    });
  }
}
