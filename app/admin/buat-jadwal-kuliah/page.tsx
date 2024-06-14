"use client";
import useJadwalModule from "@/app/admin/buat-jadwal-kuliah/lib";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const Schedule = () => {
  const { useJadwalList, useDeleteJadwal } = useJadwalModule();
  const { mutate } = useDeleteJadwal();
  const { data, isFetching } = useJadwalList();
  const router = useRouter();

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
          await mutate(id);
        }
      });
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-6 text-center">Class Schedule</h2>
        <h2
          className="text-3xl font-bold mb-6 text-center cursor-pointer"
          onClick={() => router.push("buat-jadwal-kuliah/tambah")}
        >
          Buat Jadwal
        </h2>
      </div>
      <div className="space-y-6">
        <table className="min-w-full bg-base-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Hari</th>
              <th className="py-2 px-4 border-b border-gray-300">Waktu</th>
              <th className="py-2 px-4 border-b border-gray-300">Topik</th>
              <th className="py-2 px-4 border-b border-gray-300">Dosen</th>
              <th className="py-2 px-4 border-b border-gray-300">Ruangan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data &&
              data.data.map((items, idx) => (
                <tr key={idx} className="">
                  <td className="py-2 px-4 border-b border-gray-200">
                    {items.hari}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {items.waktuMulai} - {items.waktuSelesai}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {items.mata_kuliah}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {items.dosen.nama}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {items.ruang_kuliah.nama_ruangan}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 flex gap-2">
                    <Button
                      title="Delete"
                      colorSchema="red"
                      width="sm"
                      onClick={() => {
                        handleDelete(items.id || 0);
                      }}
                    />
                    <Button
                      title="Edit"
                      colorSchema="blue"
                      width="sm"
                      onClick={() =>
                        router.push(`buat-jadwal-kuliah/${items.id}/update`)
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
