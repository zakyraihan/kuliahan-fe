"use client";
import React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import Label from "@/components/Label";
import InputText from "@/components/InputText";
import Button from "@/components/Button"; // Assuming you have a Button component
import useOption from "@/hook/useOption";
import Select from "@/components/Select";
import useJadwalModule from "../../lib";
import { JadwalCreatePayload, UpdateJadwal } from "../../lib/interfaces";
import { useRouter } from "next/navigation";

const createJadwalSchema = yup.object().shape({
  mata_kuliah: yup.string().nullable().default("").required("Wajib isi"),
  hari: yup.string().nullable().default("").required("Wajib isi"),
  waktuMulai: yup.string().nullable().default("").required("Wajib isi"),
  waktuSelesai: yup.string().nullable().default("").required("Wajib isi"),
});

const BuatJadwal = ({ params }: { params: { id: string } }) => {
  const { useUpdateJadwal } = useJadwalModule();
  const { mutate, isLoading } = useUpdateJadwal(params.id);
  const router = useRouter();
  const formik = useFormik<UpdateJadwal>({
    initialValues: {
      mata_kuliah: "",
      hari: "",
      waktuMulai: "",
      waktuSelesai: "",
    },
    validationSchema: createJadwalSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

  return (
    <div>
      <section className="flex items-center justify-center w-full h-screen">
        <section className="w-full md:w-1/2 lg:w-1/3 bg-base-200 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-400 mb-6">Edit Jadwal</h2>
          <FormikProvider value={formik}>
            <Form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="mata_kuliah" title="Mata Kuliah" />
                <InputText
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mata_kuliah}
                  placeholder="Mata Kuliah"
                  id="mata_kuliah"
                  name="mata_kuliah"
                  isError={!!errors.mata_kuliah}
                  messageError={errors.mata_kuliah}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hari" title="Hari" />
                <InputText
                  type="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.hari}
                  placeholder="Hari"
                  id="hari"
                  name="hari"
                  isError={!!errors.hari}
                  messageError={errors.hari}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="waktuMulai" title="Waktu Mulai" />
                <InputText
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.waktuMulai}
                  placeholder="Waktu Mulai"
                  id="waktuMulai"
                  name="waktuMulai"
                  isError={!!errors.waktuMulai}
                  messageError={errors.waktuMulai}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="waktuSelesai" title="Waktu Selesai" />
                <InputText
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.waktuSelesai}
                  placeholder="Waktu Selesai"
                  id="waktuSelesai"
                  name="waktuSelesai"
                  isError={!!errors.waktuSelesai}
                  messageError={errors.waktuSelesai}
                />
              </div>
              <div className="flex justify-between">
                <Button width="1/2" title="Update" colorSchema="blue" />
                <Button
                  width="1/2"
                  type="button"
                  onClick={() => router.back()}
                  title="Cancel"
                  colorSchema="red"
                />
              </div>
            </Form>
          </FormikProvider>
        </section>
      </section>
    </div>
  );
};

export default BuatJadwal;
