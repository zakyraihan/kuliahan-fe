import useAxiosAuth from "@/hook/useAxosAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  DetailMahasiswa,
  MahasiswaCreateArrayPayload,
  MahasiswaFilterList,
  MahasiswaListResponse,
  MahasiswaUpdatePayload,
} from "../interface/mahasiswa_interface";
import { useSession } from "next-auth/react";
import { usePagination } from "@/hook/usePagination";
import Swal from "sweetalert2";
import useToast from "@/hook/useToast";
import useUploadFile from "@/hook/useUploadFile";

const useMahasiswaModule = () => {
  const defaultParams: MahasiswaFilterList = {
    nama_mahasiswa: "",
    nim: 0,
    page: 1,
    pageSize: 10,
  };
  const router = useRouter();
  const queryClient = useQueryClient();
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const { toastError, toastSuccess, toastWarning } = useToast();
  const { uploadSingle } = useUploadFile();

  const getMahasiswaList = async (
    params: MahasiswaFilterList
  ): Promise<MahasiswaListResponse> => {
    return axiosAuthClient
      .get("/mahasiswa/list", { params })
      .then((res) => res.data);
  };

  const useMahasiswaList = () => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams,
    } = usePagination(defaultParams);
    const { data, isFetching, isLoading } = useQuery(
      ["/mahasiswa/list", filterParams],
      () => getMahasiswaList(filterParams),
      {
        select: (response) => response,
        enabled: !!session === true,
        keepPreviousData: true,
      }
    );

    return {
      data,
      isFetching,
      isLoading,
      params,
      setParams,
      handlePageSize,
      handlePage,
      handleFilter,
      handleClear,
    };
  };

  const useCreateBulkMahasiswa = () => {
    const { mutate, isLoading } = useMutation(
      async (payload: MahasiswaCreateArrayPayload) => {
        if (payload.file !== undefined) {
          const res = await uploadSingle(payload.file);
          console.log("res", res);

          payload.data = payload.data.map((mahasiswa) => ({
            ...mahasiswa,
            foto_mahasiswa: res.data.file_url,
          }));
        }
        return axiosAuthClient.post("/mahasiswa/create-bulk", payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
        },
        onError: (error) => {
          toastSuccess(`terjadi kesalahan ${error}`);
        },
      }
    );
    return { mutate, isLoading };
  };

  const getDetailMahasiswa = async (id: string): Promise<DetailMahasiswa> => {
    return axiosAuthClient
      .get(`/mahasiswa/detail/${id}`)
      .then((res) => res.data.data);
  };

  const useDetailMahasiswa = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/mahasiswa/detail", { id }],
      () => getDetailMahasiswa(id),
      {
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };

  const useDeleteMahasiswa = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosAuthClient.delete(`/mahasiswa/delete/${id}`);
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
          queryClient.invalidateQueries(["/mahasiswa/list"]);
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

  const useUpdateMahasiswa = (id: string) => {
    const { mutate, isLoading } = useMutation(
      (payload: MahasiswaUpdatePayload) => {
        return axiosAuthClient.put(`/mahasiswa/update/${id}`, payload);
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
          queryClient.invalidateQueries(["/mahasiswa/detail"]);
        },

        onError: (error) => {
          alert("ok");
        },
      }
    );
    return { mutate, isLoading };
  };

  return {
    useMahasiswaList,
    useCreateBulkMahasiswa,
    useDetailMahasiswa,
    useDeleteMahasiswa,
    useUpdateMahasiswa,
  };
};

export default useMahasiswaModule;
