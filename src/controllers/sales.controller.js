import mongoose from "mongoose"
import sellerModel from "../models/sales.model.js"

export const getSalesById =(req, res)=>{
    
    res.json({message:'sales'})
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