import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import users from './routes/users.router.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_DB


app.use('/carrito-pro', users)


mongoose.connect(MONGO_URI,{
    dbName: 'carrito-pro'
})
mongoose.connection.on('connected', async () => {

    console.log('Mongoose connected to MongoDB')
    
    app.listen(PORT , ()=>{
        console.log('servidor corriendo')
    })
})





