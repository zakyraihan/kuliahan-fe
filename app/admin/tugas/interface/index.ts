import { BaseResponsePagination } from "@/lib/axiosClient";

export interface Tugas {
  id?: number | undefined;
  title: string;
  gambar: string;
  jumlah?: number;
  status?: string;
  description: string;
  created_at: string;
  jurusan: {
    id: number;
    nama_jurusan: string;
  };
  updated_by_mahasiswa?: {
    id: number;
    nama: string;
  };
}

export interface TugasCreatePayload extends Omit<Tugas, "jurusan"> {
  jurusan_id: number | null;
  file?: File;
}

export interface ListTugasResponse extends BaseResponsePagination {
  data: Tugas[];
}

export interface TugasFilterList extends Partial<Tugas> {
  title: string;
  page: number;
  pageSize: number;
}

export interface TugasDetail extends Tugas {}

export interface TugasUpdatePayload extends Pick<Tugas, "title" | "description"> {}

export interface TugasUpdateByMahasiswaPayload
  extends Pick<Tugas, "status" | "id" | "gambar"> {
  file?: File;
}
