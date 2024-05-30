"use client";
import React from "react";
import useJurusanModule from "./lib/jurusan_service";
import Shimmer from "@/components/Shimmer";
import { useRouter } from "next/navigation";

const Jurusan = () => {
  const { useJurusanList } = useJurusanModule();
  const { data, isFetching, isLoading } = useJurusanList();
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <Shimmer />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data.map((items, index) => (
            <div
              // onClick={() => router.push(`jurusan/${items.id}/edit`)}
              key={index}
              className="border dark:border-gray-400 border-gray-800 rounded-lg shadow-md p-6 cursor-pointer inline-flex items-center"
            >
              <p>Jurusan {items.nama_jurusan}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jurusan;
