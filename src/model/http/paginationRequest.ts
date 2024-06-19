export interface IPaginationParams<T> {
  page?: number;
  limit?: number;
  order?: TOrderTypes;
  column?: T;
  search?: string;
  customer?: number;
  equipment?: number;
  technician?: number;
  statusFilter?: number[];
}

export type TOrderTypes = "asc" | "desc";

export enum orderEnum {
  ASC = "asc",
  DESC = "desc",
}

export interface IPaginationResponse<T> {
  dataList: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}
