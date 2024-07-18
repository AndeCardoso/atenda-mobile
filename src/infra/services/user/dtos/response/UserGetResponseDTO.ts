export interface UserGetResponseDTO {
  id: number;
  name?: string;
  email: string;
  admin?: boolean;
  updated_at: Date;
}
