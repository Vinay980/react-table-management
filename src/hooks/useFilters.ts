import { useState } from "react";

export function useFilters() {
  const [genre, setGenre] = useState("");

  const [minPopularity, setMinPopularity] = useState("");

  const [maxPopularity, setMaxPopularity] = useState("");

  return {
    genre,
    setGenre,

    minPopularity,
    setMinPopularity,

    maxPopularity,
    setMaxPopularity,
  };
}