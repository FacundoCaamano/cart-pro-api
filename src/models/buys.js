import mongoose from 'mongoose'

const buySchema = new mongoose.Schema({
    userId : { 
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

buySchema.pre('find', function(){
   this.populate('products')
})
const compra = mongoose.model('buys', buySchema)

export default compra