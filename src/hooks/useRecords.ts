import { useQuery } from "@tanstack/react-query";
import { getRecords } from "../api/records.api";

export function useRecords(
  page: number,
  pageSize: number,
  sortBy: string,
  order: "asc" | "desc"
) {
  return useQuery({
    queryKey: ["records", page, pageSize, sortBy, order],
    queryFn: () => getRecords(page, pageSize, sortBy, order),
    placeholderData: (previousData) => previousData,
  });
}