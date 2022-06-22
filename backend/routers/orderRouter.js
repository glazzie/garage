import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils.js';
import Order from '../models/orderModel.js';

const orderRouter = express.Router();

// isAuth och isAdmin är bortkommenterat för att folk som inte är inloggade ska kunna se om platserna är upptagna (mer info under GarageScreen)

orderRouter.get('/', /*isAuth, isAdmin,*/ expressAsyncHandler(async (req, res) => {
      const orders = await Order.find({}).populate('user', 'regnr');
      res.send(orders);
    })
  );

orderRouter.post('/', isAuth, expressAsyncHandler(async(req, res) => {
    if(!req.body.parking_spot) {
        res.status(400).send({ message: 'error'})
    } else {
        const order = new Order({
          parking_spot: req.body.parking_spot,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          price: 12,
          totalPrice: req.body.totalPrice,
          user: req.user._id,
        })
        const createdOrder = await order.save();
        res.status(201).send({message: "new order created", order: createdOrder})
    }
}))

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id)
      if (order) {
        const deleteOrder = await order.remove()
        res.send({ message: 'Order Deleted', order: deleteOrder })
      } else {
        res.status(404).send({ message: 'Order Not Found' })
      }
    })
  );  

export default orderRouter

