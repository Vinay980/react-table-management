import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateRecord } from "../api/updateRecord.api";

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
      // Stop outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ["records"],
      });

      // Save previous data
      const previousRecords =
        queryClient.getQueriesData({
          queryKey: ["records"],
        });

      // Update cache immediately
      queryClient.setQueriesData(
        {
          queryKey: ["records"],
        },
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            records: old.records.map((record: any) =>
              record.id === id
                ? { ...record, ...data }
                : record
            ),
          };
        }
      );

      return { previousRecords };
    },

    // Roll back if PATCH fails
    onError: (_err, _variables, context) => {
      context?.previousRecords.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },

    // Background sync
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["records"],
      });
    },
  });
}