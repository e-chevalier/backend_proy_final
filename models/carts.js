import mongoose from "mongoose"

const cartsCollection = 'carts'

const CartsSchema = mongoose.Schema({
    id: {type: Number, require: true, unique: true},
    timestamp: {type: String, require: true, max:100},
    products: { type : Array , "default" : [] }
})

export const carts = mongoose.model(cartsCollection, CartsSchema)