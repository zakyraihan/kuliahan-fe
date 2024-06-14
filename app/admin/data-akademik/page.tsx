"use client";
import React from "react";
import useMahasiswaModule from "./lib/mahasiswa_service";
import MahasiswaTable from "@/app/admin/data-akademik/components/TabelMahasiswa";
import Pagination from "@/components/Pagination";
import ShimmerMahasiswa from "./components/Shimmer";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Button from "@/components/Button";
import { Drawer } from "@/components/Drawer";
import useDisclosure from "@/hook/useDisclosure";
import Filter from "./module/filter";

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading || isFetching) {
    return <ShimmerMahasiswa />;
  }
  const router = useRouter();

  return (
    <>
      <div className="flex">
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
      <br />
      {data ? <MahasiswaTable data={data.data} /> : null}
      <Pagination
        page={params.page}
        pageSize={params.pageSize}
        handlePageSize={handlePageSize}
        handlePage={handlePage}
        pagination={data?.pagination}
      />
      <button
        className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
        onClick={() => router.push("data-akademik/tambah-data")}
      >
        Tambah
      </button>
    </>
  );
};

export default DataAkademik;
