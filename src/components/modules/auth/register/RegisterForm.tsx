/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Logo from "@/public/open-enrollment.gif";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  image?: FileList;
}

export default function RegisterForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");
  const router = useRouter();
  const { setIsLoading } = useUser();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // console.log("Form Data Submitted:", data);
    try {
      setIsLoading(true);
      const res = await registerUser(data);
      // console.log(res);
      if (res?.success) {
        toast.success(`${res?.message} please login`);
        router.push("/login");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-xl flex w-full max-w-3xl overflow-hidden">
        <div className="hidden lg:flex w-1/3 bg-gradient-to-r from-purple-600 to-indigo-600 items-center justify-center p-6">
          <Image
            src={Logo}
            alt="Register"
            width={300}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full lg:w-2/3 p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    {passwordConfirm && password !== passwordConfirm ? (
                      <FormMessage>Password does not match</FormMessage>
                    ) : (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />

              <Button
                disabled={password !== passwordConfirm}
                type="submit"
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </form>
          </Form>
          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?
            <Link href="/login" className="text-blue-600 hover:underline">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
