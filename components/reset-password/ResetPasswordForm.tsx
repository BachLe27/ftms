"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import loginImg from "@/public/assets/authentication/images/loginImg.png";
import logoImg from "@/public/assets/login/fsa_logo.png";

import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/custom/form-error";
import { FormSuccess } from "@/components/custom/form-success";
import { Eye, EyeOff } from "lucide-react";
import { ResetPasswordSchema } from "@/schema/reset-password-schema";
import axios from "axios";

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isViewPassword, setIsViewPassword] = useState<boolean>(true);

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      verificationCode: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const email = localStorage.getItem("emailForReset"); // Lấy email từ localStorage
    if (!email) {
      setError("Email không được tìm thấy. Vui lòng nhập email để xác thực.");
      return;
    }

    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await axios.post("http://localhost:8080/api/v1/auth/reset-password", {
          ...values,
          email, // Gửi email cùng mã OTP và mật khẩu mới
        });
        setSuccess("Password reset successfully!");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.message || "Có lỗi xảy ra.");
        } else {
          setError("Một lỗi không xác định đã xảy ra.");
        }
      }
    });
  };

  return (
    <div className="w-full h-screen relative">
      <div className="absolute flex left-0 right-0 top-0 bottom-0 ml-auto mr-auto mt-auto mb-auto bg-white z-10 h-[700px] lg:w-9/12">
        <Image
          className="lg:block hidden w-5/12 mr-6 ml-12 object-contain"
          src={logoImg.src}
          width={logoImg.width}
          height={logoImg.height}
          alt="Picture "
        />

        <div className="form lg:w-7/12 w-full flex flex-col items-center justify-center">
          <div>
            <Image
              src={logoImg.src}
              width={200}
              height={loginImg.height}
              alt="Picture "
              className="object-contain"
            />
          </div>
          <h3 className="text-2xl font-bold mt-4">Reset Password</h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full flex flex-col items-center mt-8"
            >
              <FormField
                control={form.control}
                name="verificationCode"
                render={({ field }) => (
                  <FormItem className="lg:w-7/12 w-10/12">
                    <FormLabel className="text-lg font-semibold">Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter your code"
                        type="text"
                        className="h-14 border-gray-700 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="lg:w-7/12 w-10/12 mt-4">
                    <FormLabel className="text-lg font-semibold">New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Input your password"
                          type={isViewPassword ? "password" : "text"}
                          className="h-14 border-gray-700 w-full "
                        />
                        {isViewPassword ? (
                          <EyeOff
                            onClick={() => setIsViewPassword(false)}
                            className="text-crusta absolute right-2 top-4 z-50 w-5"
                          />
                        ) : (
                          <Eye
                            onClick={() => setIsViewPassword(true)}
                            className="text-crusta absolute right-2 top-4 z-50 w-5"
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="lg:w-7/12 w-10/12 mt-4">
                    <FormLabel className="text-lg font-semibold">Confirm New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Confirm your password"
                          type={isViewPassword ? "password" : "text"}
                          className="h-14 border-gray-700 w-full "
                        />
                        {isViewPassword ? (
                          <EyeOff
                            onClick={() => setIsViewPassword(false)}
                            className="text-crusta absolute right-2 top-4 z-50 w-5"
                          />
                        ) : (
                          <Eye
                            onClick={() => setIsViewPassword(true)}
                            className="text-crusta absolute right-2 top-4 z-50 w-5"
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
              <div className="flex lg:w-7/12 w-10/12 h-14 items-center justify-center">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="mt-10 h-full bg-lightgreen font-bold shadow-gray-500 shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-lightgreen"
                >
                  Reset Your Password
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
