"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  orderDefaultValues,
  orderSchema,
  TOrderSchema,
} from "@/schemas/product-order.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home, Trash2 } from "lucide-react";
import Link from "next/link";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

export default function ReactHookFormOrder() {
  const form = useForm<TOrderSchema>({
    resolver: zodResolver(orderSchema),
    defaultValues: orderDefaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const products = useWatch({
    control: form.control,
    name: "products",
  });

  function onSubmit(formData: TOrderSchema) {
    toast("Você enviou os seguintes valores:", {
      description: (
        <pre className="bg-muted text-muted-foreground mt-2 w-80 overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(formData, null, 2)}</code>
        </pre>
      ),
      position: "top-center",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radiues": "calc(var(--radius) + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Registrar Pedido{" "}
          <span className="text-muted-foreground ml-1">[Reack Hook Form]</span>
        </CardTitle>
        <CardDescription>
          Formalize um pedido conosco e receba todos os dias um email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-order" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="customerName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="customerName">Nome Cliente</FieldLabel>
                  <Input
                    {...field}
                    id="customerName"
                    placeholder="New Holand"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="total"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="total">Valor Total</FieldLabel>
                  <Input
                    {...field}
                    id="total"
                    readOnly
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="discountCode"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="discountCode">
                    Código do Disconto
                  </FieldLabel>
                  <Input
                    {...field}
                    id="discountCode"
                    placeholder="D-19"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <FieldSet className="gap-4">
              <FieldLegend variant="label">Produtos</FieldLegend>
              <FieldDescription>
                Adicione em seu pedidos os Produtos que quiser.
              </FieldDescription>
              <FieldGroup>
                {products.map((product, index) => (
                  <div key={index} className="relative border-b pb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 flex items-end gap-2">
                        <div className="flex-1">
                          <Controller
                            control={form.control}
                            name={`products.${index}.productName`}
                            render={({
                              field: controllerField,
                              fieldState,
                            }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={`${index}.productName`}>
                                  Produto
                                </FieldLabel>
                                <Input
                                  {...controllerField}
                                  id={`${index}.productName`}
                                  placeholder="Bala 7 Belo"
                                  autoComplete="off"
                                  aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => remove(index)}
                        >
                          <Trash2 />
                        </Button>
                      </div>

                      <div className="col-span-1">
                        <Controller
                          control={form.control}
                          name={`products.${index}.price`}
                          render={({ field: controllerField, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={`${index}.price`}>
                                Valor
                              </FieldLabel>
                              <Input
                                {...controllerField}
                                id={`${index}.price`}
                                placeholder="4,90"
                                autoComplete="off"
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </div>
                      <div className="col-span-1">
                        <Controller
                          control={form.control}
                          name={`products.${index}.quantity`}
                          render={({ field: controllerField, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={`${index}.quantity`}>
                                Quantidade
                              </FieldLabel>
                              <Input
                                {...controllerField}
                                id={`${index}.quantity`}
                                placeholder="5"
                                autoComplete="off"
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({ productName: "", price: 0, quantity: 0 })
                  }
                  disabled={fields.length >= 5}
                >
                  Adicionar Produto
                </Button>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-order">
            Submit
          </Button>

          <Button type="button" className="ml-auto" variant="link" asChild>
            <Link href="/">
              <Home />
            </Link>
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
