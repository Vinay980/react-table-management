import DataTable from "../components/Table/DataTable";
import Pagination from "../components/Pagination/Pagination";
import { usePagination } from "../hooks/usePagination";
import { useRecords } from "../hooks/useRecords";
import { useSorting } from "../hooks/useSorting";

export default function Home() {
  const { page, pageSize, setPage, setPageSize } = usePagination();
  const { sortBy, order, toggleSort } = useSorting();

  const { data, isLoading, error } = useRecords(page, pageSize, sortBy, order);

  // console.log("Loading:", isLoading);
  // console.log("Error:", error);
  // console.log("Data:", data);

  if (isLoading) {
    return <h1 className="p-10">Loading...</h1>;
  }

  if (error) {
    return <h1 className="p-10">Something went wrong.</h1>;
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Spotify Songs</h1>

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
