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

export default function Home() {
  const { page, pageSize, setPage, setPageSize } = usePagination();

  const { sortBy, order, toggleSort } = useSorting();

  const { search, setSearch } = useSearch();

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
    search,
    genre,
    minPopularity,
    maxPopularity,
  );

  console.log({
  isLoading,
  isFetching,
  data,
});

  if (isLoading) {
    return <h1 className="p-10">Loading...</h1>;
  }

  if (error) {
    return <h1 className="p-10">Something went wrong.</h1>;
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Spotify Songs</h1>

      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[250px]">
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

      {isFetching && <p className="mb-4 text-sm text-blue-600">Updating...</p>}

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
