"use client";
import React from "react";
import useRuanganModule from "./lib/ruangan_service";
import RuanganShimmer from "./components/Shimmer";
import { useRouter } from "next/navigation";

const Ruangan = () => {
  const { useRuanganList } = useRuanganModule();
  const { data, isFetching, isLoading } = useRuanganList();
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <RuanganShimmer />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data.map((items, index) => (
            <div
              key={index}
              className="relative border dark:border-gray-600  border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
            >
              <div
                className="bg-cover bg-center h-48"
                style={{ backgroundImage: `url(${items.gambar_ruangan})` }}
              ></div>
              <div className="p-4 bg-white dark:bg-gray-600">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {items.nama_ruangan}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Kapasitas: {items.kapasitas_ruangan} orang
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        className="fixed bottom-8 right-8 bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
        onClick={() => router.push("ruangan/tambah")}
      >
        Add
      </button>
    </div>
  );
};

export default Ruangan;
