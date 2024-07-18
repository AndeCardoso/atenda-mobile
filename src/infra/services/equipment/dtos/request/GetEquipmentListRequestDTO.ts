import { IPaginationParams } from "@model/http/paginationRequest";

export interface GetEquipmentListRequestDTO
  extends IPaginationParams<"nickname" | "status"> {
  searchType?: "nickname" | "customerName";
  customerId?: number;
}
