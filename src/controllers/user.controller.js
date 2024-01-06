import mongoose from "mongoose"
import userModel from "../models/user.model.js"
import cartModel from "../models/cart.model.js"
import { hashPassword, comparePassword } from "../../encrypt.js"
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
        const {name, surname, email,role, password} = req.body

        const hashedPassword = await hashPassword(password)

        const newUser = new userModel({
            name,
            surname,
            email,
            role,
            password: hashedPassword
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

export const isAuthenticated = async (req,res) =>{
    try{
        const {email, password} = req.body

        const userByEmail = await userModel.findOne({email})

        if(!userByEmail){
            return res.status(404).send({message: 'user not found'})
        } 

        const isPasswordValid = await comparePassword(password, userByEmail.password)

        if(isPasswordValid){
            console.log('usuario autenticado');
            return res.status(200).send({message: 'password valid' , user: userByEmail})
        }
        if(!isPasswordValid){
            return res.status(404).send({message: 'password invalid'})
        }
    }catch(error){
       
        res.status(500).send({message: 'error al authenticar'})
    }
}

export const editUser = async(req,res)=>{
    const id = req.params.id
    const {name, surname, email} = req.body
  
    const user = {
        name,
        surname,
        email
    }
    await userModel.findByIdAndUpdate(id, user)
    res.json({message: 'user updated'})
}