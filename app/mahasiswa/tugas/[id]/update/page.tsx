"use client";
import { TugasUpdateByMahasiswaPayload } from "@/app/admin/tugas/interface";
import useTugasModule from "@/app/admin/tugas/lib";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { Form, FormikProvider, useFormik, getIn } from "formik";
import Link from "next/link";
import React from "react";
import * as yup from "yup";

const createTugasSchema = yup.object().shape({
  status: yup.string().nullable().default("").required("Wajib isi"),
  gambar: yup.string().nullable().default("").required("Wajib isi"),
});

const statusOptions = [
  {
    value: "pengerjaan",
    label: "Pengerjaan",
  },
  {
    value: "selesai",
    label: "Selesai",
  },
];

const UpdateTugasByMahasiswa = ({ params }: { params: { id: string } }) => {
  const { useUpdateTugasByMahasiswa } = useTugasModule();
  const { mutate, isLoading } = useUpdateTugasByMahasiswa(params.id);
  const formik = useFormik<TugasUpdateByMahasiswaPayload>({
    initialValues: {
      status: "",
      gambar: "",
    },
    validationSchema: createTugasSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    touched,
    errors,
    setFieldValue,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <section>
          <Label htmlFor="status" title="Status" />
          <Select
            value={values.status}
            id="status"
            name="status"
            onChange={handleChange}
            onBlur={handleBlur}
            options={statusOptions}
            isError={getIn(errors, "status") && getIn(touched, "status")}
            messageError={getIn(errors, "status")}
          />
        </section>
        <br />
        <Link href={values.gambar} className="text-gray-400">
          {values.gambar}
        </Link>
        <br />
        <section>
          <input
            type="file"
            id="gambar"
            onChange={(event: any) => {
              const file = event.target.files[0];

              // if (file.type !== "image/jpeg") {
              //   return alert("type tidak sesauai");
              // }

              let reader = new FileReader();
              reader.onloadend = () => {
                setFieldValue("gambar", reader.result);
              };
              reader.readAsDataURL(file);
              setFieldValue("file", file);

              console.log(file);
            }}
          />
        </section>
        <br />
        <Button
          type="submit"
          height="md"
          title="Update"
          colorSchema="blue"
          isLoading={isLoading}
        />
      </Form>
    </FormikProvider>
  );
};

export default UpdateTugasByMahasiswa;
