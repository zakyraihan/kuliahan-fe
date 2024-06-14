"use client";
import React, { ReactNode, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LucideIcon,
  LayoutDashboard,
  BadgeDollarSign,
  CircleUserRound,
  Settings,
  WalletCards,
  LogOut,
  Menu,
  University,
  X,
  LayoutList,
  School,
} from "lucide-react";
import Image from "next/image";
import useAuthModule from "../auth/lib/auth_service";
import { useSession } from "next-auth/react";

interface MenuItem {
  label: string;
  route: string;
  icon: React.ComponentType<any>;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { useUserList } = useAuthModule();
  const { data, isFetching, isLoading } = useUserList();
  const { data: session, status } = useSession();

  const menus: MenuItem[] = [
    {
      label: "Dashboard",
      route: "",
      icon: LayoutDashboard,
    },
    {
      label: "Data Akademik",
      route: "data-akademik",
      icon: BadgeDollarSign,
    },
    {
      label: "List Jurusan",
      route: "jurusan",
      icon: LayoutList,
    },
    {
      label: "Ruangan Belajar",
      route: "ruangan",
      icon: School,
    },
    {
      label: "Buat Jadwal",
      route: "buat-jadwal-kuliah",
      icon: School,
    },
    {
      label: "Tugas",
      route: "tugas",
      icon: School,
    },
    {
      label: "Akun Profil",
      route: "profile",
      icon: CircleUserRound,
    },
  ];

  const getCurrentRouteLabel = () => {
    const currentMenu = menus.find((menu) => pathName?.includes(menu.route));
    return currentMenu ? currentMenu.label : "Dashboard";
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-30 w-64 transition-transform transform dark:bg-[#212121]  bg-[#1db954] text-white md:relative md:translate-x-0 md:flex md:flex-col md:justify-between py-10",
          {
            "-translate-x-full": !isSidebarOpen,
            "translate-x-0": isSidebarOpen,
          }
        )}
      >
        <div className=" flex flex-col gap-10">
          <div className="flex flex-row items-center ">
            {/* <Image
              src={"/image/images-removebg-preview.png"}
              alt=""
              width={100}
              height={100}
            /> */}
            <h1 className="text-xl font-semibold px-10">
              Kuliah<span className="text-green-500">Hebat</span>
            </h1>
          </div>
          <div className="space-y-5 p-2">
            {menus.map((menu, index) => (
              <button
                key={index}
                onClick={() => {
                  router.push(`/admin/${menu.route}`);
                  setIsSidebarOpen(false); // Close the sidebar on menu item click
                }}
                className={clsx(
                  "flex items-center text-left  w-full py-2 px-4 rounded-md",
                  {
                    "bg-blue-700 hover:bg-blue-600":
                      pathName === `/admin/${menu.route}`,
                    "hover:bg-blue-400": pathName !== `/admin/${menu.route}`,
                  }
                )}
              >
                <menu.icon className="mr-3 h-6 w-6" />
                <span className="flex-1">{menu.label}</span>
              </button>
            ))}
          </div>
        </div>
        <hr />
        <div className="mt-9 overflow-x-scroll">
          <h1 className="px-5 py-2">Dosen</h1>

          {data?.data.map(
            (menu, index) =>
              menu.role === "dosen" && (
                <button
                  key={index}
                  className={clsx(
                    "flex items-center text-left gap-3 w-full py-3 px-5 rounded-md shadow-md transition-colors"
                  )}
                >
                  <Image
                    src={"/image/avatar.png"}
                    alt={`${menu.nama}'s avatar`}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <span className="block font-semibold text-sm dark:text-gray-200 text-black">
                      {menu.nama}
                      {menu.role === "dosen" && (
                        <span className="inline-block  text-sm w-2 h-2  bg-green-500 rounded-full"></span>
                      )}
                    </span>
                    <span className="block text-sm dark:text-gray-200 text-black">
                      {menu.email} | {menu.role}
                    </span>
                  </div>
                </button>
              )
          )}
        </div>
      </div>

      {/* Hamburger Menu */}
      <div className="flex justify-between items-center p-4 dark:bg-[#121212] bg-[#1db954] text-white md:hidden">
        <h1 className="text-xl font-semibold">
          Spo<span className="text-green-500">Versity</span>
        </h1>{" "}
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {!isSidebarOpen ? (
            <Menu className="h-8 w-8" />
          ) : (
            <X className="h-8 w-8" />
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-black shadow-lg dark:text-white">
        {children}
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* List User */}
      <div className="hidden md:block space-y-5 p-2 dark:bg-abu "></div>
    </div>
  );
}
