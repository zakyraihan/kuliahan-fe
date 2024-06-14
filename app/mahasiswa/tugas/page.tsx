"use client";
import React, { useState, useEffect } from "react";
import { BadgeCheck, Clock } from "lucide-react";
import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import Button from "@/components/Button";
import useTugasModule from "@/app/admin/tugas/lib";
import {
  Tugas,
  TugasUpdateByMahasiswaPayload,
} from "@/app/admin/tugas/interface";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDateTime } from "@/utils/date.utils";
import { useSession } from "next-auth/react";
import Pagination from "@/components/Pagination";

const TugasPage: React.FC = () => {
  const { useTugasList } = useTugasModule();
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
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold mb-4">Daftar Tugas</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((task, index) => (
          <div
            key={index}
            onClick={() => router.push(`tugas/${task.id}/update`)}
          >
            <div className="">
              <label
                htmlFor={`my_modal_6`}
                className="bg-white dark:bg-abu dark:text-white p-4 text-slate-700 cursor-pointer shadow-xl flex flex-col"
              >
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-lg">{task.title}</div>
                  {(() => {
                    if (task.status === "pengerjaan") {
                      return <Clock className="h-6 w-6 text-yellow-500" />;
                    } else if (
                      task.status === "selesai" &&
                      task.updated_by_mahasiswa?.id === session?.user?.id
                    ) {
                      return <BadgeCheck className="h-6 w-6 text-green-500" />;
                    }
                    return null;
                  })()}
                </div>
                <br />
                <Link
                  href={task.gambar}
                  className="text-gray-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {task.gambar}
                </Link>{" "}
                <br />
                <div className="">{task.description}</div>
                <br />
                <div className="flex flex-row justify-between">
                  <h1> {formatDateTime(task.created_at)}</h1>
                  <h1 className="text-sm text-gray-400">
                    {task.jurusan.nama_jurusan}
                  </h1>
                </div>
              </label>
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
  );
};

export default TugasPage;
