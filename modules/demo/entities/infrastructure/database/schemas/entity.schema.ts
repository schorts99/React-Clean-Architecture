export type EntitySchema = {
  id: string;
  name: string;
  description: string;
  type: "ENTITY";
  fields: Array<{
    name: string;
    type: string;
  }>;
};
