"use client";
import React from "react";
import useTugasModule from "../../lib";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import { FormikProvider, Form, useFormik } from "formik";
import * as yup from "yup";
import { TugasCreatePayload, TugasUpdatePayload } from "../../interface";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const createJadwalSchema = yup.object().shape({
  title: yup.string().nullable().default("").required("Wajib isi"),
  description: yup.string().nullable().default("").required("Wajib isi"),
});

const TugasUpdate = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { useUpdateTugas, useDetailTugas } = useTugasModule();
  const { mutate, isLoading } = useUpdateTugas(params.id);
  const { data, isFetching } = useDetailTugas(params.id);

  const formik = useFormik<TugasUpdatePayload>({
    initialValues: {
      title: data?.title || "",
      description: data?.description || "",
    },
    validationSchema: createJadwalSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      mutate(values, {
        onSuccess: () => {
          resetForm();
          router.back(); // Mengarahkan pengguna kembali ke rute sebelumnya
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
    setFieldValue,
  } = formik;

  return (
    <div>
      <FormikProvider value={formik}>
        <Form>
          <div className="space-y-2">
            <Label htmlFor="judul" title="judul" />
            <InputText
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              placeholder="Judul Tugas"
              id="title"
              name="title"
              isError={!!errors.title}
              messageError={errors.title}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" title="description" />
            <InputText
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              placeholder="Deskripsi"
              id="description"
              name="description"
              isError={!!errors.description}
              messageError={errors.description}
            />
          </div>

          <div className="space-y-2">
            {/* <Label htmlFor="file" title="file" /> */}
            {/* <input
              type="file"
              id={`gambar`}
              name={`gambar`}
              onChange={(event: any) => {
                const file = event.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                  setFieldValue(`gambar`, reader.result);
                };
                reader.readAsDataURL(file);
                setFieldValue(`file`, file);
              }}
              className="mt-1 block w-full text-sm text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer focus:outline-none"
            /> */}
          </div>
          <Button colorSchema="blue" title="update" isLoading={isLoading} />
        </Form>
      </FormikProvider>
    </div>
  );
};

export default TugasUpdate;
