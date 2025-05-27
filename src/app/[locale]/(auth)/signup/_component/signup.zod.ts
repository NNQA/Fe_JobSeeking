
import { z } from "zod";
export                                                                                                                                                   const SignUpSchema = (t: (arg: string) => string) => {
  return z.object({
    email: z
      .string({ required_error: t("email.err") })
      .email(t("email.invalid")),
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