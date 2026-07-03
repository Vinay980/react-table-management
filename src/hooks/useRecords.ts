import { useQuery } from "@tanstack/react-query";
import { getRecords } from "../api/records.api";

export function useRecords(
  page: number,
  pageSize: number,
  sortBy: string,
  order: "asc" | "desc",
  search: string,
  genre: string
) {
  return useQuery({
    queryKey: [
      "records",
      page,
      pageSize,
      sortBy,
      order,
      search,
      genre,
    ],

    queryFn: () =>
      getRecords(
        page,
        pageSize,
        sortBy,
        order,
        search,
        genre
      ),

    placeholderData: (prev) => prev,
  });
}