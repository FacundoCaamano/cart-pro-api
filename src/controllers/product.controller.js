import productModel from "../models/products.model.js"


export const getProducts = async (req,res)=>{
    const products = await productModel.find().exec()
    res.json(products)
}

export const createProduct = async (req,res)=>{
    const product = await productModel.create(req.body)
    res.json(product)
}
export const getProductById = async(req,res)=>{
    const id = req.params.id

    const product = await productModel.findById(id)
    res.json(product)
}