import { createColumnHelper } from "@tanstack/react-table";
import type { RecordItem } from "../../types/record";

const columnHelper = createColumnHelper<RecordItem>();

export const columns = [
  columnHelper.accessor("track_name", {
    header: "Track",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("track_artist", {
    header: "Artist",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("playlist_genre", {
    header: "Genre",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("track_popularity", {
    header: "Popularity",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("tempo", {
    header: "Tempo",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("duration_ms", {
    header: "Duration",
    cell: (info) => {
      const ms = Number(info.getValue());
      const minutes = Math.floor(ms / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);

      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
  }),
];