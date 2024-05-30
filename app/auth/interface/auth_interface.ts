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

export interface RegisterPayload extends Omit<User, "id"> {}

export interface LoginPayload
  extends Pick<User, "nama" | "email" | "password"> {}

export interface LoginResponse extends BaseResponseSucces {
  data: User;
}

export interface ProfileResponse extends BaseResponseSucces {
  data: User[];
}
