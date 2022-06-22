import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    parking_spot: {type: Number, required: true},
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    price: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},

},
{
    timestamps: true,
})
const Order = mongoose.model('Order', orderSchema)
export default Order;