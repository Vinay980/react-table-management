import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import type { RecordItem } from "../../types/record";

interface Props {
  data: RecordItem[];
  sortBy: string;
  order: "asc" | "desc";
  onSort: (column: string) => void;
}

export default function DataTable({ data, sortBy, order, onSort }: Props) {
  //  console.log({
  //   data,
  //   sortBy,
  //   order,
  //   onSort,
  //   type: typeof onSort,
  // });
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
                    console.log("Column ID:", header.column.id);
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
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 px-4 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
