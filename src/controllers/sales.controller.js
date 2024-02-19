import mongoose from "mongoose"
import sellerModel from "../models/sales.model.js"

export const getSalesById = async(req, res)=>{
    try{

        const userId = req.params._id
        const sales = await sellerModel.find({sellerId: userId})

        
       
     return res.status(200).json(sales)
        
    }catch{
        res.status(500).json({message: 'error al obtener ventas'})
    }



    
}

export const createSales = async (req,res)=>{
    try{

        const {sellerId, buyerId, products} = req.body
        
        const newSales = new sellerModel({
            sellerId,
            buyerId,
            products,
            date: new Date()
        })
        
        await newSales.save()
    }catch(error){
        res.json({message: 'error', errorMessage: error})
    }
    
   
}