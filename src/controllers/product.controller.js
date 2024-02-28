import mongoose from "mongoose"
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

export const getPublishedProducts = async(req,res) =>{
    const userId = req.params.userId
    const products = await productModel.find({sellerId:userId})

    res.json(products)
}

export const deleteProduct = async (req,res)=>{
    try {
        // Obtiene el ID del producto de los parámetros de la solicitud
        const productId = req.params.productId;

        // Elimina el producto utilizando el método del modelo
        const result = await productModel.deleteOne({ _id: productId });

        // Comprueba si se encontró y eliminó un producto
        if (result.deletedCount === 1) {
            // Si se eliminó correctamente, envía una respuesta JSON
            return res.json({ message: 'Producto eliminado' });
        } else {
            // Si no se encontró el producto, devuelve un mensaje de error
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        // Si ocurre algún error durante el proceso, devuelve un mensaje de error
        console.error('Error al eliminar el producto:', error);
        return res.status(500).json({ error: 'Se produjo un error al eliminar el producto' });
    }
}

export const editProduct = async(req,res)=>{
    const productId = req.params.productId
    const {title,price,description,code,stock} = req.body
    //const product = await productModel.findById(productId)

    const product = {
        title,
        price,
        description,
        code,
        stock
    }
    try{
        await productModel.findByIdAndUpdate(productId, product)
        res.json({message: 'producto editado'})

    }catch(error){
        console.error('Error al editar el producto:', error);
        res.status(500).json({ error: 'Se produjo un error al editar el producto' });
    }
    
}

export const stock = async (productId, quantity, res) => {
    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Verificar si hay suficiente stock
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Cantidad insuficiente en stock' });
        }

        // Reducir el stock
        product.stock -= quantity;

        // Guardar el producto actualizado en la base de datos
        await product.save();

        // Responder con el producto actualizado
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el stock del producto' });
    }
}