import { api } from "./axios";
import { ENDPOINTS } from "./endpoints";
import type { RecordItem } from "../types/record";

export async function updateRecord(
  id: number,
  data: Partial<RecordItem>
) {
  const response = await api.patch(
    `${ENDPOINTS.RECORDS}/${id}`,
    data
  );

  return response.data;
}