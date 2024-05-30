"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import Link from "next/link";
import Image from "next/image";
import useRuanganModule from "../lib/ruangan_service";
import { CreateRuanganDto } from "../interface/ruangan_interface";

export const RuanganCreateSchema = yup.object().shape({
  nama_ruangan: yup
    .string()
    .nullable()
    .default("")

    .required("Wajib isi"),
  kapasitas_ruangan: yup.string().nullable().default("").required("Wajib isi"),
  gambar_ruangan: yup.string().nullable().default("").required("Wajib isi"),
});

const CreateRuanganƒ = () => {
  const { useCreateRuangan } = useRuanganModule();
  const { mutate, isLoading } = useCreateRuangan();
  const formik = useFormik<CreateRuanganDto>({
    initialValues: RuanganCreateSchema.getDefault(),
    validationSchema: RuanganCreateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          resetForm();
          window.location.href = "/admin/ruangan";
        },
      });
    },
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
  } = formik;

  return (
    <section className="flex items-center justify-center w-full h-screen absolute top-[5vh]">
      <section className="w-1/3">
        <h2 className="text-xl font-bold text-gray-500">Tambah Ruangan</h2>
        value : {JSON.stringify(values)}
        <div>
          <Image
            src={values.gambar_ruangan || "/avatar.jpg"}
            alt="img"
            width={50}
            height={50}
          />
        </div>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <Label htmlFor="nama_ruangan" title="nama_ruangan" />
              <InputText
                onChange={handleChange}
                // onChange={(e) => {
                //   setFieldValue("nama", e.target.value);
                //   if (e.target.value === "ariiq") {
                //     setFieldValue("nama", e.target.value);
                //   }
                // }}
                onBlur={handleBlur}
                value={values.nama_ruangan}
                placeholder="nama_ruangan"
                id="nama_ruangan"
                name="nama_ruangan"
                isError={!!errors.nama_ruangan}
                messageError={errors.nama_ruangan}
              />
            </section>
            <section>
              <Label htmlFor="kapasitas_ruangan" title="kapasitas_ruangan" />
              <InputText
                onChange={handleChange}
                // onChange={(e) => {
                //   setFieldValue("nama", e.target.value);
                //   if (e.target.value === "ariiq") {
                //     setFieldValue("nama", e.target.value);
                //   }
                // }}
                onBlur={handleBlur}
                value={values.kapasitas_ruangan}
                placeholder="kapasitas_ruangan"
                id="kapasitas_ruangan"
                name="kapasitas_ruangan"
                isError={!!errors.kapasitas_ruangan}
                messageError={errors.kapasitas_ruangan}
              />
            </section>
            <section>
              <input
                type="file"
                id="gambar_ruangan"
                onChange={(event: any) => {
                  const file = event.target.files[0];

                  // if (file.type !== "image/jpeg") {
                  //   return alert("type tidak sesauai");
                  // }

                  let reader = new FileReader();
                  reader.onloadend = () => {
                    setFieldValue("gambar_ruangan", reader.result);
                  };
                  reader.readAsDataURL(file);
                  setFieldValue("file", file);

                  console.log(file);
                }}
              />
            </section>

            <section className="flex gap-3 flex-col">
              <Button width="lg1" title="Simpan" colorSchema="blue" />
              <Button
                width="lg1"
                type="button"
                title="Cancel"
                colorSchema="red"
              />
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default CreateRuanganƒ;
