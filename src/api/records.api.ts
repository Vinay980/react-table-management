import { api } from "./axios";
import { ENDPOINTS } from "./endpoints";
import type { RecordItem } from "../types/record";

export interface RecordsResponse {
  records: RecordItem[];
  total: number;
}

export async function getRecords(
  page: number,
  limit: number,
  sortBy: string,
  order: "asc" | "desc"
): Promise<RecordsResponse> {
  const response = await api.get<RecordItem[]>(ENDPOINTS.RECORDS, {
    params: {
      _page: page,
      _limit: limit,
      _sort: sortBy,
      _order: order,
    },
  });

  return {
    records: response.data,
    total: Number(response.headers["x-total-count"]),
  };
}