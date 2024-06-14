import { BaseResponsePagination } from "@/lib/axiosClient";

export interface Mahasiswa {
  id?: number;
  foto_mahasiswa: string;
  nama_mahasiswa: string;
  umur: number;
  asal: string;
  tanggal_lahir: string;
  alamat: string;
  nama_ortu: string;
  nim: number;
  jurusan: {
    id: number;
    nama_jurusan: string;
  };
  ruangan: {
    id: number;
    nama_ruangan: string;
  };
}

export interface MahasiswaUpdatePayload
  extends Omit<Mahasiswa, "id" | "jurusan" | "ruangan"> {
  jurusan_id: number;
  ruangan_id: number;
}

export interface MahasiswaCreatepayload
  extends Omit<Mahasiswa, "id" | "jurusan" | "ruangan"> {
  jurusan_id: number;
  ruangan_id: number;
}

export interface MahasiswaCreateArrayPayload {
  data: MahasiswaCreatepayload[];
  file?: File;
}

export interface MahasiswaListResponse extends BaseResponsePagination {
  data: Mahasiswa[];
}

export interface MahasiswaFilterList extends Partial<Mahasiswa> {
  nama_mahasiswa: string;
  nim: number;
  page: number;
  pageSize: number;
}

export interface DetailMahasiswa extends Mahasiswa {}
