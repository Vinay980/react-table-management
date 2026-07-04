import { useState } from "react";

export function useFilters() {
  const [genre, setGenre] = useState("");

  const [minPopularity, setMinPopularity] = useState(0);

  const [maxPopularity, setMaxPopularity] = useState(0);

  return {
    genre,
    setGenre,

    minPopularity,
    setMinPopularity,

    maxPopularity,
    setMaxPopularity,
  };
}