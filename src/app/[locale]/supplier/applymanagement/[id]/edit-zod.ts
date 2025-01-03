import z from "zod";
export const EJobTypeZod = z.enum([
  "Part-Time",
  "Full-Time",
  "Co-working",
  "Freelance",
  "Seasonal",
  "Remote",
]);
export const AddressSchema = z.object({
  street: z.string(),
  ward: z.string(),
  district: z.string(),
  city: z.string(),
  formatted_address: z.string(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

export const WorkSchemaEdit = (t: (arg: string) => string) => {
  return z.object({
    title: z.string().min(1,t("title.err")),
    description: z.string().min(1, t("description.err")),
    address: z.string().min(1, t("address.err")),
    experience: z.string().min(1),
    position: z.string().min(1),
    salary: z.number().int(),
    expireDate: z.coerce.date().refine(
      (date) => {
        return date >= new Date();
      },
      {
        message: "error",
      }
    ),
    skill: z.array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    ),
    category: z
      .array(
        z.object({
          id: z.string(),
          text: z.string(),
        })
      )
      .nonempty(t("category.err")),
    jobtype: EJobTypeZod,
  });
};
