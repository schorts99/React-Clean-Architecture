export type UseCaseSchema = {
  id: string;
  name: string;
  description: string;
  type: "QUERY" | "QUERY_SERVICE";
  dependencies: Array<{
    name: string;
  }>;
};
