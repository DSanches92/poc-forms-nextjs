import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import ReactHookFormUser from "./_react-hook-form";
import TansTackForm from "./_tanstack-form";

export const metadata: Metadata = {
  title: "Cadastro Usuário",
};

export default function UserRegisterForms() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-black/[.145]">
      <Tabs defaultValue="react-hook-form" className="w-full sm:max-w-md">
        <TabsList className="w-full">
          <TabsTrigger value="react-hook-form">React Hook Form</TabsTrigger>
          <TabsTrigger value="tanstack-form">TansTack Form</TabsTrigger>
        </TabsList>
        <TabsContent value="react-hook-form">
          <ReactHookFormUser />
        </TabsContent>
        <TabsContent value="tanstack-form">
          <TansTackForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
