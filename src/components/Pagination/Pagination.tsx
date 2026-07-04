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
    <div className="mt-4 flex flex-col gap-3 rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <span className="rounded-full border border-slate-200 bg-white px-3 py-2">
          Page {page} of {totalPages}
        </span>

        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="cursor-pointer rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
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