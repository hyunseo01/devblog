export type WorkQueryState = {
  search: string;
  sortBy: string;
  tagIds: number[];
  page: number;
  pageSize: number;
};

export type BoardQueryState = {
  search: string;
  sort: string;
  category: string;
  page: number;
  pageSize: number;
};

export function parseWorkQueryState(query: string): WorkQueryState {
  const qs = new URLSearchParams(query);
  const tagIdsParam = qs.getAll("tagIds");
  const tagIds = tagIdsParam.length
    ? tagIdsParam.map((id) => Number(id)).filter((id) => !isNaN(id))
    : [];

  return {
    search: qs.get("search") || "",
    sortBy: qs.get("sortBy") || "recommended",
    tagIds,
    page: parseInt(qs.get("page") || "1", 10),
    pageSize: parseInt(qs.get("pageSize") || "5", 10),
  };
}

export function parseBoardQueryState(query: string): BoardQueryState {
  const qs = new URLSearchParams(query);
  return {
    search: qs.get("search") || "",
    sort: qs.get("sort") || "latest",
    category: qs.get("category") || "",
    page: parseInt(qs.get("page") || "1", 10),
    pageSize: parseInt(qs.get("pageSize") || "5", 10),
  };
}

export function buildWorkQueryString(state: WorkQueryState): string {
  const qs = new URLSearchParams();
  if (state.search) qs.set("search", state.search);
  if (state.sortBy) qs.set("sortBy", state.sortBy);
  state.tagIds.forEach((id) => qs.append("tagIds", id.toString()));
  qs.set("page", state.page.toString());
  qs.set("pageSize", state.pageSize.toString());
  return qs.toString();
}

export function buildBoardQueryString(state: BoardQueryState): string {
  const qs = new URLSearchParams();
  if (state.search) qs.set("search", state.search);
  if (state.sort) qs.set("sort", state.sort);
  if (state.category) qs.set("category", state.category);
  qs.set("page", state.page.toString());
  qs.set("pageSize", state.pageSize.toString());
  return qs.toString();
}
