export type SearchProps = {
  searchParams: Promise<{
    query?: string;
    view?: "grid" | "list";
  }>;
};

export type ProductServerResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  inputs?: Record<string, string>;
};
