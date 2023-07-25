import express from "express";
import AnimlsDiedType from "../models/getAnimalsDiedAndSold";
import AnimalTypes from "../models/AnimalTypes";
const getAnimalsDiedRouter = express.Router();

getAnimalsDiedRouter.get("/", async (req, res) => {
  try {
    const animals = await AnimlsDiedType.find({
      removed: true,
      deregisterReason: "628bc1c1096d05d7cacea382",
    });
    const animalCounts = {};
    animals.forEach((animal) => {
      animalCounts[animal.animalType] = (animalCounts[animal.animalType] || 0) + 1;
    });
  
    res.send(animalCounts)
  } catch {}
});

export default getAnimalsDiedRouter;
