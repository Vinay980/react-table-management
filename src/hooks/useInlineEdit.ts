import { useState } from "react";
import type { RecordItem } from "../types/record";

export function useInlineEdit() {
  const [editingId, setEditingId] = useState<number | null>(null);

  const [editData, setEditData] = useState<
    Partial<RecordItem>
  >({});

  const startEditing = (record: RecordItem) => {
    setEditingId(record.id);

    setEditData({
      track_artist: record.track_artist,
      track_popularity: record.track_popularity,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  return {
    editingId,
    editData,
    setEditData,
    startEditing,
    cancelEditing,
  };
}