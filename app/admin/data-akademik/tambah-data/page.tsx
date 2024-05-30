"use client";
import useOption from "@/hook/useOption";
import { useRouter } from "next/navigation";
import React from "react";
import * as yup from "yup";
import { MahasiswaCreateArrayPayload } from "../interface/mahasiswa_interface";
import {
  ArrayHelpers,
  FieldArray,
  Form,
  FormikProvider,
  getIn,
  useFormik,
} from "formik";
import useMahasiswaModule from "../lib/mahasiswa_service";
import { Delete, PlusCircle } from "lucide-react";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Image from "next/image";

export const createMahasiswaSchema = yup.object().shape({
  foto_mahasiswa: yup.string().nullable().required("wajib isi"),
  nama_mahasiswa: yup.string().nullable().required("wajib isi"),
  tanggal_lahir: yup.string().nullable().required("wajib isi"),
  asal: yup.string().nullable().required("wajib isi"),
  umur: yup.number().nullable().required("wajib isi"),
  nim: yup.number().nullable().required("wajib isi"),
  alamat: yup.string().nullable().required("wajib isi"),
  nama_ortu: yup.string().nullable().required("wajib isi"),
  jurusan_id: yup.number().nullable().required("wajib isi"),
  ruangan_id: yup.number().nullable().required("wajib isi"),
});

export const defaultMahasiswaArray = {
  data: [
    {
      foto_mahasiswa: "",
      nama_mahasiswa: "",
      tanggal_lahir: "",
      asal: "",
      alamat: "",
      nama_ortu: "",
      nim: 0,
      umur: 0,
      jurusan_id: 0,
      ruangan_id: 0,
    },
  ],
};

const createMahasiswaArraySchema = yup
  .object()
  .shape({
    data: yup.array().of(createMahasiswaSchema),
  })
  .default(defaultMahasiswaArray);

