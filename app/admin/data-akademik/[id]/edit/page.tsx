"use client";
import React, { useEffect } from "react";
import useMahasiswaModule from "../../lib/mahasiswa_service";
import { Form, FormikProvider, useFormik, getIn } from "formik";
import { MahasiswaUpdatePayload } from "../../interface/mahasiswa_interface";
import { createMahasiswaSchema } from "../../tambah-data/page";
import Label from "@/components/Label";
import InputText from "@/components/InputText";
import Select from "@/components/Select"; // Assuming you have a Select component
import useOption from "@/hook/useOption";
import Button from "@/components/Button";
import Image from "next/image";

const EditMahasiswa = ({ params }: { params: { id: string } }) => {
  const { useDetailMahasiswa } = useMahasiswaModule();
  const { data, isFetching, isLoading } = useDetailMahasiswa(params.id);
  const { optionJurusan, optionRuangan } = useOption();

  const formik = useFormik<MahasiswaUpdatePayload>({
    initialValues: {
      foto_mahasiswa: data?.foto_mahasiswa || "",
      nama_mahasiswa: data?.nama_mahasiswa || "",
      tanggal_lahir: data?.tanggal_lahir || "",
      asal: data?.asal || "",
      alamat: data?.alamat || "",
      nama_ortu: data?.nama_ortu || "",
      nim: data?.nim || 0,
      umur: data?.umur || 0,
      jurusan_id: data?.jurusan.id || 0,
      ruangan_id: data?.ruangan.id || 0,
    },
    validationSchema: createMahasiswaSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // Submit logic
    },
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
  } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className="mb-6 p-5 border rounded-lg shadow-sm bg-abu bg-opacity-50">
            {values.foto_mahasiswa ? (
              <Image
                src={values.foto_mahasiswa}
                alt="Preview"
                width={100}
                height={50}
                className=""
              />
            ) : (
              <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-20 h-20 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">
                  Preview
                </span>
              </div>
            )}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nama_mahasiswa" title="Nama Mahasiswa" />
                <InputText
                  value={values.nama_mahasiswa}
                  placeholder="Nama Mahasiswa"
                  id="nama_mahasiswa"
                  name="nama_mahasiswa"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={
                    getIn(errors, "nama_mahasiswa") &&
                    getIn(touched, "nama_mahasiswa")
                  }
                  messageError={getIn(errors, "nama_mahasiswa")}
                />
              </div>
              <div>
                <Label htmlFor="foto_mahasiswa" title="Foto Mahasiswa" />
                <InputText
                  readOnly
                  value={values.foto_mahasiswa}
                  placeholder="Foto Mahasiswa"
                  id="foto_mahasiswa"
                  name="foto_mahasiswa"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={
                    getIn(errors, "foto_mahasiswa") &&
                    getIn(touched, "foto_mahasiswa")
                  }
                  messageError={getIn(errors, "foto_mahasiswa")}
                />
              </div>
              <section className="flex flex-col">
                <Label htmlFor="foto_mahasiswa" title="Foto Mahasiswa" />
                <input
                  type="file"
                  id="foto_mahasiswa"
                  name="foto_mahasiswa"
                  onChange={(event: any) => {
                    const file = event.target.files[0];
                    let reader = new FileReader();
                    reader.onloadend = () => {
                      setFieldValue("foto_mahasiswa", reader.result);
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="mt-1 block w-full text-sm text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer focus:outline-none"
                />
              </section>

              <div>
                <Label htmlFor="tanggal_lahir" title="Tanggal Lahir" />
                <InputText
                  value={values.tanggal_lahir}
                  placeholder="Tanggal Lahir"
                  id="tanggal_lahir"
                  name="tanggal_lahir"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={
                    getIn(errors, "tanggal_lahir") &&
                    getIn(touched, "tanggal_lahir")
                  }
                  messageError={getIn(errors, "tanggal_lahir")}
                />
              </div>
              <div>
                <Label htmlFor="asal" title="Asal" />
                <InputText
                  value={values.asal}
                  placeholder="Asal"
                  id="asal"
                  name="asal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "asal") && getIn(touched, "asal")}
                  messageError={getIn(errors, "asal")}
                />
              </div>
              <div>
                <Label htmlFor="umur" title="Umur" />
                <InputText
                  value={values.umur}
                  placeholder="Umur"
                  id="umur"
                  name="umur"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "umur") && getIn(touched, "umur")}
                  messageError={getIn(errors, "umur")}
                />
              </div>
              <div>
                <Label htmlFor="nim" title="NIM" />
                <InputText
                  value={values.nim}
                  placeholder="NIM"
                  id="nim"
                  name="nim"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "nim") && getIn(touched, "nim")}
                  messageError={getIn(errors, "nim")}
                />
              </div>
              <div>
                <Label htmlFor="alamat" title="Alamat" />
                <InputText
                  value={values.alamat}
                  placeholder="Alamat"
                  id="alamat"
                  name="alamat"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "alamat") && getIn(touched, "alamat")}
                  messageError={getIn(errors, "alamat")}
                />
              </div>
              <div>
                <Label htmlFor="nama_ortu" title="Nama Orang Tua" />
                <InputText
                  value={values.nama_ortu}
                  placeholder="Nama Orang Tua"
                  id="nama_ortu"
                  name="nama_ortu"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={
                    getIn(errors, "nama_ortu") && getIn(touched, "nama_ortu")
                  }
                  messageError={getIn(errors, "nama_ortu")}
                />
              </div>
              <div>
                <Label htmlFor="jurusan_id" title="Jurusan ID" />
                <Select
                  value={values.jurusan_id}
                  id="jurusan_id"
                  name="jurusan_id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={optionJurusan} // Provide your options here
                  isError={
                    getIn(errors, "jurusan_id") && getIn(touched, "jurusan_id")
                  }
                  messageError={getIn(errors, "jurusan_id")}
                />
              </div>
              <div>
                <Label htmlFor="ruangan_id" title="Ruangan ID" />
                <Select
                  value={values.ruangan_id | 0}
                  id="ruangan_id"
                  name="ruangan_id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={optionRuangan} // Provide your options here
                  isError={
                    getIn(errors, "ruangan_id") && getIn(touched, "ruangan_id")
                  }
                  messageError={getIn(errors, "ruangan_id")}
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

export default EditMahasiswa;
