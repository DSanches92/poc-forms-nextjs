import { z } from "zod";

/** Registro de Usuário :: Intermediário */
export const userSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.email("Email inválido"),
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .regex(/[A-Z]/, "Deve conter uma letra maiúscula")
      .regex(/[0-9]/, "Deve conter um número"),
    confirmPassword: z.string(),
    type: z.enum(["Individual", "Empresa"]),
    cnpj: z.string().optional(),
    terms: z
      .boolean()
      .refine((value) => value === true, "Você deve aceitar os termos"),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    error: "Senhas não coincidem",
    path: ["confirmPassword"],
  })
  .refine(
    (fields) => (fields.type === "Empresa" ? fields.cnpj?.length === 14 : true),
    {
      error: "CNPJ deve ter 14 dígitos",
      path: ["cnpj"],
    },
  );

export type TUserSchema = z.infer<typeof userSchema>;

export const userDefaultValues: TUserSchema = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  type: "Individual",
  cnpj: "",
  terms: false,
};
