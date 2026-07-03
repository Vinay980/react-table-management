import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import type { RecordItem } from "../../types/record";
import { useInlineEdit } from "../../hooks/useInlineEdit";
import { useUpdateRecord } from "../../hooks/useUpdateRecord";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

interface Props {
  data: RecordItem[];
  sortBy: string;
  order: "asc" | "desc";
  onSort: (column: string) => void;
}

export default function DataTable({ data, sortBy, order, onSort }: Props) {
  const { editingId, editData, setEditData, startEditing, cancelEditing } =
    useInlineEdit();

  const updateMutation = useUpdateRecord();

  const handleSave = async () => {
    if (!editData.track_artist?.trim()) {
      alert("Artist name is required.");
      return;
    }

    const popularity = Number(editData.track_popularity);

    if (Number.isNaN(popularity) || popularity < 0 || popularity > 100) {
      alert("Popularity must be between 0 and 100.");
      return;
    }

    if (editingId === null) return;

    try {
      await updateMutation.mutateAsync({
        id: editingId,
        data: {
          track_artist: editData.track_artist,
          track_popularity: editData.track_popularity,
        },
      });

      cancelEditing();
    } catch (error) {
      console.error(error);
      alert("Failed to update record.");
    }
  };

  const parentRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white shadow">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={() => {
                    onSort(header.column.id);
                  }}
                  className="cursor-pointer border border-gray-300 px-4 py-3 text-left font-semibold hover:bg-gray-200"
                >
                  <div className="flex items-center gap-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}

                    {sortBy === header.column.id &&
                      (order === "asc" ? "▲" : "▼")}
                  </div>
                </th>
              ))}
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                Actions
              </th>
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => {
            const record = row.original;

            return (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => {
                  const columnId = cell.column.id;

                  // Artist
                  if (columnId === "track_artist" && editingId === record.id) {
                    return (
                      <td
                        key={cell.id}
                        className="border border-gray-300 px-4 py-3"
                      >
                        <input
                          value={editData.track_artist ?? ""}
                          onChange={(e) =>
                            setEditData((prev) => ({
                              ...prev,
                              track_artist: e.target.value,
                            }))
                          }
                          className="w-full rounded border px-2 py-1"
                        />
                      </td>
                    );
                  }

                  // Popularity
                  if (
                    columnId === "track_popularity" &&
                    editingId === record.id
                  ) {
                    return (
                      <td
                        key={cell.id}
                        className="border border-gray-300 px-4 py-3"
                      >
                        <input
                          type="number"
                          value={editData.track_popularity ?? ""}
                          onChange={(e) =>
                            setEditData((prev) => ({
                              ...prev,
                              track_popularity: e.target.value,
                            }))
                          }
                          className="w-20 rounded border px-2 py-1"
                        />
                      </td>
                    );
                  }

                  return (
                    <td
                      key={cell.id}
                      className="border border-gray-300 px-4 py-3"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}

                <td className="border border-gray-300 px-4 py-3">
                  {editingId === record.id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="mr-2 rounded bg-green-600 px-3 py-1 text-white"
                      >
                        Save
                      </button>

                      <button
                        onClick={cancelEditing}
                        className="rounded bg-gray-500 px-3 py-1 text-white"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEditing(record)}
                      className="rounded bg-blue-600 px-3 py-1 text-white"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
