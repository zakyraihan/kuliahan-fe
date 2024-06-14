"use client";

import { ResetPassword } from "@/app/auth/interface/auth_interface";
import useAuthModule from "@/app/auth/lib/auth_service";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { Form, FormikProvider, getIn, useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import {
  Box,
  Flex,
  Image,
  Heading,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";

// Define a custom theme to extend the default Chakra UI theme
const theme = extendTheme({
  colors: {
    primary: {
      500: "#2D3748",
    },
  },
});

type Params = {
  params: {
    id: string;
    token: string;
  };
};

export const lupaPasswordSchema = yup.object().shape({
  new_password: yup.string().nullable().default("").required("Wajib isi"),
});

const ResetPW = ({ params }: Params) => {
  const { id, token } = params;

  console.log(id);
  console.log(token);

  const { useResetPassword } = useAuthModule();
  const { mutate, isLoading, isError, error } = useResetPassword(id, token);
  const formik = useFormik<ResetPassword>({
    initialValues: lupaPasswordSchema.getDefault(),
    enableReinitialize: true,
    onSubmit: (payload: any) => {
      mutate(payload);
      console.log(payload);
    },
  });

  const { handleSubmit, handleBlur, values, errors, setFieldValue } = formik;

  return (
    <ChakraProvider theme={theme}>
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        bgImage="url('https://source.unsplash.com/random')"
        bgSize="cover"
        bgPosition="center"
        p={4}
      >
        <Box
          bg="white"
          p={6}
          rounded="md"
          shadow="md"
          width="100%"
          maxWidth="400px"
          textAlign="center"
        >
          <Heading mb={6}>Reset Password</Heading>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <InputText
                name="new_password"
                id="new_password"
                value={values.new_password}
                placeholder="New Password"
                onChange={(e: any) => {
                  setFieldValue("new_password", e.target.value);
                }}
                onBlur={handleBlur}
                isError={getIn(errors, "new_password")}
                messageError={getIn(errors, "new_password")}
              />

              <Button
                height="lg"
                colorSchema="blue"
                title="Submit"
                isLoading={isLoading}
                type="submit"
              />
            </Form>
          </FormikProvider>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default ResetPW;
