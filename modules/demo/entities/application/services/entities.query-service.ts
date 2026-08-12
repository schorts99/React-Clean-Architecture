import type { GetAllEntitiesQueryResultDto } from "../dtos";

export interface EntitiesQueryService {
  getAll(): Promise<GetAllEntitiesQueryResultDto>;
}
