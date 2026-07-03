import { useState } from "react";

export type SearchField =
  | "track_name"
  | "track_artist"
  | "playlist_genre";

export function useSearch() {
  const [search, setSearch] = useState("");
  const [field, setField] =
    useState<SearchField>("track_name");

  return {
    search,
    setSearch,
    field,
    setField,
  };
}