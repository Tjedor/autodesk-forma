import {
  addDoc,
  collection,
  doc,
  DocumentData,
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

const mapDBEntryToBuildingSite = (id: string, data: DocumentData) => {
  const parsedData = JSON.parse(data.data);
  return {
    buildingLimits: mapDBEntryToBuildingLimit(parsedData.buildingLimits),
    heightPlateaus: mapDBEntryToHeightPlateau(parsedData.heightPlateaus),
    splitBuildingLimits: mapDBEntryToHeightPlateau(
      parsedData.splitBuildingLimits
    ),
    id,
    version: data.version,
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
      version: 0,
    });

    return {
      id: docRef.id,
    };
  },

  getBuildingSite: async (id: string) => {
    const docRef = doc(fireBaseDB, "buildingSite", id);
    const docSnap = (await getDoc(docRef)).data();

    if (!docSnap) {
      throw new Error("Document not found");
    }

    return mapDBEntryToBuildingSite(docRef.id, docSnap);
  },

  updateBuildingSite: async (
    id: string,
    buildingLimits: BuildingLimit[],
    heightPlateaus: HeightPlateau[],
    splitBuildingLimits: HeightPlateau[],
    newVersionNumber: number
  ) => {
    const docRef = doc(fireBaseDB, "buildingSite", id);
    await setDoc(docRef, {
      data: JSON.stringify({
        buildingLimits,
        heightPlateaus,
        splitBuildingLimits,
      }),
      version: newVersionNumber,
    });
  },
});

export type BuildingSiteRepository = ReturnType<
  typeof buildBuildingSiteRepository
>;
