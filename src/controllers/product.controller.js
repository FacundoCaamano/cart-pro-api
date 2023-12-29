import productModel from "../models/products.model.js"


export const getProducts = async (req,res)=>{
    const products = await productModel.find().exec()
    res.json(products)
}

export const createProduct = async (req,res)=>{
    const product = await productModel.create(req.body)
    res.json(product)
}