import { BuildingLimit, HeightPlateau, Point } from "./types";
import { intersection, union, difference, xor } from "polygon-clipping";

export const calculateSplitBuildingLimits = (
  buildingLimits: BuildingLimit[],
  heightPlateaus: HeightPlateau[]
) => {
  // for each building limit
  // for each height plateau
  // find intersection and store as split building limit
  // return split building limits

  const splitBuildingLimits: HeightPlateau[] = [];

  for (const buildingLimit of buildingLimits) {
    for (const heightPlateau of heightPlateaus) {
      const buildingLimitCoordinates = buildingLimit.geometry.coordinates;
      const heightPlateauCoordinates = heightPlateau.geometry.coordinates;

      const splitBuildingLimitCoordinates = intersection(
        buildingLimitCoordinates,
        heightPlateauCoordinates
      );
      if (splitBuildingLimitCoordinates.length > 0) {
        splitBuildingLimitCoordinates.forEach(
          (splitBuildingLimitCoordinate) => {
            splitBuildingLimits.push({
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: splitBuildingLimitCoordinate,
              },
              properties: { elevation: heightPlateau.properties.elevation },
            });
          }
        );
      }
    }
  }

  return splitBuildingLimits;
};

function calcPolygonArea(vertices: Point[]) {
  var total = 0;

  for (var i = 0, l = vertices.length; i < l; i++) {
    var addX = vertices[i][0];
    var addY = vertices[i == vertices.length - 1 ? 0 : i + 1][1];
    var subX = vertices[i == vertices.length - 1 ? 0 : i + 1][0];
    var subY = vertices[i][1];

    total += addX * addY * 0.5;
    total -= subX * subY * 0.5;
  }

  return Math.abs(total);
}

export const calculateAreaDifference = (
  a: BuildingLimit[],
  b: BuildingLimit[]
) => {
  const unionA = union(
    a.map((buildingLimit) => buildingLimit.geometry.coordinates)
  );
  const unionB = union(
    b.map((buildingLimit) => buildingLimit.geometry.coordinates)
  );
  const diff = difference(unionA, unionB);
  let areaDiff = 0;
  diff.forEach((polygon) => {
    polygon.forEach((ring) => {
      areaDiff += calcPolygonArea(ring);
    });
  });

  return areaDiff;
};
