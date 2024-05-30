"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthModule from "../auth/lib/auth_service";
import { useSession } from "next-auth/react";
import { Chart } from "react-google-charts";
import ChartGoogle from "@/components/Chart";
import useJurusanModule from "./jurusan/lib/jurusan_service";
import CameraComponent from "@/components/CameraComp";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <ChartGoogle chartType="PieChart" data={chartData} />
      </div>
    </>
  );
};

export default Dashboard;
