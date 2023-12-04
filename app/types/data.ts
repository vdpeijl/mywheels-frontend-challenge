export type Resource<T> = {
  availability: number | null;
  distance: number | null;
  resource: T;
};

export type DTO<T> = {
  jsonrpc: string;
  id: number;
  result: {
    current: number;
    limit: number;
    offset: number;
    results: Resource<T>[];
    total: number;
  };
};
