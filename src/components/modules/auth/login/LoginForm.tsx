/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import logo from "@/public/login.gif";

function SearchParamsHandler({
  onRedirect,
}: {
  onRedirect: (path: string | null) => void;
}) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");

  useEffect(() => {
    onRedirect(redirect);
    toast.info("Please Login First");
  }, [redirect, onRedirect]);

  return null;
}

export default function LoginForm() {
  const form = useForm({ resolver: zodResolver(loginSchema) });
  const { setIsLoading } = useUser();
  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);
  const [redirect, setRedirect] = useState<string | null>(null);
  const router = useRouter();

  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);
      if (res?.success) setReCaptchaStatus(true);
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValue = {
    email: "trrabby1@gmail.com",
    password: "admin123",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message);
        router.push(redirect || "/");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-xl flex w-full max-w-2xl overflow-hidden">
        {/* Image Section */}
        <div className="hidden lg:flex w-1/3 bg-gradient-to-r from-purple-600 to-indigo-600 items-center justify-center p-6">
          <Image
            src={logo}
            alt="Login"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-2/3 p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <Suspense fallback={null}>
            <SearchParamsHandler onRedirect={setRedirect} />
          </Suspense>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                defaultValue={defaultValue.email}
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
                defaultValue={defaultValue.password}
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

              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
                  onChange={handleReCaptcha}
                />
              </div>

              <Button
                disabled={!reCaptchaStatus}
                type="submit"
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
              >
                {form.formState.isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
          <p className="text-sm text-gray-600 text-center mt-4">
            Don&apos;t have an account?
            <Link href="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
