"use client";
import React from "react";
import * as yup from "yup";
import { getIn, useFormik, FormikProvider, Form } from "formik";
import {
  Box,
  Flex,
  Heading,
  ChakraProvider,
  extendTheme,
  useColorModeValue,
  ColorModeScript,
  Button,
  Input,
} from "@chakra-ui/react";
import useAuthModule from "../lib/auth_service";
import { LupaPasswordPayload } from "../interface/auth_interface";

// Define a custom theme to use dark mode by default
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export const lupaPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("Wajib isi"),
});

const Page = () => {
  const { useLupaPw } = useAuthModule();
  const { mutate, isLoading, isError, error } = useLupaPw();
  const formik = useFormik<LupaPasswordPayload>({
    initialValues: lupaPasswordSchema.getDefault(),
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
      console.log(payload);
    },
  });

  const { handleSubmit, handleBlur, values, errors, setFieldValue } = formik;

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        bg={useColorModeValue("gray.800", "gray.900")}
        p={4}
      >
        <Box
          bg={useColorModeValue("gray.100", "gray.700")}
          p={6}
          rounded="md"
          shadow="md"
          width="100%"
          maxWidth="400px"
          textAlign="center"
        >
          <Heading mb={6} color={useColorModeValue("gray.900", "white")}>
            Reset Password
          </Heading>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <Input
                name="email"
                id="email"
                value={values.email}
                placeholder="Email"
                onChange={(e: any) => {
                  setFieldValue("email", e.target.value);
                }}
                onBlur={handleBlur}
                isInvalid={!!getIn(errors, "email")}
                errorBorderColor="red.300"
                mb={4}
              />
              {/* <Button
                height="lg"
                colorScheme="blue"
                title="Submit"
                isLoading={isLoading}
                type="submit"
                width="full"
              >
                Submit
              </Button> */}
              <button
                className="bg-blue-500  p-2 w-full text-white"
                type="submit"
              >
                submit
              </button>
            </Form>
          </FormikProvider>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default Page;
