import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import useMahasiswaModule from "../lib/mahasiswa_service";
import Swal from "sweetalert2";

const MahasiswaTable = ({ data }: any) => {
  const { useMahasiswaList, useDeleteMahasiswa } = useMahasiswaModule();
  const { mutate } = useDeleteMahasiswa();
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
  const router = useRouter();
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Foto
          </th>
          <th scope="col" className="px-6 py-3">
            Nama Mahasiswa
          </th>
          <th scope="col" className="px-6 py-3">
            NIM
          </th>
          <th scope="col" className="px-6 py-3">
            Umur
          </th>
          <th scope="col" className="px-6 py-3">
            Asal
          </th>
          <th scope="col" className="px-6 py-3">
            Jurusan
          </th>
          <th scope="col" className="px-6 py-3">
            Ruangan
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((mahasiswa: any, index: any) => (
          <tr
            key={index}
            className="bg-white  border-b dark:bg-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td
              className="px-4 py-2" // Ubah padding di sini
              style={{
                backgroundImage: `url(${mahasiswa.foto_mahasiswa})`,
                backgroundSize: "cover",
                width: "50px",
                height: "50px",
                borderRadius: "5px",
              }}
            />
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-slate-300">
              {mahasiswa.nama_mahasiswa}
            </td>
            <td className="px-6 py-4 text-white">{mahasiswa.nim}</td>
            <td className="px-6 py-4">{mahasiswa.umur}</td>
            <td className="px-6 py-4">{mahasiswa.asal}</td>
            <td className="px-6 py-4 text-white">
              {mahasiswa.jurusan.nama_jurusan}
            </td>
            <td className="px-6 py-4">{mahasiswa.ruangan.nama_ruangan}</td>
            <td className="px-6 py-4 flex items-center space-x-2">
              <button
                className="focus:outline-none cursor-pointer"
                onClick={() =>
                  router.push(`data-akademik/${mahasiswa.id}/edit`)
                }
              >
                <Pencil className="w-6 h-6 text-blue-600 dark:text-blue-500 hover:underline" />
              </button>
              <span className="text-gray-500 dark:text-gray-400 ">|</span>
              <button
                className="focus:outline-none cursor-pointer"
                onClick={() => {
                  handleDelete(mahasiswa.id || 0);
                }}
              >
                <Trash className="w-6 h-6 text-red-600 dark:text-red-500 hover:underline" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MahasiswaTable;
