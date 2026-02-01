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
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  TUserSchema,
  userDefaultValues,
  userSchema,
} from "@/schemas/user-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home } from "lucide-react";
import Link from "next/link";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

export default function ReactHookFormUser() {
  const form = useForm<TUserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: userDefaultValues,
  });

  const type = useWatch({
    control: form.control,
    name: "type",
    defaultValue: "Individual",
  });

  function onSubmit(formData: TUserSchema) {
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
          Cadastro Usuário{" "}
          <small className="text-muted-foreground ml-1">[Ract Hook Form]</small>
        </CardTitle>
        <CardDescription>
          Cadastro com o formulário abaixo para receber e-mails a rodo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-user" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Nome</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    placeholder="Nome completo"
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
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    placeholder="exemplo@exemplo.com"
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
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
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
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirmar Senha
                  </FieldLabel>
                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
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
              name="type"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="type-user">Tipo</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="type-user"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Individual">Individual</SelectItem>
                      <SelectItem value="Empresa">Empresa</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {type === "Empresa" && (
              <Controller
                control={form.control}
                name="cnpj"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="cnpj">CNPJ</FieldLabel>
                    <Input
                      {...field}
                      id="cnpj"
                      placeholder="00.000.000/0000-00"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}

            <Controller
              control={form.control}
              name="terms"
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <Switch
                    id="terms"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldContent>
                    <FieldLabel htmlFor="terms">Aceito os termos</FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-user">
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
