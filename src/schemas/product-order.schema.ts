import z from "zod";

/** Registro de Pedido e Produto :: Avançado */
const productSchema = z.object({
  productName: z.string().min(1, "Nome do produto obrigatório"),
  quantity: z.number().min(1, "Quantidade mínima 1"),
  price: z.number().min(0.01, "Preço inválido"),
});

export const orderSchema = z
  .object({
    customerName: z.string().min(3, "Nome do cliente obrigatório"),
    products: z.array(productSchema).min(1, "Adicione pelo menos um item"),
    discountCode: z.string().optional(),
    total: z.number(),
  })
  .refine(
    (fields) => {
      const calculedTotal = fields.products.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0,
      );
      return fields.total === calculedTotal;
    },
    { error: "Total inválido", path: ["total"] },
  )
  .refine((fields) => (fields.total > 100 ? !!fields.discountCode : true), {
    error: "Código de desconto obrigatório para pedidos acima de R$ 100,00",
    path: ["discountCode"],
  });

export type TProductSchema = z.infer<typeof productSchema>;
export type TOrderSchema = z.infer<typeof orderSchema>;

const productDefaultValues: TProductSchema = {
  productName: "",
  quantity: 0,
  price: 0,
};

export const orderDefaultValues: TOrderSchema = {
  customerName: "",
  products: [productDefaultValues],
  discountCode: "",
  total: 0,
};
