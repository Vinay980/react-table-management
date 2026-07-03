import { useState } from "react";

export function usePagination() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
  };
}