"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Use 'next/router' instead of 'next/navigation'
import React, { useEffect } from "react";

import { signOut } from "next-auth/react";
import Image from "next/image";
import useAuthModule from "../auth/lib/auth_service";
import Button from "@/components/Button";

const Mahasiswa = () => {
  const router = useRouter();
  const { useProfile } = useAuthModule();
  const { data: profile, isFetching } = useProfile();
  const { data: session, status } = useSession();

  //   useEffect(() => {
  //     if (!session) {
  //       router.push("/auth/login");
  //     }
  //   }, [session, router]);

  console.log("profile", profile?.data);

  return (
    <div>
      {JSON.stringify(session)}
      {/* <>

        <p>ini adalah halaman mahasiswa</p>
        <p>halo {session?.user.name}</p>

        <Button
          title="Log out"
          colorSchema="blue"
          width="40"
          onClick={() => {
            signOut({ redirect: false });
            router.push("/auth/login");
          }}
        />
      </> */}
    </div>
  );
};

export default Mahasiswa;
