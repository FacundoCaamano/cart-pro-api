import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    thumbnail: [String],
    description: String,
    code: String,
    stock: Number
})

const productModel = mongoose.model('products', productSchema)

export default productModel