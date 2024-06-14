"use client";
import { Form, FormikProvider, getIn, useFormik } from "formik";
import React from "react";
import { UpdateJurusan } from "../../interface/jurusan_model";
import useJurusanModule from "../../lib/jurusan_service";
import { createJurusanSchema } from "../../page";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";

const EditJurusan = ({ params }: { params: { id: string } }) => {
  const { useJurusanList, useCreateJurusan, useUpdateJurusan } =
    useJurusanModule();
  const { mutate } = useUpdateJurusan(params.id);

  const onSubmit = async (values: UpdateJurusan) => {
    mutate(values);
  };

  const formik = useFormik<UpdateJurusan>({
    initialValues: {
      nama_jurusan: "",
    },
    validationSchema: createJurusanSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
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
    touched,
  } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className="mb-6 p-5 border rounded-lg shadow-sm bg-abu bg-opacity-50">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nama_jurusan" title="nama jurusan" />
                <InputText
                  value={values.nama_jurusan}
                  placeholder="nama_jurusan"
                  id="nama_jurusan"
                  name="nama_jurusan"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={
                    getIn(errors, "nama_jurusan") &&
                    getIn(touched, "nama_jurusan")
                  }
                  messageError={getIn(errors, "nama_jurusan")}
                />
              </div>
            </section>
          </div>
          <section>
            <Button
              type="submit"
              height="md"
              title="Update"
              colorSchema="blue"
              // isLoading={isLoading}
            />
          </section>
        </Form>
      </FormikProvider>
    </>
  );
};

export default EditJurusan;
