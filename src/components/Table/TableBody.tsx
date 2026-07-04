import { useEffect, type RefObject } from "react";
import type { Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import type { RecordItem } from "../../types/record";
import VirtualRow from "./VirtualRow";

interface Props {
  table: Table<RecordItem>;
  tableContainerRef: RefObject<HTMLDivElement>;

  editingId: number | null;
  editData: Partial<RecordItem>;
  setEditData: React.Dispatch<React.SetStateAction<Partial<RecordItem>>>;

  startEditing: (record: RecordItem) => void;
  cancelEditing: () => void;
  handleSave: () => void;
}

export default function TableBody({
  table,
  tableContainerRef,
  editingId,
  editData,
  setEditData,
  startEditing,
  cancelEditing,
  handleSave,
}: Props) {
  const rows = table.getRowModel().rows;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 56,
    overscan: 5,
  });

  useEffect(() => {
    rowVirtualizer.measure();
  }, [rows.length]);

  return (
    <tbody
      style={{
        display: "grid",
        height: `${rowVirtualizer.getTotalSize()}px`,
        position: "relative",
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index];

        return (
          <VirtualRow
            key={row.id}
            row={row}
            virtualRow={virtualRow}
            rowVirtualizer={rowVirtualizer}
            editingId={editingId}
            editData={editData}
            setEditData={setEditData}
            startEditing={startEditing}
            cancelEditing={cancelEditing}
            handleSave={handleSave}
          />
        );
      })}
    </tbody>
  );
}