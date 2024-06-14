import useAxiosAuth from "@/hook/useAxosAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateDiskusiDto, DiskusiList, updateDiskusiDto } from "./interface";
import { useSession } from "next-auth/react";
import useToast from "@/hook/useToast";

const useDiskusiModule = () => {
  const queryClient = useQueryClient();
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const { toastError, toastSuccess, toastWarning } = useToast();

  const useCreateDiskusi = () => {
    const { mutate, isLoading } = useMutation(
      async (payload: CreateDiskusiDto) => {
        return axiosAuthClient
          .post("/diskusi/create", payload)
          .then((res) => res.data);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["/diskusi/list"]);
        },
        onError: (error) => {
          //   toastError(`Terjadi kesalahan: ${error.message}`);
        },
      }
    );
    return { mutate, isLoading };
  };

  const getDiskusiList = async (): Promise<DiskusiList> => {
    return axiosAuthClient.get("/diskusi/list").then((res) => res.data);
  };

  const useDiskusiList = () => {
    const { data, isFetching, isLoading } = useQuery(
      ["/diskusi/list"],
      () => getDiskusiList(),
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
    };
  };

  const useDeleteDiskusi = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosAuthClient.delete(`/diskusi/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries(["/diskusi/list"]);
        },
      }
    );

    return { mutate, isLoading };
  };

  const useUpdateDiskusi = (id: string) => {
    const { mutate, isLoading } = useMutation(
      (payload: updateDiskusiDto) => {
        return axiosAuthClient.put(`/diskusi/update/${id}`, payload);
      },
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries(["/diskusi/list"]);
        },
        onError: (error) => {
          alert(error);
        },
      }
    );
    return { mutate, isLoading };
  };

  return {
    useCreateDiskusi,
    useDiskusiList,
    useDeleteDiskusi,
    useUpdateDiskusi,
  };
};

export default useDiskusiModule;
