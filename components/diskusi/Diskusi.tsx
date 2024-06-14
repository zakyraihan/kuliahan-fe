"use client";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { CreateDiskusiDto } from "./interface";
import InputText from "../InputText";
import useDiskusiModule from "./service";
import Button from "../Button";
import { formatDateTime } from "@/utils/date.utils";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image"; // Import next/image

const createDiskusiChema = yup.object().shape({
  komentar: yup.string().nullable().default("").required("Wajib isi"),
});

const Diskusi = ({ onClose }: any) => {
  const { useCreateDiskusi, useDiskusiList, useDeleteDiskusi } =
    useDiskusiModule();
  const { mutate: createMutate } = useCreateDiskusi();
  const { data, isLoading } = useDiskusiList();
  const { mutate: deleteMutate } = useDeleteDiskusi();
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null); // State to manage active menu index

  const formik = useFormik<CreateDiskusiDto>({
    initialValues: {
      komentar: "",
    },
    validationSchema: createDiskusiChema,
    enableReinitialize: true,
    onSubmit: (values) => {
      createMutate(values);
    },
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    resetForm,
    errors,
    setFieldValue,
  } = formik;

  const handleDelete = (id: number) => {
    deleteMutate(id);
  };

  const toggleMenu = (index: number) => {
    setActiveMenuIndex(activeMenuIndex === index ? null : index);
  };
  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 w-[30rem]  bg-gray-300 dark:bg-abu rounded-lg shadow-lg">
      <div className="flex justify-between items-center bg-gray-800 text-white p-2 rounded-t-lg">
        <h2 className="text-sm font-semibold">Diskusi</h2>
        <button onClick={onClose} className="text-white">
          X
        </button>
      </div>
      <div className="p-4 overflow-y-auto max-h-[45rem]">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data?.data.map((diskusi, index) => (
            <div key={index} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image
                    alt="Tailwind CSS chat bubble component"
                    src={"/image/avatar.png"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="chat-header flex justify-between items-center w-full">
                <div>
                  {diskusi.user.nama}
                  <time className="text-xs opacity-50 px-1">
                    {formatDateTime(diskusi.created_at)}
                  </time>
                </div>
                <div className="relative">
                  <button onClick={() => toggleMenu(index)}>
                    <EllipsisVertical className="text-gray-500" />
                  </button>
                  {activeMenuIndex === index && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-abu rounded-md shadow-lg z-10">
                      <button
                        onClick={() => handleDelete(diskusi.id)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          // Handle update here
                          // You might want to set some state to manage the edit mode
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-blue-500 hover:bg-gray-100"
                      >
                        Update
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="chat-bubble">{diskusi.komentar}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          ))
        )}
      </div>
      <div>
        <FormikProvider value={formik}>
          <Form
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-abu"
            onSubmit={handleSubmit}
          >
            <div className="w-full">
              <InputText
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.komentar}
                placeholder="Ketikkan sesuatu...."
                id="komentar"
                name="komentar"
                isError={!!errors.komentar}
                messageError={errors.komentar}
              />
            </div>
            <div className="">
              <Button title="Buat" colorSchema="blue" />
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default Diskusi;
