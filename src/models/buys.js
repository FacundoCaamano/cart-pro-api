import mongoose from 'mongoose'

const buySchema = new mongoose.Schema({
    userId : { 
        type: mongoose.Schema.Types.ObjectId,
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
      },
     fecha: Date
})

buySchema.pre('find', function(){
   this.populate('products.productId')
})
const compra = mongoose.model('buys', buySchema)

export default compra