import { BaseResponsePagination } from "@/lib/axiosClient";

export interface Ruangan {
  id?: number;
  nama_ruangan: string;
  kapasitas_ruangan: string;
  gambar_ruangan: string;
  created_at: string;
  updated_at: string;
}

export interface ListRuanganResponse extends BaseResponsePagination {
  data: Ruangan[];
}

export interface CreateRuanganDto
  extends Omit<Ruangan, "created_at" | "updated_at" | "id"> {
  file?: File;
}
