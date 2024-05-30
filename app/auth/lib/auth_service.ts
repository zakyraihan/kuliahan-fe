import useToast from "@/hook/useToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  LoginPayload,
  LoginResponse,
  ProfileResponse,
  RegisterPayload,
  RegisterResponse,
} from "../interface/auth_interface";
import axiosClient from "@/lib/axiosClient";
import { signIn, useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import useAxiosAuth from "@/hook/useAxosAuth";

const useAuthModule = () => {
  const { data: session } = useSession();
  const axiosAuthClient = useAxiosAuth();
  const router = useRouter();
  const { toastError, toastSuccess, toastWarning } = useToast();

  const register = async (
    payload: RegisterPayload
  ): Promise<RegisterResponse> => {
    return axiosClient.post("/auth/register", payload).then((res) => res.data);
  };

  const useRegister = () => {
    const { mutate, isLoading, isError, error } = useMutation({
      mutationFn: async (payload: RegisterPayload) => register(payload),
      onSuccess: async (response) => {
        await toastSuccess(response.message);
        router.push("/auth/login");
      },
      onError: (error: any) => {
        if (error.response && error.response.status) {
          toastWarning(error.response.data.message);
        }
      },
    });

    return { mutate, isLoading, isError, error };
  };

  const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    return axiosClient.post("/auth/login", payload).then((res) => res.data);
  };

  const useLogin = () => {
    const router = useRouter();
    const { mutate, isLoading } = useMutation(
      (payload: LoginPayload) => login(payload),
      {
        onSuccess: async (response: any) => {
          console.log("response", response);

          await signIn("credentials", {
            id: response.data.id,
            name: response.data.nama,
            email: response.data.email,
            accessToken: response.data.access_token,
            role: response.data.role,
            refreshToken: response.data.refresh_token,
            redirect: false,
          });
          toastSuccess(response.message);

          if (response.data.role === "dosen") {
            return router.push("/admin");
          } else {
            return router.push("/mahasiswa");
          }
        },

        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      }
    );
    return { mutate, isLoading };
  };

  const getProfile = async (): Promise<ProfileResponse> => {
    return axiosAuthClient.get("/auth/profile").then((res) => res.data);
  };

  const useProfile = () => {
    const { data, isLoading, isFetching } = useQuery(
      ["/auth/profile"],
      () => getProfile(),
      {
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
      }
    );

    return { data, isFetching, isLoading };
  };

  const getUserList = async (): Promise<ProfileResponse> => {
    return axiosAuthClient.get("/auth/user").then((res) => res.data);
  };

  const useUserList = () => {
    const { data, isFetching, isLoading } = useQuery(
      ["/auth/user"],
      () => getUserList(),
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

  return { useRegister, useLogin, useProfile, useUserList };
};

export default useAuthModule;
