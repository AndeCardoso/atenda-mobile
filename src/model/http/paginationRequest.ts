export interface IPaginationParams<T> {
  page?: number;
  limit?: number;
  order?: TOrderTypes;
  column?: T;
  search?: string;
}

export type TOrderTypes = "asc" | "desc";

export enum orderEnum {
  ASC = "asc",
  DESC = "desc",
}

export interface IPaginationResponse<T> {
  data: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}