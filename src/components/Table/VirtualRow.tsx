import { flexRender, type Row } from "@tanstack/react-table";
import type {
  VirtualItem,
  Virtualizer,
} from "@tanstack/react-virtual";

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
      ref={rowVirtualizer.measureElement}
      style={{
        display: "flex",
        position: "absolute",
        width: "100%",
        transform: `translateY(${virtualRow.start}px)`,
      }}
      className="hover:bg-gray-50"
    >
      {/* Row Checkbox */}
      <td className="w-14 border border-gray-300 px-4 py-3 flex items-center justify-center">
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
              className="flex-1 border border-gray-300 px-4 py-3"
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
        if (
          columnId === "track_popularity" &&
          editingId === record.id
        ) {
          return (
            <td
              key={cell.id}
              className="flex-1 border border-gray-300 px-4 py-3"
            >
              <input
                type="number"
                value={editData.track_popularity ?? ""}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    track_popularity: Number(e.target.value),
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
            className="flex-1 border border-gray-300 px-4 py-3"
          >
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )}
          </td>
        );
      })}

      <td className="w-36 border border-gray-300 px-4 py-3">
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
}