import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import users from './src/routes/users.router.js'
import products from './src/routes/product.router.js'
import carts from './src/routes/cart.router.js'
import buys from './src/routes/buys.router.js'
import cors from 'cors'
import sales from './src/routes/sales.router.js'


dotenv.config()

const app = express()
const PORT = 3000
const MONGO_URI = process.env.MONGO_DB



app.use(cors())
app.use(express.json())
app.get('/', (req,res)=>{
    res.json({title:"Cart-pro-api"})
})
app.use('/carrito-pro', users)
app.use('/carrito-pro', products)
app.use('/carrito-pro', carts)
app.use('/carrito-pro' ,buys)
app.use('/carrito-pro', sales)

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



