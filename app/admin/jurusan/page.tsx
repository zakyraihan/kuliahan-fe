"use client";
import React from "react";
import useJurusanModule from "./lib/jurusan_service";
import Shimmer from "@/components/Shimmer";
import { useRouter } from "next/navigation";
import { Form, FormikProvider, useFormik } from "formik";
import Label from "@/components/Label";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Select from "@/components/Select";
import { CreateJurusanDto, UpdateJurusan } from "./interface/jurusan_model";
import * as yup from "yup";

export const createJurusanSchema = yup.object().shape({
  nama_jurusan: yup.string().nullable().default("").required("Wajib isi"),
});

const Jurusan = () => {
  const { useJurusanList, useCreateJurusan, useUpdateJurusan } =
    useJurusanModule();
  const { data, isFetching, isLoading } = useJurusanList();
  const { mutate } = useCreateJurusan();
  const router = useRouter();

  const formik = useFormik<CreateJurusanDto>({
    initialValues: {
      nama_jurusan: "",
    },
    validationSchema: createJurusanSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          resetForm();
          setValues(createJurusanSchema.getDefault());
        },
      });
    },
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    resetForm,
    setFieldValue,
    setValues,
  } = formik;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Jurusan</h1>
        <label htmlFor="my_modal_6" className="">
          <h1 className="text-3xl font-bold mb-4 cursor-pointer hover:text-green-500 transition flex gap-2">
            Buat Jurusan
          </h1>
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Silahkan!</h3>
            <FormikProvider value={formik}>
              <Form>
                <div className="space-y-2">
                  <Label htmlFor="nama_jurusan" title="nama jurusan" />
                  <InputText
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nama_jurusan}
                    placeholder="nama_jurusan"
                    id="nama_jurusan"
                    name="nama_jurusan"
                    isError={!!errors.nama_jurusan}
                    messageError={errors.nama_jurusan}
                  />
                </div>
                <br />
                <Button title="Buat" colorSchema="blue" width="sm" />
              </Form>
            </FormikProvider>
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn">
                Close!
              </label>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Shimmer />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data.map((items, index) => (
            <div
              onClick={() => router.push(`jurusan/${items.id}/update`)}
              key={index}
              className="border dark:border-gray-400 border-gray-800 rounded-lg shadow-md p-6 cursor-pointer inline-flex items-center"
            >
              <p>Jurusan {items.nama_jurusan}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jurusan;
