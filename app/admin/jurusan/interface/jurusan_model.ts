import { BaseResponsePagination } from "@/lib/axiosClient";

export interface Jurusan {
  id?: number;
  nama_jurusan: string;
  peminat_jurusan: number;
  created_at: string;
  updated_at: string;
}

export interface ListJurusanResponse extends BaseResponsePagination {
  data: Jurusan[];
}

export interface JurusanFilterList extends Partial<Jurusan> {
  nama_jurusan: string;
}

export interface CreateJurusanDto
  extends Omit<
    Jurusan,
    "created_at" | "updated_at" | "id" | "peminat_jurusan"
  > {}

export interface JurusanCreatePayload extends Pick<Jurusan, "nama_jurusan"> {}

export interface DetailJurusan extends Jurusan {}

export interface UpdateJurusan
  extends Omit<
    Jurusan,
    "id" | "created_at" | "updated_at" | "peminat_jurusan"
  > {}
