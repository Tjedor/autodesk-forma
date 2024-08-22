import { BuildingSiteRepository } from "../repositories/buildingSiteRepository";
import { calculateAreaDifference } from "./helpers";

export const buildGetBuildingSite = (
  buildingSiteRepository: BuildingSiteRepository
) => {
  return async ({ id }: { id: string }) => {
    const result = await buildingSiteRepository.getBuildingSite(id);
    calculateAreaDifference(result.buildingLimits, result.splitBuildingLimits);
    return buildingSiteRepository.getBuildingSite(id);
  };
};
