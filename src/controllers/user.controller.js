import mongoose from "mongoose"
import userModel from "../models/user.model.js"
import cartModel from "../models/cart.model.js"
export const getUsers= async (req,res)=>{
    const users = await userModel.find().exec()
    res.json(users)
}

export const getUserById = async (req,res)=>{
    const user = await userModel.findById(req.params.id).populate(
        {
            path: 'cart',
            populate: {
                path: 'products',
                model: 'products', // Reemplaza 'products' con el nombre de tu modelo de productos
            },
        }
        
        ).exec()
    res.json(user)
}



export const createUser= async (req,res) =>{
    try{
        const {name, surname, email, password} = req.body

        const newUser = new userModel({
            name,
            surname,
            email,
            password
        })

        const newCart = new cartModel()
        await newCart.save()

        newUser.cart = newCart._id

        await newUser.save()
        
        res.status(200).send({user: newUser, cart: newCart , message: 'user created'})
    }catch(error){
        console.log(error);
        res.status(500).send(error)
    }
}