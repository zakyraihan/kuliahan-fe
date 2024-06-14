import useAxiosAuth from "@/hook/useAxosAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { usePagination } from "@/hook/usePagination";
import Swal from "sweetalert2";
import useToast from "@/hook/useToast";
import useUploadFile from "@/hook/useUploadFile";
import {
  ListTugasResponse,
  TugasCreatePayload,
  TugasDetail,
  TugasFilterList,
  TugasUpdatePayload,
  TugasUpdateByMahasiswaPayload,
} from "../interface";

const useTugasModule = () => {
  const defaultParams: TugasFilterList = {
    title: "",
    page: 1,
    pageSize: 10,
  };
  const router = useRouter();
  const queryClient = useQueryClient();
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const { toastError, toastSuccess, toastWarning } = useToast();
  const { uploadSingle } = useUploadFile();

  const useCreateTugas = () => {
    const { mutate, isLoading } = useMutation(
      async (payload: TugasCreatePayload) => {
        if (payload.file !== undefined) {
          const res = await uploadSingle(payload.file);
          console.log("res", res);

          payload = {
            ...payload,
            gambar: res.data.file_url,
          };
        }
        return axiosAuthClient
          .post("/tugas/create", payload)
          .then((res) => res.data);
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

  const getTugasList = async (
    params: TugasFilterList
  ): Promise<ListTugasResponse> => {
    return axiosAuthClient
      .get("/tugas/list", { params })
      .then((res) => res.data);
  };

  const useTugasList = () => {
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
      () => getTugasList(filterParams),
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

  const useUpdateTugasByMahasiswa = (id: string) => {
    const { mutate, isLoading } = useMutation(
      (payload: TugasUpdateByMahasiswaPayload) => {
        return axiosAuthClient.put(`tugas/updatebymahasiswa/${id}`, payload);
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
          router.back();
        },
        onError: (error) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${error}`,
            showConfirmButton: false,
            timer: 1000,
          });
        },
      }
    );
    return { mutate, isLoading };
  };

  const useDeletegas = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosAuthClient.delete(`/tugas/delete/${id}`);
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
          queryClient.invalidateQueries(["/tugas/list"]);
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

  const useUpdateTugas = (id: string) => {
    const { mutate, isLoading } = useMutation(
      (payload: TugasUpdatePayload) => {
        return axiosAuthClient.put(`/tugas/update/${id}`, payload);
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
          queryClient.invalidateQueries(["/tugas/detail"]);
        },

        onError: (error) => {
          alert("ok");
        },
      }
    );
    return { mutate, isLoading };
  };

  const getDetailTugas = async (id: string): Promise<TugasDetail> => {
    return axiosAuthClient
      .get(`/tugas/detail/${id}`)
      .then((res) => res.data.data);
  };

  const useDetailTugas = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/tugas/detail", { id }],
      () => getDetailTugas(id),
      {
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };

  return {
    useCreateTugas,
    useTugasList,
    useUpdateTugasByMahasiswa,
    useDeletegas,
    useUpdateTugas,
    useDetailTugas,
  };
};

export default useTugasModule;
