import type { EntityDao } from "../../../application/interfaces";

import { EntityEntity } from "../../../domain/entities";

import type { Seeder } from "../../../../../shared/data";

export class EntitiesSeeder implements Seeder {
  constructor(
    private readonly entityDao: EntityDao,
  ) {}

  async seed(): Promise<boolean> {
    const entitiesCount = await this.entityDao.count();

    if (entitiesCount === 0) {
      const entities: EntityEntity[] = [
        EntityEntity.fromPrimitives({
          id: "08199b27-d48f-4837-be07-d8a41cf22b9c",
          name: "Entity",
          description: "Represents a domain entity with a unique identity, a defined type, descriptive metadata, and a collection of fields that define its structure.",
          type: "ENTITY",
          fields: [
            {
              name: "id",
              type: "uuid",
            },
            {
              name: "name",
              type: "string",
            },
            {
              name: "description",
              type: "string",
            },
            {
              name: "type",
              type: "enum",
            },
            {
              name: "fields",
              type: "array",
            },
          ],
        }),
        EntityEntity.fromPrimitives({
          id: "6846e001-a3a1-42f8-99d4-b360f68a9d5d",
          name: "Infrastructure",
          description: "Represents an infrastructure component or technical resource, identified by a unique ID and classified by its type.",
          type: "ENTITY",
          fields: [
            {
              name: "id",
              type: "uuid",
            },
            {
              name: "type",
              type: "enum",
            },
            {
              name: "name",
              type: "string",
            },
            {
              name: "description",
              type: "string",
            },
          ],
        }),
        EntityEntity.fromPrimitives({
          id: "cbb7ad80-69a8-4ce8-9714-b5cde7b3e0d9",
          name: "UseCase",
          description: "Represents an application use case that encapsulates a specific business operation and its dependencies.",
          type: "ENTITY",
          fields: [
            {
              name: "id",
              type: "uuid",
            },
            {
              name: "name",
              type: "string",
            },
            {
              name: "description",
              type: "string",
            },
            {
              name: "type",
              type: "enum",
            },
            {
              name: "dependencies",
              type: "array",
            },
          ],
        }),
      ];

      await this.entityDao.saveMany(entities);

      return true;
    }

    return false;
  }
}
