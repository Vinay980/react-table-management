import { useQuery } from "@tanstack/react-query";
import { getRecords } from "../api/records.api";

export function useRecords(
  page: number,
  pageSize: number,
  sortBy: string,
  order: "asc" | "desc",
  search: string,
  field: string
) {
  return useQuery({
    queryKey: [
      "records",
      page,
      pageSize,
      sortBy,
      order,
      search,
      field,
    ],

    queryFn: () =>
      getRecords(
        page,
        pageSize,
        sortBy,
        order,
        search,
        field
      ),

    placeholderData: (previousData) => previousData,
  });
}