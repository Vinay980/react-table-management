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
  order: "asc" | "desc",
  search: string,
  genre: string,
  minPopularity: string,
  maxPopularity: string,
): Promise<RecordsResponse> {
  const response = await api.get<RecordItem[]>(ENDPOINTS.RECORDS, {
    params: {
      _page: page,
      _limit: limit,
      _sort: sortBy,
      _order: order,

      ...(search ? { q: search } : {}),

      ...(genre ? { playlist_genre: genre } : {}),

      ...(minPopularity
        ? { track_popularity_gte: minPopularity }
        : {}),

      ...(maxPopularity
        ? { track_popularity_lte: maxPopularity }
        : {}),
    },
  });

  return {
    records: response.data,
    total: Number(response.headers["x-total-count"]),
  };
}

export async function exportCurrentView(
  sortBy: string,
  order: "asc" | "desc",
  search: string,
  genre: string,
  minPopularity: string,
  maxPopularity: string,
): Promise<RecordItem[]> {
  const response = await api.get<RecordItem[]>(ENDPOINTS.RECORDS, {
    params: {
      _sort: sortBy,
      _order: order,

      ...(search ? { q: search } : {}),

      ...(genre ? { playlist_genre: genre } : {}),

      ...(minPopularity
        ? { track_popularity_gte: minPopularity }
        : {}),

      ...(maxPopularity
        ? { track_popularity_lte: maxPopularity }
        : {}),
    },
  });

  return response.data;
}