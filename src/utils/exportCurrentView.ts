import type { RecordItem } from "../types/record";

export function exportCurrentViewToCSV(records: RecordItem[]) {
  if (!records.length) {
    alert("No records to export.");
    return;
  }

  const headers = Object.keys(records[0]);

  const csv = [
    headers.join(","),
    ...records.map((record) =>
      headers
        .map((header) => {
          const value = record[header as keyof RecordItem];

          return `"${String(value ?? "").replace(/"/g, '""')}"`;
        })
        .join(","),
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "spotify-current-view.csv";

  link.click();

  URL.revokeObjectURL(url);
}