"use client";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import useAuthModule from "../auth/lib/auth_service";
import { useSession } from "next-auth/react";
import { Chart } from "react-google-charts";
import ChartGoogle from "@/components/Chart";
import useJurusanModule from "./jurusan/lib/jurusan_service";
import TugasSelesai from "@/components/TugasSelesai";
export const options = {
  title: "Peminat Jurusan Terbanyak di Spoversity",
  chartArea: { width: "50%" },
  hAxis: {
    title: "Total Peminat",
    minValue: 0,
  },
  vAxis: {
    title: "Peminat Jurusan",
  },
};
const Dashboard = () => {
  const { useProfile } = useAuthModule();
  const { data: session, status } = useSession();

  const { useJurusanList } = useJurusanModule();
  const { data, isLoading, isFetching } = useJurusanList();

  // Format data jurusan menjadi array untuk digunakan di ChartGoogle
  const chartData = [["jurusan", "peminat"]];
  data?.data.forEach((jurusan: any) => {
    chartData.push([jurusan.nama_jurusan, jurusan.peminat_jurusan]);
  });

  console.log("data", data);

  return (
    <>
      <div className="flex flex-col sm:flex-col md:flex-row gap-7 p-6">
        <Chart
          chartType="BarChart"
          width="590px"
          height="300px"
          data={chartData}
          options={options}
        />
      </div>
      <div className="mt-5">
        <TugasSelesai />
      </div>
    </>
  );
};

export default Dashboard;
