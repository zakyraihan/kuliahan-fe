import { useSession } from "next-auth/react";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "./useAxosAuth";

const useOption = () => {
  const axiosAuth = useAxiosAuth();
  const { data: session } = useSession();

  const getJurusan = async (): Promise<any> => {
    return axiosAuth.get("/jurusan/list").then((res) => res.data);
  };

  const { data: optionJurusan, isFetching } = useQuery(
    ["/jurusan/list/options"],
    () => getJurusan(),
    {
      enabled: !!session === true,
      select: (data) => {
        console.log("data", data);

        const options = data?.data?.map((item: any) => {
          return {
            label: item.nama_jurusan,
            value: item.id,
          };
        });

        return options;
      },
    }
  );

  const getRuangan = async (): Promise<any> => {
    return axiosAuth.get("/ruangan/list").then((res) => res.data);
  };

  const { data: optionRuangan } = useQuery(
    ["/ruangan/list/options"],
    () => getRuangan(),
    {
      enabled: !!session === true,
      select: (data) => {
        console.log("data", data);

        const options = data?.data?.map((item: any) => {
          return {
            label: item.nama_ruangan,
            value: item.id,
          };
        });

        return options;
      },
    }
  );

  const getUser = async (): Promise<any> => {
    return axiosAuth.get("/auth/user").then((res) => res.data);
  };

  const { data: optionUser } = useQuery(
    ["/auuth/user/options"],
    () => getUser(),
    {
      enabled: !!session === true,
      select: (data) => {
        console.log("data", data);

        const options = data?.data?.map((item: any) => {
          return {
            label: item.nama,
            value: item.id,
          };
        });

        return options;
      },
    }
  );

  return { optionJurusan, optionRuangan, optionUser };
};

export default useOption;
