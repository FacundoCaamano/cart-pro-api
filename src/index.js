import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import users from './routes/users.router.js'
import products from './routes/product.router.js'
import carts from './routes/cart.router.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_DB

app.use(express.json())
app.use('/carrito-pro', users)
app.use('/carrito-pro', products)
app.use('/carrito-pro', carts)
mongoose.connect(MONGO_URI,{
    dbName: 'carrito-pro'
})
mongoose.connection.on('connected', async () => {

    console.log('Mongoose connected to MongoDB')
    
    app.listen(PORT , ()=>{
        console.log('servidor corriendo')
    })
})


mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  });



