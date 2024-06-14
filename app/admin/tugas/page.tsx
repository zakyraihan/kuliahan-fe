"use client";
import React, { useState } from "react";
import useTugasModule from "./lib";
import { BadgeCheck, Clock } from "lucide-react";
import InputText from "@/components/InputText";
import { Form, FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import useOption from "@/hook/useOption";
import { TugasCreatePayload } from "./interface";
import Label from "@/components/Label";
import Select from "@/components/Select";
import Button from "@/components/Button";
import useDisclosure from "@/hook/useDisclosure";
import { Drawer } from "@/components/Drawer";
import Filter from "./module/filter";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";

const createJadwalSchema = yup.object().shape({
  title: yup.string().nullable().default("").required("Wajib isi"),
  description: yup.string().nullable().default("").required("Wajib isi"),
  gambar: yup.string().nullable().default("").required("Wajib isi"),
  jurusan_id: yup.number().nullable().default(0).required("Wajib isi"),
});

const status = [
  {
    value: "pengerjaan",
    label: "pengerjaan",
  },
  {
    value: "selesai",
    label: "selesai",
  },
];

const jumlah = [
  {
    value: 1,
    label: "2020",
  },
  {
    value: 2,
    label: "2021",
  },
];

const TugasPage = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { useCreateTugas, useTugasList, useDeletegas } = useTugasModule();
  const { mutate: MutateDelete } = useDeletegas();
  const {
    data,
    isLoading,
    handleClear,
    handlePage,
    handlePageSize,
    handleFilter,
    params,
    setParams,
  } = useTugasList();
  const { optionJurusan } = useOption();
  const { mutate } = useCreateTugas();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDelete = (id: number) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Apakah Yakin?",
        text: "Data yang terhapus tidak bisa dikembalikan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "red",

        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await MutateDelete(id);
        }
      });
  };

  const router = useRouter();

  const formik = useFormik<TugasCreatePayload>({
    initialValues: {
      title: "",
      description: "",
      jumlah: 0,
      status: "",
      gambar: "",
      jurusan_id: 0,
      updated_by_mahasiswa: {
        id: 0,
        nama: "",
      },
      created_at: "",
    },
    validationSchema: createJadwalSchema,
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
    errors,
    setFieldValue,
  } = formik;

  return (
    <>
      <div>
        <Drawer
          onClose={onClose}
          onClear={handleClear}
          onSubmit={handleFilter}
          title=""
          isOpen={isOpen}
        >
          <Filter params={params} setParams={setParams} />
        </Drawer>

        <Button width="sm" onClick={onOpen} colorSchema="blue" title="Filter" />
      </div>
      <div className="container mx-auto p-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold mb-4">Daftar Tugas</h1>
          {/* The button to open modal */}
          <label htmlFor="my_modal_6" className="">
            <h1 className="text-3xl font-bold mb-4 cursor-pointer hover:text-green-500 transition flex gap-2">
              Buat Tugas
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
                    <Label htmlFor="jurusan_id" title="Jurusan ID" />
                    <Select
                      value={values.jurusan_id || 0}
                      id={`jurusan_id`}
                      name={`jurusan_id`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={optionJurusan}
                      isError={!!errors.jurusan_id}
                      messageError={errors.jurusan_id}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status" title="status" />
                    <Select
                      value={values.status}
                      id={`status`}
                      name={`status`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={status}
                      isError={!!errors.status}
                      messageError={errors.status}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jumlah" title="jumlah" />
                    <Select
                      value={values.jumlah}
                      id={`jumlah`}
                      name={`jumlah`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={jumlah}
                      isError={!!errors.jumlah}
                      messageError={errors.jumlah}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file" title="file" />
                    <input
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.data.map((task, index) => (
            <div key={index}>
              <div className="">
                {/* The button to open modal */}
                <label
                  htmlFor="my_modal_7"
                  className="bg-white dark:bg-abu dark:text-white p-4 text-slate-700 cursor-pointer shadow-xl flex flex-col"
                >
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-lg">{task.title}</div>
                    {task.status === "pengerjaan" ? (
                      <Clock className="h-6 w-6 text-yellow-500" />
                    ) : task.status === "selesai" ? (
                      <BadgeCheck className="h-6 w-6 text-green-500" />
                    ) : null}
                  </div>
                  <br />
                  <div className="">{task.description}</div>
                  <br />
                  <div className="">{task.gambar}</div>
                  <br />
                  <div className="flex flex-row justify-between">
                    <h1>{task.created_at}</h1>
                    <h1 className="text-sm text-gray-400">
                      {task.jurusan.nama_jurusan}
                    </h1>
                  </div>
                </label>
                <input
                  type="checkbox"
                  id="my_modal_7"
                  className="modal-toggle"
                />
                <div className="modal" role="dialog">
                  <div className="modal-box">
                    <h3 className="text-lg font-bold">Hello!</h3>
                    <p className="py-4">
                      <div className="">{task.description}</div>
                      <br />
                      <Button
                        colorSchema="blue"
                        width="sm"
                        title="Update"
                        onClick={() => router.push(`tugas/${task.id}/edit`)}
                      />
                      <Button
                        colorSchema="red"
                        width="sm"
                        title="hapus"
                        onClick={() => {
                          handleDelete(task.id || 0);
                        }}
                      />
                    </p>
                  </div>
                  <label className="modal-backdrop" htmlFor="my_modal_7">
                    Close
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          page={params.page}
          pageSize={params.pageSize}
          handlePageSize={handlePageSize}
          handlePage={handlePage}
          pagination={data?.pagination}
        />
      </div>
    </>
  );
};

export default TugasPage;
