import { UserRegisterResponseDTO } from "@services/user/dtos/response/UserRegisterResponseDTO";

export interface CompanyRegisterResponseDTO extends UserRegisterResponseDTO {
  companyName?: string;
}
