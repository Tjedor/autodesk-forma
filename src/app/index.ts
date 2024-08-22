import { BuildingSiteRepository } from "../repositories/buildingSiteRepository";
import { buildCreateNewBuildingSite } from "./createNewBuildingSite";
import { buildGetBuildingSite } from "./getBuildingSite";

interface App {
  createNewProject: ReturnType<typeof buildCreateNewBuildingSite>;
  getProject: ReturnType<typeof buildGetBuildingSite>;
  updateProject: (
    id: string,
    project: { buildingLimits: any; heightPlateaus: any }
  ) => void;
}

export const buildApp: (
  buildingSiteRepository: BuildingSiteRepository
) => App = (buildingSiteRepository) => {
  return {
    createNewProject: buildCreateNewBuildingSite(buildingSiteRepository),
    getProject: buildGetBuildingSite(buildingSiteRepository),
    updateProject: (id, project) => {
      console.log("id", id, project);
    },
  };
};
