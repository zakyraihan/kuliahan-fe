import { BaseResponsePagination } from "@/lib/axiosClient";

interface Diskusi {
  id: number;
  komentar: string;
  user: {
    id: number;
    nama: string;
  };
  created_at: string;
}

export interface DiskusiList extends BaseResponsePagination {
  data: Diskusi[];
}

export interface CreateDiskusiDto
  extends Omit<Diskusi, "user" | "created_at" | "id"> {}

export interface updateDiskusiDto
  extends Omit<Diskusi, "user" | "created_at" | "id"> {}
