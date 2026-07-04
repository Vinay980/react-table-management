import { createColumnHelper } from "@tanstack/react-table";
import type { RecordItem } from "../../types/record";

const columnHelper = createColumnHelper<RecordItem>();

export const columns = [
  columnHelper.accessor("track_name", {
    header: "Track",
    size: 250,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("track_artist", {
    header: "Artist",
    size: 220,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("playlist_genre", {
    header: "Genre",
    size: 150,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("track_popularity", {
    header: "Popularity",
    size: 120,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("tempo", {
    header: "Tempo",
    size: 120,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("duration_ms", {
    header: "Duration",
    size: 150,
    cell: (info) => {
      const ms = Number(info.getValue());

      const minutes = Math.floor(ms / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);

      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
  }),
];