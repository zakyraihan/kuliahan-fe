import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { TugasFilterList } from "../interface";

type FilterProps = {
  params: TugasFilterList;
  setParams: Dispatch<SetStateAction<TugasFilterList>>;
};

const Filter: React.FC<FilterProps> = ({ params, setParams }) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setParams((prevParams: TugasFilterList) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <section className="space-y-2">
      <section>
        <Label title="tentang" htmlFor="tentang" />
        <InputText
          onChange={handleChange}
          value={params.title}
          name="title"
          id="title"
        />
      </section>
    </section>
  );
};

export default Filter;
