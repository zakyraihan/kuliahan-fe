"use client";
import React, { ReactNode, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Home,
  CircleUserRound,
  Menu,
  X,
  BookOpenText,
  CalendarCheck,
  Bell,
} from "lucide-react";
import Image from "next/image";
import useAuthModule from "../auth/lib/auth_service";
import { useSession } from "next-auth/react";
import useTugasModule from "../admin/tugas/lib";

interface MenuItem {
  label: string;
  route: string;
  icon: React.ComponentType<any>;
}

export default function MahasiswaLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();
  const { useTugasList } = useTugasModule();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { useUserList } = useAuthModule();
  const { data, isFetching, isLoading } = useUserList();
  const { data: session, status } = useSession();

  const menus: MenuItem[] = [
    {
      label: "Beranda",
      route: "",
      icon: Home,
    },
    {
      label: "Schedule",
      route: "jadwal-kuliah",
      icon: CalendarCheck,
    },
    {
      label: "Tugas",
      route: "tugas",
      icon: BookOpenText,
    },
  ];

  const getCurrentRouteLabel = () => {
    const currentMenu = menus.find((menu) => pathName?.includes(menu.route));
    return currentMenu ? currentMenu.label : "Dashboard";
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col md:flex-row">
        {/* Sidebar */}
        <div
          className={clsx(
            "fixed inset-y-0 left-0 z-30 w-64 transition-transform transform dark:bg-[#212121] bg-[#1db954] text-white md:relative md:translate-x-0 md:flex md:flex-col md:justify-between py-10",
            {
              "-translate-x-full": !isSidebarOpen,
              "translate-x-0": isSidebarOpen,
            }
          )}
        >
          <div className="flex flex-col gap-10">
            <div className="flex flex-row items-center">
              <h1 className="text-xl font-semibold px-10">
                Kuliah<span className="text-green-500">Hebat</span>
              </h1>
            </div>
            <div className="space-y-5 p-2">
              {menus.map((menu, index) => (
                <button
                  key={index}
                  onClick={() => {
                    router.push(`/mahasiswa/${menu.route}`);
                    setIsSidebarOpen(false); // Close the sidebar on menu item click
                  }}
                  className={clsx(
                    "flex items-center text-left w-full py-2 px-4 rounded-md",
                    {
                      "bg-blue-700 hover:bg-blue-600":
                        pathName === `/mahasiswa/${menu.route}`,
                      "hover:bg-blue-400":
                        pathName !== `/mahasiswa/${menu.route}`,
                    }
                  )}
                >
                  <menu.icon className="mr-3 h-6 w-6" />
                  <span className="flex-1">{menu.label}</span>
                </button>
              ))}
            </div>
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
      </div>

      <footer className="footer footer-center p-10 bg-abu text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>
    </>
  );
}
