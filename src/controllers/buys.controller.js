import compra from "../models/buys.js"


export const createBuy = async (req,res)=>{
    try{
        const {user, products, total} = req.body

        const newBuy = new compra({
            user,
            products,
            total,
            fecha: new Date()
        })

        await newBuy.save()
        res.status(200).json({mensaje: 'Compra realizada con éxito',newBuy})
    }catch{
        res.status(500).json({error: 'Error al realizar la compra'})
    }
}

export const getBuys= async (req,res)=>{
    try{
        const userId = req.params.userId

        const buys = await compra.find({user: userId}).populate('products').exec()

        res.status(200).json({buys})
    }catch{
        res.status(500).json({error: 'Error al obtener las compras'})
    }
}