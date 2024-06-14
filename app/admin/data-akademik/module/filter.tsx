import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { MahasiswaFilterList } from "../interface/mahasiswa_interface";

type FilterProps = {
  params: MahasiswaFilterList;
  setParams: Dispatch<SetStateAction<any>>;
};

const Filter: React.FC<FilterProps> = ({ params, setParams }) => {
  const handleChange = (e: ChangeEvent<any>) => {
    setParams((params: MahasiswaFilterList) => {
      return {
        ...params,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <section className="space-y-2">
      <section>
        <Label title="nama mahasiswa" htmlFor="nama_mahasiswa" />
        <InputText
          onChange={handleChange}
          value={params.nama_mahasiswa}
          name="nama_mahasiswa"
          id="nama_mahasiswa"
        />
      </section>
      <section>
        <Label title="nim" htmlFor="nim" />
        <InputText
          onChange={handleChange}
          value={params.nim}
          name="nim"
          id="nim"
        />
      </section>
    </section>
  );
};

export default Filter;
