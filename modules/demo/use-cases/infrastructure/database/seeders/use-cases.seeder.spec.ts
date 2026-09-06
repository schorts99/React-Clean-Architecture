import { describe, expect, it, vi } from "vitest";

import { UseCasesSeeder } from "./use-cases.seeder";

import type { UseCaseDao } from "../../../application/interfaces";

describe("UseCasesSeeder", () => {
  const createUseCaseDaoMock = (): UseCaseDao =>
    ({
      count: vi.fn(),
      saveMany: vi.fn(),
    }) as unknown as UseCaseDao;

  describe("seed", () => {
    it("should seed the default use cases when none exist", async () => {
      const useCaseDao = createUseCaseDaoMock();

      vi.mocked(useCaseDao.count).mockResolvedValue(0);
      vi.mocked(useCaseDao.saveMany).mockResolvedValue([]);

      const seeder = new UseCasesSeeder(useCaseDao);
      const result = await seeder.seed();

      expect(result).toBe(true);
      expect(useCaseDao.count).toHaveBeenCalledOnce();
      expect(useCaseDao.saveMany).toHaveBeenCalledOnce();

      const [useCases] = vi.mocked(useCaseDao.saveMany).mock.calls[0];

      expect(useCases).toHaveLength(5);
      expect(useCases.map((useCase) => useCase.name.value)).toEqual([
        "OverviewQuery",
        "GetAllEntitiesQuery",
        "GetAllUseCasesQuery",
        "GetHealthQuery",
        "GetAllInfrastructuresQuery",
      ]);
    });

    it("should not seed when use cases already exist", async () => {
      const useCaseDao = createUseCaseDaoMock();

      vi.mocked(useCaseDao.count).mockResolvedValue(5);

      const seeder = new UseCasesSeeder(useCaseDao);
      const result = await seeder.seed();

      expect(result).toBe(false);
      expect(useCaseDao.count).toHaveBeenCalledOnce();
      expect(useCaseDao.saveMany).not.toHaveBeenCalled();
    });
  });
});
