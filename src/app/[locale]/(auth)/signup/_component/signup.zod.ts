
import { z } from "zod";
export const SignUpSchema = (t: (arg: string) => string) => {
  return z.object({
    email: z
      .string()
      .email(t("email.invalid"))
      .min(1, { message: t("email.required") }),
    password: z
      .string()
      .min(1, { message: t("password.required") })
      .min(8, { message: t("password.length") })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: t("password.complexity") }
      ),
  });
};                                                                              