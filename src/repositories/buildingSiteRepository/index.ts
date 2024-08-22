import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { BuildingLimit, HeightPlateau } from "../../app/types";

const mapDBEntryToBuildingLimit: (data: any) => BuildingLimit[] = (data) => {
  if (Array.isArray(data)) {
    return data.map((entry: any) => {
      return {
        geometry: entry.geometry,
        properties: entry.properties,
        type: entry.type,
      };
    });
  }
  throw new Error("Invalid data");
};

const mapDBEntryToHeightPlateau: (data: any) => HeightPlateau[] = (data) => {
  if (Array.isArray(data)) {
    return data.map((entry: any) => {
      return {
        geometry: entry.geometry,
        properties: entry.properties,
        type: entry.type,
      };
    });
  }
  throw new Error("Invalid data");
};

const mapDBEntryToBuildingSite = (data: any) => {
  return {
    buildingLimits: mapDBEntryToBuildingLimit(data.buildingLimits),
    heightPlateaus: mapDBEntryToHeightPlateau(data.heightPlateaus),
    splitBuildingLimits: mapDBEntryToHeightPlateau(data.splitBuildingLimits),
    id: data.id,
  };
};

export const buildBuildingSiteRepository = (fireBaseDB: Firestore) => ({
  createNewBuildingSite: async ({
    buildingLimits,
    heightPlateaus,
    splitBuildingLimits,
  }: {
    buildingLimits: BuildingLimit[];
    heightPlateaus: HeightPlateau[];
    splitBuildingLimits: HeightPlateau[];
  }) => {
    // convert buildingLimits, heightPlateaus, splitBuildingLimits to db format

    const docRef = await addDoc(collection(fireBaseDB, "buildingSite"), {
      data: JSON.stringify({
        buildingLimits,
        heightPlateaus,
        splitBuildingLimits,
      }),
    });

    return {
      id: docRef.id,
    };
  },

  getBuildingSite: async (id: string) => {
    const docRef = doc(fireBaseDB, "buildingSite", id);
    const docSnap = (await getDoc(docRef)).data();

    return mapDBEntryToBuildingSite(JSON.parse(docSnap?.data));
  },

  updateBuildingSite: async (
    id: string,
    buildingLimits: BuildingLimit[],
    heightPlateaus: HeightPlateau[],
    splitBuildingLimits: HeightPlateau[]
  ) => {
    const docRef = doc(fireBaseDB, "buildingSite", id);
    await setDoc(docRef, {
      data: JSON.stringify({
        buildingLimits,
        heightPlateaus,
        splitBuildingLimits,
      }),
    });
  },
});

export type BuildingSiteRepository = ReturnType<
  typeof buildBuildingSiteRepository
>;
