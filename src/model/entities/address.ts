export interface IAddressModel {
  id?: string | number;
  nickname?: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  state: string;
  city: string;
}
