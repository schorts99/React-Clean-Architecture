export type UseCasePrimitives = {
  id: string;
  name: string;
  description: string;
  type: "QUERY";
  dependencies: Array<{
    name: string;
  }>;
};
