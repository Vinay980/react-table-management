import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateRecord } from "../api/updateRecord.api";
import type { RecordItem } from "../types/record";
import type { RecordsResponse } from "../api/records.api";

export function useUpdateRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Record<string, unknown>;
    }) => updateRecord(id, data),

    // Optimistic Update
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: ["records"],
      });

      const previousRecords = queryClient.getQueriesData<RecordsResponse>({
        queryKey: ["records"],
      });

      queryClient.setQueriesData<RecordsResponse>(
        {
          queryKey: ["records"],
        },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            records: old.records.map((record: RecordItem) =>
              record.id === id
                ? {
                    ...record,
                    ...data,
                  }
                : record
            ),
          };
        }
      );

      return {
        previousRecords,
      };
    },

    onError: (_err, _variables, context) => {
      context?.previousRecords.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["records"],
      });
    },
  });
}