import React, { ChangeEvent } from "react";
import clsx from "clsx";

interface PaginationProps {
  handlePageSize: (e: ChangeEvent<HTMLSelectElement>) => void;
  handlePage: (page: number) => void;
  page: number;
  pageSize: number;
  pagination?:
    | {
        page: number;
        pageSize: number;
        total: number;
        // total_page: number | undefined;
      }
    | undefined;
}

const Pagination: React.FC<PaginationProps> = ({
  handlePageSize,
  handlePage,
  pagination,
  page,
  pageSize,
}) => {
  function getPage(totalItems: number, currentPage: number, pageSize: number) {
    currentPage = currentPage;
    pageSize = pageSize;
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = Array.from(
      { length: endPage + 1 - startPage },
      (_, i) => startPage + i
    );
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }

  let pages = getPage(
    pagination?.total || 0,
    pagination?.page || 1,
    pagination?.pageSize || 10
  );

  return (
    <div className="flex items-center justify-between mt-6">
      <div>
        <select
          value={pageSize}
          onChange={handlePageSize}
          className="px-2 py-1 text-sm text-blue-500 rounded-md border"
        >
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div className="flex gap-x-3">
        {pages.pages.map((pageItem, index) => (
          <button
            key={index}
            onClick={() => {
              handlePage(pageItem);
            }}
            className={clsx(
              "px-4 py-2 rounded-full text-sm",
              {
                "text-blue-500 border bg-blue-100": page === pageItem,
                "text-blue-500 border border-blue-100": page !== pageItem,
              },
              {}
            )}
          >
            {pageItem}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
