import { BuildingSiteRepository } from "../repositories/buildingSiteRepository";
import {
  calculateAreaDifference,
  calculateSplitBuildingLimits,
} from "./helpers";
import { BadInputError, BuildingLimit, HeightPlateau } from "./types";

export const buildUpdateBuildingSite = (
  buildingSiteRepository: BuildingSiteRepository
) => {
  return async ({
    id,
    buildingLimits,
    heightPlateaus,
  }: {
    id: string;
    buildingLimits: BuildingLimit[];
    heightPlateaus: HeightPlateau[];
  }) => {
    const splitBuildingLimits = calculateSplitBuildingLimits(
      buildingLimits,
      heightPlateaus
    );
    const areaDifference = calculateAreaDifference(
      buildingLimits,
      splitBuildingLimits
    );

    if (areaDifference > 0.1) {
      throw new BadInputError(
        "Height plateaus do not cover the building limits"
      );
    }

    await buildingSiteRepository.updateBuildingSite(
      id,
      buildingLimits,
      heightPlateaus,
      splitBuildingLimits
    );
  };
};
