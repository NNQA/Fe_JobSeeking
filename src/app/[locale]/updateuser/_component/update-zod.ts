

import z from "zod";


export const UpdateNewUser = (t: (arg: string) => string) => {
  return z.object({
    phone: z.string().min(1, "Số điện thoại được yêu cầu"),
    name: z.string().min(1, "Tên được yêu cầu"),
    university: z.string().min(1, "Trường đại học được yêu cầu"),
    experiencelevel: z.string(),
})}
  