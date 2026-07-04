import { useCallback, useEffect, useRef, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
  type VisibilityState,
} from "@tanstack/react-table";
import ColumnVisibility from "./ColumnVisibility";
import { columns } from "./columns";
import TableBody from "./TableBody";
import { exportSelectedToCSV } from "../../utils/exportSelectedToCSV";
import type { RecordItem } from "../../types/record";
import { useInlineEdit } from "../../hooks/useInlineEdit";
import { useUpdateRecord } from "../../hooks/useUpdateRecord";

interface Props {
  data: RecordItem[];
  sortBy: string;
  order: "asc" | "desc";
  onSort: (column: string) => void;
}

export default function DataTable({ data, sortBy, order, onSort }: Props) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { editingId, editData, setEditData, startEditing, cancelEditing } =
    useInlineEdit();

  const updateMutation = useUpdateRecord();

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () => {
      const saved = localStorage.getItem("columnVisibility");

      if (saved) {
        return JSON.parse(saved);
      }

      return {};
    },
  );
  useEffect(() => {
    localStorage.setItem("columnVisibility", JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const handleSave = useCallback(async () => {
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
  }, [editingId, editData, updateMutation, cancelEditing]);

  const table = useReactTable({
    data,
    columns,

    state: {
      rowSelection,
      columnVisibility,
    },

    enableRowSelection: true,

    
    columnResizeMode: "onChange",

    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),
  });

  const selectedRecords = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  return (
    <>
      <ColumnVisibility table={table} />
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Selected: {selectedRecords.length}
        </span>

        <button
          onClick={() => exportSelectedToCSV(selectedRecords)}
          disabled={selectedRecords.length === 0}
          className="rounded bg-green-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Export Selected
        </button>
      </div>
      <div
        ref={tableContainerRef}
        className="h-[600px] overflow-auto rounded-lg border border-gray-300 bg-white shadow"
      >
        <table
          className="min-w-full"
          style={{
            display: "grid",
          }}
        >
          <thead
            className="sticky top-0 z-10 bg-gray-100"
            style={{ display: "grid" }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                {/* Select All */}
                <th
                  className="border border-gray-300 px-4 py-3"
                  style={{ width: 50 }}
                >
                  <input
                    type="checkbox"
                    checked={table.getIsAllRowsSelected()}
                    ref={(el) => {
                      if (el) {
                        el.indeterminate = table.getIsSomeRowsSelected();
                      }
                    }}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                  />
                </th>

                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      position: "relative",
                    }}
                    className="border border-gray-300 px-4 py-3 text-left font-semibold"
                  >
                    <div
                      onClick={() => onSort(header.column.id)}
                      className="cursor-pointer"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}

                      {sortBy === header.column.id &&
                        (order === "asc" ? " ▲" : " ▼")}
                    </div>

                    {/* Resize Handle */}
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-blue-500"
                    />
                  </th>
                ))}

                <th
                  className="border border-gray-300 px-4 py-3"
                  style={{ width: 140 }}
                >
                  Actions
                </th>
              </tr>
            ))}
          </thead>

          <TableBody
            table={table}
            tableContainerRef={tableContainerRef}
            editingId={editingId}
            editData={editData}
            setEditData={setEditData}
            startEditing={startEditing}
            cancelEditing={cancelEditing}
            handleSave={handleSave}
          />
        </table>
      </div>
    </>
  );
}
