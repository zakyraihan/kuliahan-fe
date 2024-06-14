import {
  JadwalCreatePayload,
  ListJadwalResponse,
  UpdateJadwal,
} from "./interfaces";
import useAxiosAuth from "@/hook/useAxosAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useToast from "@/hook/useToast";
import Swal from "sweetalert2";

const useJadwalModule = () => {
  const router = useRouter();
  const { toastError, toastSuccess, toastWarning } = useToast();

  const queryClient = useQueryClient();
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();

  const getJadwalList = async (): Promise<ListJadwalResponse> => {
    return axiosAuthClient.get("/jadwal-kuliah/list").then((res) => res.data);
  };

  const useJadwalList = () => {
    const { data, isFetching, isLoading } = useQuery(
      ["/jadwal-kuliah/list"],
      () => getJadwalList(),
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

  const createJadwal = async (
    payload: JadwalCreatePayload
  ): Promise<JadwalCreatePayload> => {
    return axiosAuthClient.post("/jadwal-kuliah/create", payload);
  };

  const useCreateJadwal = () => {
    const { isLoading, mutate } = useMutation(
      (payload: JadwalCreatePayload) => createJadwal(payload),
      {
        onSuccess: (response) => {
          toastSuccess(`berhasil membuat jadwal`);
        },
        onError: (gagal) => {
          console.log("error", gagal);
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };

  const useDeleteJadwal = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosAuthClient.delete(`/jadwal-kuliah/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          });
          queryClient.invalidateQueries(["/jadwal-kuliah/list"]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            Swal.fire({
              position: "top",
              icon: "warning",
              title: error.response.data.message,
              showConfirmButton: false,
              timer: 1000,
            });
          } else {
            Swal.fire({
              position: "top",
              icon: "error",
              title: "Ada Kesalahan",
              showConfirmButton: false,
              timer: 1000,
            });
          }
        },
      }
    );

    return { mutate, isLoading };
  };

  const useUpdateJadwal = (id: string) => {
    const { mutate, isLoading } = useMutation(
      (payload: UpdateJadwal) => {
        return axiosAuthClient.put(`/jadwal-kuliah/update/${id}`, payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/jadwal/detail"]);
          router.back();
        },

        onError: (error) => {
          alert("error");
        },
      }
    );
    return { mutate, isLoading };
  };

  return { useJadwalList, useCreateJadwal, useDeleteJadwal, useUpdateJadwal };
};

export default useJadwalModule;
