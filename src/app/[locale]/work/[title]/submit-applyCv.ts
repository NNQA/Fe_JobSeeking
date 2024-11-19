import z from "zod";
export const ApplyCvSchema = (t: (arg: string) => string) => {
    return z.object({
      email: z.string().email(),
      name: z.string(),
      phone: z
      .string().min(4)  ,
      resume: z.instanceof(File).refine((file) => file.size < 7000000, {
        message: 'Your resume must be less than 7MB.',
      }),
    
    });
  };
  