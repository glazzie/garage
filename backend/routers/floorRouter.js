import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Floor from '../models/floorModel.js';

const floorRouter = express.Router();

floorRouter.get('/', expressAsyncHandler(async (req, res) => {
  const floors = await Floor.find({})
  res.send(floors);
})
);

floorRouter.get('/:id', expressAsyncHandler(async(req,res) => {
  const floor = await Floor.find({ floor: req.params.id})
  if(floor){
      res.send(floor)
  } else {
      res.status(404).send({message: 'floor not found'})
  }
}))

export default floorRouter

