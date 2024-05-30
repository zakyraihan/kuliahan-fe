"use client";
import { useFormik, Form, FormikProvider, getIn } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { RegisterPayload } from "../interface/auth_interface";

import { useState } from "react";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import useAuthModule from "../lib/auth_service";
import Select from "@/components/Select";
import { ToastContainer } from "react-toastify";
import Image from "next/image";

const option = [
  {
    value: "dosen",
    label: "dosen",
  },
  {
    value: "mahasiswa",
    label: "mahasiswa",
  },
];

 const registerSchema = yup.object().shape({
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
  role: yup.string().nullable().default("").required("Wajib isi"),
});

const Register = () => {
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const { useRegister } = useAuthModule();
  const { mutate, isLoading, isError, error } = useRegister();
  const formik = useFormik<RegisterPayload>({
    initialValues: registerSchema.getDefault(),
    enableReinitialize: true,
    onSubmit: (payload: any) => {
      mutate(payload);
    },
  });
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
    setFieldValue,
  } = formik;
  const errorMessages = isError ? error.response?.data?.message || [] : [];

  const emailError = errorMessages.find((msg: any) => msg.includes("email"));
  const passwordError = errorMessages.find((msg: any) =>
    msg.includes("password")
  );

  return (
    <section className="bg-gray-50 dark:bg-gray-900 md:flex md:flex-row flex-col">
      <div className="bg-blue-400 md:h-screen md:w-[50vw] w-fullh-screen h-[50vh]"></div>
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
              Create an account
            </h1>
            <FormikProvider value={formik}>
              <Form className="space-y-5" onSubmit={handleSubmit}>
                <section>
                  <Label htmlFor="nama" title="Nama" />
                  <InputText
                    value={values.nama}
                    placeholder="Nama"
                    id="nama"
                    name="nama"
                    onChange={(e: any) => {
                      setFieldValue("nama", e.target.value);
                    }}
                    onBlur={handleBlur}
                    isError={getIn(errors, "nama")}
                    messageError={getIn(errors, "nama")}
                  />
                </section>
                <section>
                  <Label htmlFor="email" title="Email" />
                  <InputText
                    value={values.email}
                    placeholder="youremail@gmail.com"
                    id="email"
                    name="email"
                    onChange={(e: any) => {
                      setFieldValue("email", e.target.value);
                      setIsEmailActive(false);
                    }}
                    onBlur={handleBlur}
                    isError={isEmailActive ? emailError : null}
                    messageError={isEmailActive ? emailError : null}
                  />
                </section>
                <section>
                  <Label htmlFor="password" title="Password" />

                  <InputText
                    value={values.password}
                    placeholder="********"
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e: any) => {
                      setFieldValue("password", e.target.value);
                      setIsPasswordActive(false);
                    }}
                    onBlur={handleBlur}
                    isError={isPasswordActive ? passwordError : null}
                    messageError={isPasswordActive ? passwordError : null}
                  />
                </section>

                <section>
                  <Label htmlFor="role" title="role" />
                  <Select
                    value={values.role}
                    id="role"
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={option}
                    isError={getIn(errors, "role")}
                    messageError={getIn(errors, "role")}
                  />
                </section>

                <section>
                  <Button
                    height="lg"
                    title="Register"
                    colorSchema="blue"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    onClick={() => {
                      setIsEmailActive(true);
                      setIsPasswordActive(true);
                    }}
                  />
                  <p className="text-center mt-3 text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <a
                      href="/auth/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
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

export default Register;
