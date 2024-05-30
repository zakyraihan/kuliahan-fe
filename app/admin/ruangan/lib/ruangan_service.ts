import useAxiosAuth from "@/hook/useAxosAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  CreateRuanganDto,
  ListRuanganResponse,
} from "../interface/ruangan_interface";
import useUploadFile from "@/hook/useUploadFile";
import useToast from "@/hook/useToast";

const useRuanganModule = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const { toastError, toastSuccess, toastWarning } = useToast();
  const { uploadSingle } = useUploadFile();

  const getRuanganList = async (): Promise<ListRuanganResponse> => {
    return axiosAuthClient.get("/ruangan/list").then((res) => res.data);
  };

  const useRuanganList = () => {
    const { data, isFetching, isLoading } = useQuery(
      ["/ruangan/list"],
      () => getRuanganList(),
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

  const createRuangan = async (
    payload: CreateRuanganDto
  ): Promise<CreateRuanganDto> => {
    if (payload.file !== undefined) {
      const res = await uploadSingle(payload.file);
      console.log("res", res);

      payload = {
        ...payload,
        gambar_ruangan: res.data.file_url,
      };
    }
    return axiosAuthClient
      .post("/ruangan/create", payload)
      .then((res) => res.data);
  };

  const useCreateRuangan = () => {
    const { isLoading, mutate } = useMutation(
      (payload: CreateRuanganDto) => createRuangan(payload),
      {
        onSuccess: (response) => {
          toastSuccess(`berhasil membuat ${response.nama_ruangan}`);
        },
        onError: (gagal) => {
          console.log("error", gagal);
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };

  return { useRuanganList, useCreateRuangan };
};

export default useRuanganModule;
