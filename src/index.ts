import express from "express";
import { buildBuildingSiteRepository } from "./repositories/buildingSiteRepository";
import { db } from "./firebase";
import { buildApp } from "./app";
import { BadInputError } from "./app/types";

const app = express();
app.use(express.json());

const port = 3000;

const buildingSiteRepository = buildBuildingSiteRepository(db);
const buildingSiteApp = buildApp(buildingSiteRepository);

// post building limits and height plateaus
app.post("/building-site", async (req, res, next) => {
  try {
    const { building_limits, height_plateaus } = req.body;

    //validate geoJSON
    //validate
    console.log("buildingLimits", req.body);

    const result = await buildingSiteApp.createNewProject({
      buildingLimits: building_limits.features,
      heightPlateaus: height_plateaus.features,
    });
    res.send(result);
  } catch (err) {
    next(err); // Pass errors to the error-handling middleware
  }
});

// get /project/:id
app.get("/project/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await buildingSiteApp.getProject({ id });
    res.send(result);
  } catch (err) {
    next(err); // Pass errors to the error-handling middleware
  }
});

app.use((err: Error, req: any, res: any, next: any) => {
  console.error(err.stack);
  if (err instanceof BadInputError) {
    res.status(400).send(err.message);
  }

  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
