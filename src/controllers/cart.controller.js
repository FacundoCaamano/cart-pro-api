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

        const cart = await cartModel.findById(cartId)
        console.log(cart);
        if(!cart){
            return res.status(404).send({message: 'carrito no encontrado'})
        }
        
        const product = await productModel.findById(productId)
        if(!product){
            return res.status(404).send({message: 'producto no encontrado'})
        }
        
        
         cart.products.push(product._id)
        
         await cart.save()
         await product.save()
         res.json({ message: "Producto agregado al carrito" })
    }catch(error){
        console.log(error);
        res.status(500).send({message: 'Error al agregar el producto'},error)
    }
}