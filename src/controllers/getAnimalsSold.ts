import express from "express";
import AnimlsDiedType from "../models/getAnimalsDiedAndSold";
const getAnimalsSoldRouter = express.Router();

getAnimalsSoldRouter.get("/", async (req, res) => {
  try {
    const animals = await AnimlsDiedType.find({
      removed: true,
      deregisterReason: "628bc213096d05d7cacea38e",
    });
    const animalCounts = {};
    animals.forEach((animal) => {
      animalCounts[animal.animalType] = (animalCounts[animal.animalType] || 0) + 1;
    });
  
    res.send(animalCounts)
  } catch {}
});

export default getAnimalsSoldRouter;
