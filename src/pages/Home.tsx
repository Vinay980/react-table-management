import DataTable from "../components/Table/DataTable";
import Pagination from "../components/Pagination/Pagination";
import SearchBar from "../components/Search/SearchBar";

import { usePagination } from "../hooks/usePagination";
import { useSorting } from "../hooks/useSorting";
import { useSearch } from "../hooks/useSearch";
import { useRecords } from "../hooks/useRecords";

export default function Home() {
  // Pagination
  const { page, pageSize, setPage, setPageSize } = usePagination();

  // Sorting
  const { sortBy, order, toggleSort } = useSorting();

  // Search
  const {
    search,
    setSearch,
    field,
    setField,
  } = useSearch();

  // Fetch Records
  const { data, isLoading, error } = useRecords(
    page,
    pageSize,
    sortBy,
    order,
    search,
    field
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-xl text-red-500">
          Something went wrong.
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Spotify Songs
      </h1>

      <SearchBar
        value={search}
        field={field}
        onChange={setSearch}
        onFieldChange={setField}
      />

      <DataTable
        data={data?.records ?? []}
        sortBy={sortBy}
        order={order}
        onSort={toggleSort}
      />

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