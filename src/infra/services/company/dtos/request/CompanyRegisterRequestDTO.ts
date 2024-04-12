import { UserRegisterRequestDTO } from "@services/user/dtos/request/UserRegisterRequestDTO";

export interface CompanyRegisterRequestDTO extends UserRegisterRequestDTO {
  companyName?: string;
}
