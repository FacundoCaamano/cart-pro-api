import mongoose from "mongoose";
import userModel from "./user.model.js";

const productSchema = new mongoose.Schema({
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: String,
    price: Number,
    thumbnail: [String],
    description: String,
    code: String,
    stock: Number
})

const productModel = mongoose.model('products', productSchema)

export default productModel