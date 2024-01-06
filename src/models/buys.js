import mongoose from 'mongoose'

const buySchema = new mongoose.Schema({
    user : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' 
     },
     products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
     }],
     total: Number,
     fecha: Date
})

const compra = mongoose.model('buys', buySchema)

export default compra