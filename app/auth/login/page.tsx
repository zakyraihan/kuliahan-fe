"use client";
import React from "react";
import * as yup from "yup";
import { useFormik, Form, FormikProvider, getIn } from "formik";
import Image from "next/image";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import useAuthModule from "../lib/auth_service";
import { LoginPayload } from "../interface/auth_interface";
import { useSession } from "next-auth/react";

const loginSchema = yup.object().shape({
  nama: yup.string().nullable().default("").required("Wajib isi"),
  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("Wajib isi"),
  password: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib isi")
    .min(8, "Minimal 8 karakater"),
});

const Login = () => {
  const { data: session, status } = useSession();
  console.log("session", session);
  console.log("status", status);
  const { useLogin } = useAuthModule();
  const { mutate, isLoading } = useLogin();
  const formik = useFormik<LoginPayload>({
    initialValues: loginSchema.getDefault(),
    validationSchema: loginSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });
  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

  return (
    <section className="bg-gray-50 dark:bg-gray-900 md:flex md:flex-row flex-col">
      <div className="bg-blue-400 md:h-screen md:w-[50vw] w-full h-[50vh]"></div>
      <div className="flex flex-col items-center md:w-[50%] w-full justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            src={
              "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            }
            alt="logo"
            width={50}
            height={50}
          />
          Flowbite
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Welcome Back
            </h1>
            <FormikProvider value={formik}>
              <Form className="space-y-5" onSubmit={handleSubmit}>
                <section>
                  <Label htmlFor="nama" title="nama" />
                  <InputText
                    value={values.nama}
                    placeholder="Nama"
                    id="nama"
                    name="nama"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={getIn(errors, "nama")}
                    messageError={getIn(errors, "nama")}
                  />
                </section>
                <section>
                  <Label htmlFor="email" title="Email" />
                  <InputText
                    value={values.email}
                    placeholder="exampel@email.com"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={getIn(errors, "email")}
                    messageError={getIn(errors, "email")}
                  />
                </section>
                <section>
                  <Label htmlFor="password" title="Password" />

                  <InputText
                    value={values.password}
                    placeholder="**********"
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isError={getIn(errors, "password")}
                    messageError={getIn(errors, "password")}
                  />
                </section>

                <section>
                  <Button
                    height="lg"
                    title="Login"
                    colorSchema="blue"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                  />
                  <p className="text-center mt-3 text-sm font-light text-gray-500 dark:text-gray-400">
                    Don&apos;t have an account?{" "}
                    <a
                      href="/auth/register"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Register Disini
                    </a>
                  </p>
                  <p className="text-center mt-3 text-sm font-light text-gray-500 dark:text-gray-400">
                    Lupa Password?{" "}
                    <a
                      href="/auth/lupa-password"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Disini
                    </a>
                  </p>
                </section>
              </Form>
            </FormikProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
