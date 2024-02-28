import mongoose  from "mongoose";


const sellerSchema = new mongoose.Schema({
    sellerId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    buyerId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: Number
    }],
    total: Number,
    address: {
            street: String,
            city: String,
            num: String,
            province: String,
            postalCode: String
        }
    ,
    date: Date
})

const sellerModel = mongoose.model('seller', sellerSchema)

export default sellerModel
