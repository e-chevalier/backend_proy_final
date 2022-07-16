import mongoose from "mongoose"

const productsCollection = 'products'

const ProductsSchema = mongoose.Schema({
    id: {type: Number, require: true, unique: true},
    title: {type: String, require: true, max:100},
    price: {type: Number, require: true},
    description: {type: String, require: true, max:250},
    thumbnail: {type: String, require: true, max:100},
    timestamp: {type: String, require: true, max:100},
    code: {type: String, require: true, max:100},
    stock: {type: Number, require: true},
    qty:{type: Number, default: 0}
})

const products = mongoose.model(productsCollection, ProductsSchema)

export { products, ProductsSchema }