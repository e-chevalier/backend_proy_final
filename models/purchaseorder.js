import mongoose from "mongoose"

const purchaseorderCollection = 'purchaseorder'

const PurchaseorderSchema = mongoose.Schema({
    id: {type: Number, require: true, unique: true},
    email: { type: String, require: true, max: 255},
    timestamp: {type: String, require: true, max:100},
    products: { type : Array , "default" : []},
    status: { type: String, require: false, "default": "Generada", max: 50}
})

export const purchaseorder = mongoose.model(purchaseorderCollection, PurchaseorderSchema)