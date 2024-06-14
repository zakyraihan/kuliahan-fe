"use client";
import useJadwalModule from "@/app/admin/buat-jadwal-kuliah/lib";
import Button from "@/components/Button";
import React from "react";

const Schedule = () => {
  const { useJadwalList } = useJadwalModule();
  const { data, isFetching } = useJadwalList();
  console.log("data", data);

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Class Schedule</h2>
      <div className="space-y-6">
        <table className="min-w-full bg-base-200 dark:bg-abu">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Hari</th>
              <th className="py-2 px-4 border-b border-gray-300">Waktu</th>
              <th className="py-2 px-4 border-b border-gray-300">Topik</th>
              <th className="py-2 px-4 border-b border-gray-300">Dosen</th>
              <th className="py-2 px-4 border-b border-gray-300">Ruangan</th>
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
