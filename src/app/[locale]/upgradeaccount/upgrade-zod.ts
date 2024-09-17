import { z } from "zod";
export const upgradeAccountSchema = (t: (arg: string) => string) => {
  return z.object({
    email: z
        .string({}).optional(),
    phone: z
        .string({ required_error: t("phone.err") }).min(4),
    company: z
        .string({ required_error: t("company.err") })
        .min(1, { message: t("phone.err") }),
    address: z
        .string({ required_error: t("province.err") })
        .min(1, { message: t("phone.err") })
  });
};
