import { useQuery } from "@tanstack/react-query";
import { getRecords } from "../api/records.api";

export function useRecords(
  page: number,
  pageSize: number,
  sortBy: string,
  order: "asc" | "desc",
  search: string,
  genre: string,
  minPopularity: number,
  maxPopularity: number,
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
      minPopularity,
      maxPopularity,
    ],

    queryFn: () =>
      getRecords(
        page,
        pageSize,
        sortBy,
        order,
        search,
        genre,
        minPopularity,
        maxPopularity,
      ),

    placeholderData: (previousData) => previousData,
  });
}
