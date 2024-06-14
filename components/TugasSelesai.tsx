"use client";
import useTugasModule from "@/app/admin/tugas/lib";
import React from "react";
import { BadgeCheck, Clock } from "lucide-react";
import Pagination from "./Pagination";
import { setPriority } from "os";
const TugasSelesai = () => {
  const { useTugasList } = useTugasModule();
  const {
    data,
    handleFilter,
    handleClear,
    params,
    setParams,
    handlePage,
    handlePageSize,
  } = useTugasList();

  return (
    <div className="">
      <h1 className="text-2xl font-semibold">Tugas Selesai</h1>
      <br />
      <table className=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-abu dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nama Mahasiswa
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Tugas
            </th>
            <th scope="col" className="px-6 py-3">
              status
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((tugas, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-abu dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {tugas.updated_by_mahasiswa?.nama}
              </th>

              <td className="px-6 py-4">{tugas.title}</td>
              <td className="px-6 py-4">{tugas.gambar}</td>
              <td className="px-6 py-4 flex items-center">
                {tugas.status}
                {tugas.status === "selesai" ? (
                  <BadgeCheck className="ml-2 text-green-500" />
                ) : (
                  <Clock className="ml-2 text-yellow-500" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default TugasSelesai;
