"use client";
import React from "react";
import useMahasiswaModule from "./lib/mahasiswa_service";
import MahasiswaTable from "@/app/admin/data-akademik/components/TabelMahasiswa";
import Pagination from "@/components/Pagination";
import ShimmerMahasiswa from "./components/Shimmer";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const DataAkademik = () => {
  const { useMahasiswaList, useDeleteMahasiswa } = useMahasiswaModule();
  const { mutate } = useDeleteMahasiswa();
  const {
    data,
    isFetching,
    isLoading,
    handleClear,
    handlePage,
    handlePageSize,
    handleFilter,
    params,
    setParams,
  } = useMahasiswaList();
 

  if (isLoading || isFetching) {
    return <ShimmerMahasiswa />;
  }
  const router = useRouter();

  return (
    <>
      {data ? <MahasiswaTable data={data.data} /> : null}
      <Pagination
        page={params.page}
        pageSize={params.pageSize}
        handlePageSize={handlePageSize}
        handlePage={handlePage}
        pagination={data?.pagination}
      />
      <button
        className="fixed bottom-8 right-8 bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
        onClick={() => router.push("data-akademik/tambah-data")}
      >
        Add
      </button>
    </>
  );
};

export default DataAkademik;
