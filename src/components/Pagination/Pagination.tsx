import { PAGE_SIZES } from "../../types/pagination";

interface PaginationProps {
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function Pagination({
  page,
  total,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="mt-6 flex items-center justify-between">
      <div>
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="mr-2 rounded border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span>
          Page {page} of {totalPages}
        </span>

        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded border p-2"
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}