const TambahData = () => {
  const router = useRouter();
  const { optionJurusan, optionRuangan } = useOption();
  const { useCreateBulkMahasiswa } = useMahasiswaModule();
  const { isLoading, mutate } = useCreateBulkMahasiswa();

  const onSubmit = async (values: MahasiswaCreateArrayPayload) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
        setValues(defaultMahasiswaArray);
        router.push("/admin/data-akademik");
      },
      onError: (e: any) => {
        console.log("error", e);
      },
    });
  };

  const formik = useFormik<MahasiswaCreateArrayPayload>({
    initialValues: defaultMahasiswaArray,
    validationSchema: createMahasiswaArraySchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
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
    touched,
  } = formik;

  return (
    <div>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <FieldArray
            name={"data"}
            render={(arrayHelpers: ArrayHelpers) => (
              <>
                {values &&
                  values.data.map((value, index) => (
                    <div
                      key={index}
                      className="mb-6 p-5 border border-slate-500 rounded-lg shadow-sm bg-abu bg-opacity-50"
                    >
                      {value.foto_mahasiswa ? (
                        <Image
                          src={value.foto_mahasiswa}
                          alt="Preview"
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-20 h-20 flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-400">
                            Preview
                          </span>
                        </div>
                      )}
                      <section className="flex items-center justify-end">
                        <PlusCircle
                          onClick={() =>
                            arrayHelpers.push(
                              createMahasiswaSchema.getDefault()
                            )
                          }
                        />
                        <Delete onClick={() => arrayHelpers.remove(index)} />
                      </section>

                      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor={"nama mahasiswa"}
                            title="Nama Mahasiswa"
                          />
                          <InputText
                            value={value.nama_mahasiswa ?? ""}
                            placeholder="Nama Mahasiswa"
                            id={`data[${index}].nama_mahasiswa`}
                            name={`data[${index}].nama_mahasiswa`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isError={getIn(
                              errors,
                              `data[${index}].nama_mahasiswa`
                            )}
                            messageError={getIn(
                              errors,
                              `data[${index}].nama_mahasiswa`
                            )}
                          />
                        </div>
                        <section className="flex flex-col">
                          <Label
                            htmlFor="foto_mahasiswa"
                            title="foto_mahasiswa"
                          />
                          <input
                            type="file"
                            id={`data[${index}].foto_mahasiswa`}
                            name={`data[${index}].foto_mahasiswa`}
                            onChange={(event: any) => {
                              const file = event.target.files[0];
                              let reader = new FileReader();
                              reader.onloadend = () => {
                                setFieldValue(
                                  `data[${index}].foto_mahasiswa`,
                                  reader.result
                                );
                              };
                              reader.readAsDataURL(file);
                              setFieldValue(`file`, file);
                            }}
                            className="mt-1 block w-full text-sm text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer focus:outline-none"
                          />
                        </section>

                        <div>
                          <Label
                            htmlFor={`data[${index}].tanggal_lahir`}
                            title="Tanggal Lahir"
                          />
                          <InputText
                            value={value.tanggal_lahir ?? ""}
                            placeholder="Tanggal Lahir"
                            id={`data[${index}].tanggal_lahir`}
                            name={`data[${index}].tanggal_lahir`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isError={getIn(
                              errors,
                              `data[${index}].tanggal_lahir`
                            )}
                            messageError={getIn(
                              errors,
                              `data[${index}].tanggal_lahir`
                            )}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`data[${index}].asal`} title="Asal" />
                          <InputText
                            value={value.asal ?? ""}
                            placeholder="Asal"
                            id={`data[${index}].asal`}
                            name={`data[${index}].asal`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isError={getIn(errors, `data[${index}].asal`)}
                            messageError={getIn(errors, `data[${index}].asal`)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`data[${index}].umur`} title="Umur" />
                          <InputText
                            value={value.umur ?? ""}
                            placeholder="Umur"
                            id={`data[${index}].umur`}
                            name={`data[${index}].umur`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isError={getIn(errors, `data[${index}].umur`)}
                            messageError={getIn(errors, `data[${index}].umur`)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`data[${index}].nim`} title="NIM" />
                          <InputText
                            value={value.nim ?? ""}
                            placeholder="NIM"
                            id={`data[${index}].nim`}
                            name={`data[${index}].nim`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isError={getIn(errors, `data[${index}].nim`)}
                            messageError={getIn(errors, `data[${index}].nim`)}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`data[${index}].alamat`}
                            title="Alamat"
                          />
                          <InputText
                            value={value.alamat ?? ""}
                            placeholder="Alamat"
                            id={`data[${index}].alamat`}
                            name={`data[${index}].alamat`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isError={getIn(errors, `data[${index}].alamat`)}
                            messageError={getIn(
                              errors,
                              `data[${index}].alamat`
                            )}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`data[${index}].nama_ortu`}
                            title="Nama Orang Tua"
                          />
                          <InputText
                            value={value.nama_ortu ?? ""}
                            placeholder="Nama Orang Tua"
                            id={`data[${index}].nama_ortu`}
                            name={`data[${index}].nama_ortu`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isError={getIn(errors, `data[${index}].nama_ortu`)}
                            messageError={getIn(
                              errors,
                              `data[${index}].nama_ortu`
                            )}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`data[${index}].jurusan_id`}
                            title="Jurusan ID"
                          />
                          <Select
                            value={value.jurusan_id || 0}
                            id={`data[${index}]jurusan_id`}
                            name={`data[${index}]jurusan_id`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            options={optionJurusan}
                            isError={
                              getIn(errors?.data?.[index], "jurusan_id") &&
                              getIn(touched?.data?.[index], "jurusan_id")
                            }
                            messageError={getIn(
                              errors?.data?.[index],
                              "jurusan_id"
                            )}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`data[${index}].ruangan_id`}
                            title="ruangan Id"
                          />
                          <Select
                            value={value.ruangan_id || 0}
                            id={`data[${index}]ruangan_id`}
                            name={`data[${index}]ruangan_id`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            options={optionRuangan}
                            isError={
                              getIn(errors?.data?.[index], "ruangan_id") &&
                              getIn(touched?.data?.[index], "ruangan_id")
                            }
                            messageError={getIn(
                              errors?.data?.[index],
                              "ruangan_id"
                            )}
                          />
                        </div>
                      </section>
                    </div>
                  ))}
              </>
            )}
          />
          <section>
            <Button
              type="submit"
              height="md"
              title="Simpan"
              colorSchema="blue"
              isLoading={isLoading}
            />
          </section>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default TambahData;
