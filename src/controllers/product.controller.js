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