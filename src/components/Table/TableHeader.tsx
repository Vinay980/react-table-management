import { flexRender, type HeaderGroup } from "@tanstack/react-table";
import type { RecordItem } from "../../types/record";

interface Props {
  headerGroups: HeaderGroup<RecordItem>[];
  sortBy: string;
  order: "asc" | "desc";
  onSort: (column: string) => void;
}

export default function TableHeader({
  headerGroups,
  sortBy,
  order,
  onSort,
}: Props) {
  return (
    <thead
      style={{
        display: "grid",
        position: "sticky",
        top: 0,
        zIndex: 1,
        background: "white",
      }}
    >
      {headerGroups.map((headerGroup) => (
        <tr
          key={headerGroup.id}
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              onClick={() => onSort(header.column.id)}
              style={{
                display: "flex",
                flex: 1,
              }}
              className="cursor-pointer border border-gray-300 px-4 py-3 text-left font-semibold hover:bg-gray-200"
            >
              <div className="flex items-center gap-2">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}

                {sortBy === header.column.id &&
                  (order === "asc" ? "▲" : "▼")}
              </div>
            </th>
          ))}

          <th
            style={{
              display: "flex",
              width: 140,
            }}
            className="border border-gray-300 px-4 py-3 font-semibold"
          >
            Actions
          </th>
        </tr>
      ))}
    </thead>
  );
}