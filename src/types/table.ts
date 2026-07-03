export type SortOrder = "asc" | "desc";

export interface SortingState {
  sortBy: string;
  order: SortOrder;
}