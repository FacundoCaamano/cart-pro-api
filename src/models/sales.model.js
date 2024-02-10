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
    products: {
        type:[
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: Number
            }
        ]
    },
    date: Date
})

const sellerModel = mongoose.model('seller', sellerSchema)

export default sellerModel
