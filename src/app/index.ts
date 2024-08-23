import { BuildingSiteRepository } from "../repositories/buildingSiteRepository";
import { buildCreateNewBuildingSite } from "./createNewBuildingSite";
import { buildGetBuildingSite } from "./getBuildingSite";
import { buildUpdateBuildingSite } from "./updateBuildingSite";

interface App {
  createNewProject: ReturnType<typeof buildCreateNewBuildingSite>;
  getProject: ReturnType<typeof buildGetBuildingSite>;
  updateProject: ReturnType<typeof buildUpdateBuildingSite>;
}

export const buildApp: (
  buildingSiteRepository: BuildingSiteRepository
) => App = (buildingSiteRepository) => {
  return {
    createNewProject: buildCreateNewBuildingSite(buildingSiteRepository),
    getProject: buildGetBuildingSite(buildingSiteRepository),
    updateProject: buildUpdateBuildingSite(buildingSiteRepository),
  };
};
