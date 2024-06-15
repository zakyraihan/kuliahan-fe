import { BaseResponseSucces } from "@/lib/axiosClient";

interface User {
  id?: number;
  nama: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}

export interface RegisterResponse extends BaseResponseSucces {}

export interface RegisterPayload extends Omit<User, "id" | "created_at"> {}

export interface LoginPayload
  extends Pick<User, "nama" | "email" | "password"> {}

export interface LoginResponse extends BaseResponseSucces {
  data: User;
}
export interface ResetPassword {
  new_password: string;
}
export interface LupaPasswordPayload extends Pick<User, "email"> {}
export interface LupaPasswordResponse extends BaseResponseSucces {}
export interface ProfileResponse extends BaseResponseSucces {
  data: User[];
}
