import type { Seeder } from "../../../../../shared/data";

export class MainDatabaseSeeder {
  constructor(
    private readonly seeders: Seeder[],
  ) {}

  async seedAll(): Promise<boolean> {
    const results = await Promise.all(
      this.seeders.map((seeder) => seeder.seed()),
    );

    return results.filter((res) => res).length > 0;
  }
}
