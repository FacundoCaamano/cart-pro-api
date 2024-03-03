import cartModel from '../models/cart.model.js'
import productModel from '../models/products.model.js'
import userModel from '../models/user.model.js'
export const getCarts = async (req, res)=>{
    const carts = await cartModel.find().exec()
    res.json(carts)
}

export const getCartById = async (req,res)=>{
    const id = req.params.id
    const cart = await cartModel.findById(id).populate('products').exec()
    res.json(cart)
}

export const addProductToCart = async (req, res)=>{
    try{
        const cartId = req.params.cartId
        const productId = req.params.productId
        const quantity = req.body.quantity || 1

        const cart = await cartModel.findById(cartId)
        if(!cart){
            return res.status(404).send({message: 'carrito no encontrado'})
        }
        
        const product = await productModel.findById(productId)
        if(!product){
            return res.status(404).send({message: 'producto no encontrado'})
        }
        
        const existingProduct = cart.products.find( p => p.product._id.equals(productId))

        if(existingProduct){
            existingProduct.quantity += quantity
        }else{
            cart.products.push({product: productId, quantity})
        }

         await cart.save()
         await product.save()
         res.json({ message: "Producto agregado al carrito" })
    }catch(error){
       
        res.status(500).send({message: 'Error al agregar el producto'},error)
    }
}

export const deleteProductToCart = async (req,res) =>{
    try{
        const cartId = req.params.cartId
        const productId = req.params.productId

        const cart = await cartModel.findById(cartId)
        if(!cart){
            return res.status(404).send({message: 'carrito no encontrado'})
        }

        const product = await productModel.findById(productId)
        if(!product){
            return res.status(404).send({message: 'producto no encontrado'})
        }

        cart.products= cart.products.filter(p => !p.product._id.equals(productId))

        await cart.save()
        await product.save()
        res.json({ message: "Producto eliminado del carrito" })
        
    }catch{
        res.status(500).send({message: 'Error al eliminar el producto'})
    }
}

export const clearCart = async (req, res)=>{
    try{
        const cartId = req.params.cartId

        const cart = await cartModel.findById(cartId)
        
        if (!cart) {
            return res.status(404).send({message: 'Carrito no encontrado'})
        }

        cart.products = []
        await cart.save()

        res.json({message: 'carrito vaciado'})
    }catch{
        res.status(500).send({message: 'Error al limpiar el carrito'}) 
    }
}