import express from "express";
import { buildBuildingSiteRepository } from "./repositories/buildingSiteRepository";
import { initializeFirebase } from "./firebase";
import { buildApp } from "./app";
import { BadInputError } from "./app/types";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";

// Load environment variables from .env file
dotenv.config();
// Read FIREBASE_API_KEY from environment variables
const firebaseApiKey = process.env.FIREBASE_API_KEY;
if (!firebaseApiKey) {
  throw new Error(
    "FIREBASE_API_KEY is not defined in the environment variables"
  );
}

const db = initializeFirebase(firebaseApiKey);
const app = express();
app.use(express.json());

app.use((err: Error, req: any, res: any, next: any) => {
  console.error(err.stack);
  if (err instanceof BadInputError) {
    res.status(400).send(err.message);
  }

  res.status(500).send("Something broke!");
});

const port = 3000;

const buildingSiteRepository = buildBuildingSiteRepository(db);
const buildingSiteApp = buildApp(buildingSiteRepository);

app.post("/project", async (req, res, next) => {
  try {
    const { building_limits, height_plateaus } = req.body;

    const result = await buildingSiteApp.createNewProject({
      buildingLimits: building_limits.features,
      heightPlateaus: height_plateaus.features,
    });
    res.send(result);
  } catch (err) {
    next(err);
  }
});

app.get("/project/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await buildingSiteApp.getProject({ id });
    res.send(result);
  } catch (err) {
    next(err);
  }
});

app.patch("/project/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const { building_limits, height_plateaus } = req.body;

    await buildingSiteApp.updateProject({
      id,
      buildingLimits: building_limits.features,
      heightPlateaus: height_plateaus.features,
    });
    res.send("Project updated");
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
