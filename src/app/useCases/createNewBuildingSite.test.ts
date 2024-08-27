import { describe, test, expect } from "@jest/globals";
import { buildApp } from "..";
import { BuildingLimit, HeightPlateau } from "../types";
import { BuildingSiteRepository } from "../../repositories/buildingSiteRepository";

const testInput = {
  building_limits: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [10.757867266534337, 59.91339283457274],
              [10.756516000002959, 59.913633000004204],
              [10.756398999995643, 59.91346700000333],
              [10.75628300000438, 59.91330300000502],
              [10.756052815307351, 59.91297582153187],
              [10.756245682709302, 59.912959479672516],
              [10.757486364709461, 59.91285434826322],
              [10.757867266534337, 59.91339283457274],
            ],
          ],
        },
      },
    ],
  },
  height_plateaus: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-1, -1],
              [-1, 1],
              [1, 1],
              [1, -1],
            ],
          ],
        },
        properties: {
          elevation: 3.63,
        },
      },
    ],
  },
};

describe("Create new site", () => {
  test("Valid input creates instance in db", async () => {
    const app = buildApp({
      createNewBuildingSite: jest.fn().mockResolvedValue({ id: "123" }),
    } as any as BuildingSiteRepository);

    const createNewBuildingSite = await app.createNewProject({
      buildingLimits: testInput.building_limits.features as BuildingLimit[],
      heightPlateaus: testInput.height_plateaus.features as HeightPlateau[],
    });

    expect(createNewBuildingSite).toEqual({ id: "123" });
  });

  test("Invalid input throws error", async () => {
    const app = buildApp({
      createNewBuildingSite: jest
        .fn()
        .mockRejectedValue(new Error("Invalid input")),
    } as any as BuildingSiteRepository);

    await expect(
      app.createNewProject({
        buildingLimits: testInput.building_limits.features as BuildingLimit[],
        heightPlateaus: testInput.height_plateaus.features as HeightPlateau[],
      })
    ).rejects.toThrow("Invalid input");
  });
});
