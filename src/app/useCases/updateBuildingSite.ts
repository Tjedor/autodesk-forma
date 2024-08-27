import { BuildingSiteRepository } from "../../repositories/buildingSiteRepository";
import {
  calculateAreaDifference,
  calculateSplitBuildingLimits,
} from "../helpers";
import { BadInputError, BuildingLimit, HeightPlateau } from "../types";

export const buildUpdateBuildingSite = (
  buildingSiteRepository: BuildingSiteRepository
) => {
  return async ({
    id,
    buildingLimits,
    heightPlateaus,
    versionNumber,
  }: {
    id: string;
    buildingLimits: BuildingLimit[];
    heightPlateaus: HeightPlateau[];
    versionNumber: number;
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

    const { version } = await buildingSiteRepository.getBuildingSite(id);

    if (version !== versionNumber) {
      throw new BadInputError("Version number is outdated");
    }

    await buildingSiteRepository.updateBuildingSite(
      id,
      buildingLimits,
      heightPlateaus,
      splitBuildingLimits,
      versionNumber + 1
    );
    return undefined;
  };
};
