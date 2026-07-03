import { useState } from "react";

export function useSorting() {
  const [sortBy, setSortBy] = useState("track_name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setOrder("asc");
    }
  };

  return {
    sortBy,
    order,
    toggleSort,
  };
}