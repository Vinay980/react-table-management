import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { RecordItem } from "../../types/record";
import DataTable from "./DataTable";

vi.mock("./TableBody", () => ({
  default: () => <tbody data-testid="table-body" />,
}));

vi.mock("../../hooks/useInlineEdit", () => ({
  useInlineEdit: () => ({
    editingId: null,
    editData: {},
    setEditData: vi.fn(),
    startEditing: vi.fn(),
    cancelEditing: vi.fn(),
  }),
}));

vi.mock("../../hooks/useUpdateRecord", () => ({
  useUpdateRecord: () => ({
    mutateAsync: vi.fn(),
  }),
}));

describe("DataTable", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const data: RecordItem[] = [
    {
      id: 1,
      track_id: "track-1",
      track_name: "Song A",
      track_artist: "Artist A",
      track_popularity: "90",
      track_album_id: "album-1",
      track_album_name: "Album A",
      track_album_release_date: "2024-01-01",
      playlist_name: "Playlist A",
      playlist_id: "playlist-1",
      playlist_genre: "pop",
      playlist_subgenre: "dance pop",
      danceability: "0.80",
      energy: "0.90",
      key: "5",
      loudness: "-5",
      mode: "1",
      speechiness: "0.05",
      acousticness: "0.10",
      instrumentalness: "0",
      liveness: "0.20",
      valence: "0.75",
      tempo: "120",
      duration_ms: "180000",
    },
  ];

  it("renders export button", () => {
    render(
      <DataTable
        data={data}
        sortBy=""
        order="asc"
        onSort={vi.fn()}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /export selected/i,
      })
    ).toBeInTheDocument();
  });

  it("export button is disabled initially", () => {
    render(
      <DataTable
        data={data}
        sortBy=""
        order="asc"
        onSort={vi.fn()}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /export selected/i,
      })
    ).toBeDisabled();
  });

  it("shows selected count", () => {
    render(
      <DataTable
        data={data}
        sortBy=""
        order="asc"
        onSort={vi.fn()}
      />
    );

    expect(
      screen.getByText(/selected:/i)
    ).toBeInTheDocument();
  });

  it("renders column visibility panel", () => {
    render(
      <DataTable
        data={data}
        sortBy=""
        order="asc"
        onSort={vi.fn()}
      />
    );

    expect(
      screen.getByLabelText(/track_name/i)
    ).toBeInTheDocument();
  });

  it("calls onSort when Track header is clicked", async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();

    render(
      <DataTable
        data={data}
        sortBy=""
        order="asc"
        onSort={onSort}
      />
    );

    await user.click(screen.getByText("Track"));

    expect(onSort).toHaveBeenCalled();
  });
});