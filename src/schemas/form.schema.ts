import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(5).max(32),
  description: z.string().min(20).max(100),
});

export type TFormSchema = z.infer<typeof formSchema>;

export const defaultValues: TFormSchema = {
  title: "",
  description: "",
};
