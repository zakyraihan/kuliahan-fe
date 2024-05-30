import { ChangeEvent, useState } from "react";

interface PaginationParams {
  page: number;
  pageSize: number;
}

export const usePagination = <T extends PaginationParams>(
  defaultParams: T,
  defaultKey: T
) => {
  let [params, setParams] = useState<T>(defaultParams);
  let [keyword, setKeyword] = useState<T>(defaultKey);
  let [filterParams, setFilterParams] = useState<T>(defaultParams);
  let [filterKey, setfilterKey] = useState<T>(defaultKey);

  const handleFilter = () => {
    setFilterParams({ ...params });
  };

  const handleKeyFilter = () => {
    setfilterKey({ ...keyword });
  };

  const handleClear = () => {
    setFilterParams(defaultParams);
    setParams(defaultParams);
  };

  const handlePageSize = (e: ChangeEvent<any>) => {
    setParams((params) => ({ ...params, pageSize: e.target.value }));
    setFilterParams((params) => ({ ...params, pageSize: e.target.value }));
  };

  const handlePage = (page: number) => {
    setParams((params) => ({ ...params, page: page }));
    setFilterParams((params) => ({ ...params, page: page }));
  };

  return {
    params,
    setParams,
    handleFilter,
    handleKeyFilter,
    handleClear,
    filterKey,
    handlePageSize,
    handlePage,
    filterParams,
  };
};
