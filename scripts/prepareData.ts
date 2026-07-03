import fs from "node:fs";
import Papa from "papaparse";

interface SpotifyRecord {
  [key: string]: string;
}

const csvPath = "./spotify_songs.csv";
const outputPath = "./db.json";

try {
  // Read CSV
  const csv = fs.readFileSync(csvPath, "utf8");

  // Parse CSV
  const parsed = Papa.parse<SpotifyRecord>(csv, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors.length) {
    console.error("CSV Parsing Errors:", parsed.errors);
    process.exit(1);
  }

  // Add unique id to every record
  const records = parsed.data.map((row, index) => ({
    id: index + 1,
    ...row,
  }));

  // Write db.json
  fs.writeFileSync(outputPath, JSON.stringify({ records }, null, 2), "utf8");

  console.log(`Successfully converted ${records.length} records.`);
} catch (error) {
  console.error("Failed to convert CSV:", error);
}
