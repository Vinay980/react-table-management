import { useCallback } from "react";

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

  const startRecord =
    totalRecords === 0 ? 0 : (page - 1) * pageSize + 1;

  const endRecord = Math.min(page * pageSize, totalRecords);

  const handleExportCurrentView = useCallback(async () => {
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
  }, [
    sortBy,
    order,
    debouncedSearch,
    genre,
    minPopularity,
    maxPopularity,
  ]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-8 text-center shadow-sm">
          <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-800"></div>
          <p className="text-lg font-medium text-slate-700">Loading Spotify songs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-8 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-800">Failed to load records</h2>
          <p className="mt-2 text-sm text-slate-500">Please check your connection and try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 cursor-pointer rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-4 sm:px-4 lg:px-6 lg:py-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-5 lg:p-6">
        <header className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Music catalogue
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
                Spotify Songs
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                A refined, responsive view for browsing songs with calm elegance and clarity.
              </p>
            </div>
            <div className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
              {totalRecords.toLocaleString()} records
            </div>
          </div>
        </header>

        <section className="rounded-[20px] border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
            <div className="min-w-0 flex-1 lg:min-w-70">
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

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                Showing {startRecord}–{endRecord} of {totalRecords.toLocaleString()} records
              </span>
              {debouncedSearch && (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700">
                  Search: “{debouncedSearch}”
                </span>
              )}
              {isFetching && (
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-amber-700">
                  Updating...
                </span>
              )}
            </div>

            <button
              onClick={handleExportCurrentView}
              className="cursor-pointer rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Export Current View
            </button>
          </div>
        </section>

        {data?.records.length === 0 ? (
          <div className="rounded-[20px] border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
            <h2 className="text-xl font-semibold text-slate-800">No records found</h2>
            <p className="mt-2 text-sm text-slate-500">Try changing your search or filters.</p>
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
    </div>
  );
}