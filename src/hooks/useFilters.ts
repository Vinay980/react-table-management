import { useState } from "react";

export function useFilters() {
  const [genre, setGenre] = useState("");

  return {
    genre,
    setGenre,
  };
}