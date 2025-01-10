import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
});

export const testFormSchema = z.object({
  firstName: z.string().min(10),
  lastName: z.string().min(10),
  age: z.number().min(18)
})