import mongoose from 'mongoose'

const floorSchema = new mongoose.Schema({
  floor: {type: Number, required: true, unique: true },
  parking_spots: [{
    number: {type: Number, required: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
    is_available: {type: Boolean, required: true},
    is_charging_station: {type: Boolean, required: true},
    is_disabled_parking: {type: Boolean, required: true},
}],

}, {
    timestamps: true
})
const Floor = mongoose.model('Floor', floorSchema)
export default Floor;