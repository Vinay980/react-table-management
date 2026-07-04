import { flexRender, type Row } from "@tanstack/react-table";
import type { VirtualItem, Virtualizer } from "@tanstack/react-virtual";

import type { RecordItem } from "../../types/record";

interface Props {
  row: Row<RecordItem>;
  virtualRow: VirtualItem;
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;

  editingId: number | null;
  editData: Partial<RecordItem>;
  setEditData: React.Dispatch<React.SetStateAction<Partial<RecordItem>>>;

  startEditing: (record: RecordItem) => void;
  cancelEditing: () => void;
  handleSave: () => void;
}

export default function VirtualRow({
  row,
  virtualRow,
  rowVirtualizer,
  editingId,
  editData,
  setEditData,
  startEditing,
  cancelEditing,
  handleSave,
}: Props) {
  const record = row.original;

  return (
    <tr
      data-index={virtualRow.index}
      ref={(node) => {
        if (node) {
          rowVirtualizer.measureElement(node);
        }
      }}
      style={{
        display: "flex",
        position: "absolute",
        width: "100%",
        transform: `translateY(${virtualRow.start}px)`,
      }}
      className="hover:bg-gray-50"
    >
      {/* Checkbox */}
      <td
        style={{ width: 50 }}
        className="flex items-center justify-center border-b border-r border-slate-200 bg-white"
      >
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      </td>

      {row.getVisibleCells().map((cell) => {
        const columnId = cell.column.id;

        // Editable Artist
        if (columnId === "track_artist" && editingId === record.id) {
          return (
            <td
              key={cell.id}
              style={{ width: cell.column.getSize() }}
              className="border-b border-r border-slate-200 bg-white px-4 py-3"
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

        // Editable Popularity
        if (columnId === "track_popularity" && editingId === record.id) {
          return (
            <td
              key={cell.id}
              style={{ width: cell.column.getSize() }}
              className="border-b border-r border-slate-200 bg-white px-4 py-3"
            >
              <input
                type="number"
                value={editData.track_popularity ?? ""}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    track_popularity: String(e.target.value),
                  }))
                }
                className="w-full rounded border px-2 py-1"
              />
            </td>
          );
        }

        return (
          <td
            key={cell.id}
            style={{ width: cell.column.getSize() }}
            className="border-b border-r border-slate-200 bg-white px-4 py-3"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}

      {/* Actions */}
      <td style={{ width: 140 }} className="border-b border-slate-200 bg-white px-4 py-3">
        {editingId === record.id ? (
          <>
            <button
              onClick={handleSave}
              className="mr-2 cursor-pointer rounded-full bg-slate-900 px-3 py-1.5 text-sm text-white"
            >
              Save
            </button>

            <button
              onClick={cancelEditing}
              className="cursor-pointer rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => startEditing(record)}
            className="cursor-pointer rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700"
          >
            Edit
          </button>
        )}
      </td>
    </tr>
  );
}
