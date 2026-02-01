import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import ReactHookFormOrder from "./_react-hook-form";

export const metadata: Metadata = {
  title: "Cadastro Produto",
};

export default function ProductRegisterForms() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-black/[.145]">
      <Tabs defaultValue="react-hook-form" className="w-full sm:max-w-xl">
        <TabsList className="w-full">
          <TabsTrigger value="react-hook-form">React Hook Form</TabsTrigger>
          <TabsTrigger value="tanstack-form">TansTack Form</TabsTrigger>
        </TabsList>
        <TabsContent value="react-hook-form">
          <ReactHookFormOrder />
        </TabsContent>
        <TabsContent value="tanstack-form">Content 2</TabsContent>
      </Tabs>
    </div>
  );
}
