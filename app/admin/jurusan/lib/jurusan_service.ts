import useAxiosAuth from "@/hook/useAxosAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  CreateJurusanDto,
  DetailJurusan,
  ListJurusanResponse,
  UpdateJurusan,
} from "../interface/jurusan_model";
import useToast from "@/hook/useToast";

const useJurusanModule = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const { toastError, toastSuccess, toastWarning } = useToast();

  const getProdukList = async (): Promise<ListJurusanResponse> => {
    return axiosAuthClient.get("/jurusan/list").then((res) => res.data);
  };

  const useJurusanList = () => {
    const { data, isFetching, isLoading } = useQuery(
      ["/jurusan/list"],
      () => getProdukList(),
      {
        select: (response) => response,
        enabled: !!session === true,
      }
    );

    return {
      data,
      isFetching,
      isLoading,
    };
  };

  const getDetailJurusan = async (id: string): Promise<DetailJurusan> => {
    return axiosAuthClient
      .get(`/jurusan/detail/${id}`)
      .then((res) => res.data.data);
  };

  const useDetailJurusan = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/jurusan/detail", { id }],
      () => getDetailJurusan(id),
      {
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };

  const useUpdateJurusan = (id: string) => {
    const { mutate, isLoading } = useMutation(
      (payload: UpdateJurusan) => {
        return axiosAuthClient.put(`/jurusan/update/${id}`, payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/jurusan/detail"]);
          router.back();
        },

        onError: (error) => {
          alert("error");
        },
      }
    );
    return { mutate, isLoading };
  };

  const useCreateJurusan = () => {
    const { isLoading, mutate } = useMutation(
      (payload: CreateJurusanDto) => {
        return axiosAuthClient.post("/jurusan/create", payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(`${response.data.message}`);
        },
        onError: (gagal) => {
          console.log("error", gagal);
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };

  return {
    useJurusanList,
    useDetailJurusan,
    useUpdateJurusan,
    useCreateJurusan,
  };
};

export default useJurusanModule;
