import { IPaginationParams } from "@model/http/paginationRequest";

export interface GetEquipmentListRequestDTO
  extends IPaginationParams<"nickname" | "status"> {
  customerId: number;
}
