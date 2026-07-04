import DataTable from "../components/Table/DataTable";
import Pagination from "../components/Pagination/Pagination";
import SearchBar from "../components/Search/SearchBar";
import GenreFilter from "../components/Filters/GenreFilter";
import PopularityFilter from "../components/Filters/PopularityFilter";
import { usePagination } from "../hooks/usePagination";
import { useSorting } from "../hooks/useSorting";
import { useSearch } from "../hooks/useSearch";
import { useFilters } from "../hooks/useFilters";
import { useRecords } from "../hooks/useRecords";
import { useDebounce } from "../hooks/useDebounce";

export default function Home() {
  const { page, pageSize, setPage, setPageSize } = usePagination();

  const { sortBy, order, toggleSort } = useSorting();

  const { search, setSearch } = useSearch();
  const debouncedSearch = useDebounce(search, 300);

  // console.log("Search:", search);
  // console.log("Debounced:", debouncedSearch);

  const {
    genre,
    setGenre,
    minPopularity,
    setMinPopularity,
    maxPopularity,
    setMaxPopularity,
  } = useFilters();

  const { data, isLoading, isFetching, error } = useRecords(
    page,
    pageSize,
    sortBy,
    order,
    debouncedSearch,
    genre,
    minPopularity,
    maxPopularity,
  );

  const totalRecords = data?.total ?? 0;

  const startRecord = totalRecords === 0 ? 0 : (page - 1) * pageSize + 1;

  const endRecord = Math.min(page * pageSize, totalRecords);

  //   console.log({
  //   isLoading,
  //   isFetching,
  //   data,
  // });

  import { flexRender, type Row } from "@tanstack/react-table";
  import type { VirtualItem, Virtualizer } from "@tanstack/react-virtual";

  import type { RecordItem } from "../../types/record";

  interface Props {
    row: Row<RecordItem>;
    virtualRow: VirtualItem;
    rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;

    editingId: number | null;
    editData: Partial<RecordItem>;
    setEditData: React.Dispatch<React.SetStateAction<Partial<RecordItem>>>;

    startEditing: (record: RecordItem) => void;
    cancelEditing: () => void;
    handleSave: () => void;
  }

  export default function VirtualRow({
    row,
    virtualRow,
    rowVirtualizer,
    editingId,
    editData,
    setEditData,
    startEditing,
    cancelEditing,
    handleSave,
  }: Props) {
    const record = row.original;

    return (
      <tr
        data-index={virtualRow.index}
        ref={rowVirtualizer.measureElement}
        style={{
          display: "flex",
          position: "absolute",
          width: "100%",
          transform: `translateY(${virtualRow.start}px)`,
        }}
        className="hover:bg-gray-50"
      >
        {/* Checkbox */}
        <td
          style={{ width: 50 }}
          className="border border-gray-300 flex items-center justify-center"
        >
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </td>

        {row.getVisibleCells().map((cell) => {
          const columnId = cell.column.id;

          // Editable Artist
          if (columnId === "track_artist" && editingId === record.id) {
            return (
              <td
                key={cell.id}
                style={{ width: cell.column.getSize() }}
                className="border border-gray-300 px-4 py-3"
              >
                <input
                  value={editData.track_artist ?? ""}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      track_artist: e.target.value,
                    }))
                  }
                  className="w-full rounded border px-2 py-1"
                />
              </td>
            );
          }

          // Editable Popularity
          if (columnId === "track_popularity" && editingId === record.id) {
            return (
              <td
                key={cell.id}
                style={{ width: cell.column.getSize() }}
                className="border border-gray-300 px-4 py-3"
              >
                <input
                  type="number"
                  value={editData.track_popularity ?? ""}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      track_popularity: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded border px-2 py-1"
                />
              </td>
            );
          }

          return (
            <td
              key={cell.id}
              style={{ width: cell.column.getSize() }}
              className="border border-gray-300 px-4 py-3"
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        })}

        {/* Actions */}
        <td style={{ width: 140 }} className="border border-gray-300 px-4 py-3">
          {editingId === record.id ? (
            <>
              <button
                onClick={handleSave}
                className="mr-2 rounded bg-green-600 px-3 py-1 text-white"
              >
                Save
              </button>

              <button
                onClick={cancelEditing}
                className="rounded bg-gray-500 px-3 py-1 text-white"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => startEditing(record)}
              className="rounded bg-blue-600 px-3 py-1 text-white"
            >
              Edit
            </button>
          )}
        </td>
      </tr>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Spotify Songs</h1>

      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[250px]">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <GenreFilter value={genre} onChange={setGenre} />

        {debouncedSearch && (
          <p className="mb-3 text-sm text-blue-600">
            Searching for "<strong>{debouncedSearch}</strong>"
          </p>
        )}

        <PopularityFilter
          min={minPopularity}
          max={maxPopularity}
          onMinChange={setMinPopularity}
          onMaxChange={setMaxPopularity}
        />
      </div>

      {isFetching && <p className="mb-4 text-sm text-blue-600">Updating...</p>}

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <strong>{startRecord}</strong>–<strong>{endRecord}</strong> of{" "}
          <strong>{totalRecords.toLocaleString()}</strong> records
        </p>
      </div>

      {data?.records.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 py-16 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No records found
          </h2>

          <p className="mt-2 text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <DataTable
          data={data?.records ?? []}
          sortBy={sortBy}
          order={order}
          onSort={toggleSort}
        />
      )}

      <Pagination
        page={page}
        total={data?.total ?? 0}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPage(1);
          setPageSize(size);
        }}
      />
    </div>
  );
}
