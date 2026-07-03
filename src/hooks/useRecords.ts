import { useQuery } from "@tanstack/react-query";
import { getRecords } from "../api/records.api";

export function useRecords(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["records", page, pageSize],
    queryFn: () => getRecords(page, pageSize),
    placeholderData: (previousData) => previousData,
  });
}