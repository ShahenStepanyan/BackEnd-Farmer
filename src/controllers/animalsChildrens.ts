import express from "express";
import { get } from "http";
import Animals from "../models/Animals";
import getAnimalsDiedRouter from "../models/getAnimalsDiedAndSold";
const getChildrensRouter = express.Router()

getChildrensRouter.get("/",async(req: any,res) => {
  const animaType = req.query.params
  const limit = 6
  try {
    const animals = await Animals.find({
      animalType: animaType,
      removed: false
    }).limit(limit);

    const childCounts = await Promise.all(
      animals.map((item) => Animals.find({ parent: item._id}))
    );
    
    res.json({ animals, childCounts });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }

})

export default getChildrensRouter