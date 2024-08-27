import { BuildingSiteRepository } from "../../repositories/buildingSiteRepository";
import {
  calculateAreaDifference,
  calculateSplitBuildingLimits,
} from "../helpers";
import { BadInputError, BuildingLimit, HeightPlateau } from "../types";

type CreateNewBuildingSiteInput = {
  buildingLimits: BuildingLimit[];
  heightPlateaus: HeightPlateau[];
};

export const buildCreateNewBuildingSite = (
  buildingSiteRepository: BuildingSiteRepository
) => {
  return async ({
    buildingLimits,
    heightPlateaus,
  }: CreateNewBuildingSiteInput) => {
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

    return buildingSiteRepository.createNewBuildingSite({
      buildingLimits,
      heightPlateaus,
      splitBuildingLimits,
    });
  };
};
