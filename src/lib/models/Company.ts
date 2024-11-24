import { Address } from "./Address";

export interface Company {
  address: Address;
  nameCompany: string;
  phone: string;
  id?: string;
  linkComp: string;
  numberEmp: string;
  businessType: string;
  description: string;
  businessRegistrationNumber: string;
  updatedDateTime: Date;
  createdDateTime: Date;
}
