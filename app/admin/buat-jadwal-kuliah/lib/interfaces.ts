import { BaseResponsePagination } from "@/lib/axiosClient";

export interface Jadwal {
  id?: number;
  mata_kuliah: string;
  hari: string;
  waktuMulai: string;
  waktuSelesai: string;
  jurusan: {
    id?: number;
    nama_jurusan: string;
  };
  ruang_kuliah: {
    id?: number;
    nama_ruangan: string;
  };
  dosen: {
    id?: number;
    nama: string;
  };
  updated_by?: null;
}

export interface JadwalCreatePayload
  extends Omit<Jadwal, "jurusan" | "ruang_kuliah" | "dosen"> {
  ruangan_id: number | null;
  jurusan_id: number | null;
  created_by: number | null;
}

export interface ListJadwalResponse extends BaseResponsePagination {
  data: Jadwal[];
}
