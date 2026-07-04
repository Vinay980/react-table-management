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

import { exportCurrentView } from "../api/records.api";

import { exportCurrentViewToCSV } from "../utils/exportCurrentView";

export default function Home() {
  const { page, pageSize, setPage, setPageSize } = usePagination();

  const { sortBy, order, toggleSort } = useSorting();

  const { search, setSearch } = useSearch();
  const debouncedSearch = useDebounce(search, 300);

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

  const handleExportCurrentView = async () => {
    try {
      const records = await exportCurrentView(
        sortBy,
        order,
        debouncedSearch,
        genre,
        minPopularity,
        maxPopularity,
      );

      exportCurrentViewToCSV(records);
    } catch (error) {
      console.error(error);
      alert("Failed to export current view.");
    }
  };

  // Loading
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

          <p className="text-lg font-medium text-gray-600">
            Loading Spotify songs...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold text-red-600">
          Failed to load records
        </h2>

        <p className="text-gray-500">
          Please check your internet connection or try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Spotify Songs</h1>

      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div className="min-w-[250px] flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <GenreFilter value={genre} onChange={setGenre} />

        <PopularityFilter
          min={minPopularity}
          max={maxPopularity}
          onMinChange={setMinPopularity}
          onMaxChange={setMaxPopularity}
        />
      </div>

      <div className="mb-4 flex justify-end">
        <button
          onClick={handleExportCurrentView}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Export Current View
        </button>
      </div>

      {debouncedSearch && (
        <p className="mb-3 text-sm text-blue-600">
          Searching for <strong>"{debouncedSearch}"</strong>
        </p>
      )}

      {isFetching && <p className="mb-4 text-sm text-blue-600">Updating...</p>}

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <strong>{startRecord}</strong>–<strong>{endRecord}</strong> of{" "}
          <strong>{totalRecords.toLocaleString()}</strong> records
        </p>
      </div>

      {data?.records.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 py-20 text-center">
          <h2 className="text-2xl font-semibold">No records found</h2>

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
        total={totalRecords}
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
