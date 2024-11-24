import z from "zod";


export const CompanyEditSchema = (t: (arg: string) => string) => {
    return z
      .object({
        phone: z.string(),
        address: z.string(),
        nameCompany: z.string(),
        linkComp: z.string(),
        numberEmp: z.string(),
        businessType: z.string(),
        description: z.string(),
        businessRegistrationNumber: z.string(),
      })
      .partial(); 
}
  