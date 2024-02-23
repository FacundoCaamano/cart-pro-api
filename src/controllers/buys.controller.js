import compra from "../models/buys.js"
import { stock } from "./product.controller.js"


export const createBuy = async (req,res)=>{
    try{
        const { products,total ,userId, address} = req.body

        const newBuy = new compra({
            userId,
            products,
            total,
            address,
            fecha: new Date()
        })

        await newBuy.save()
        const compraPopulated = await compra.findById(newBuy._id).populate('products');
        for (let index = 0; index < compraPopulated.products.length; index++) {
            let product = compraPopulated.products[index]
            let total =  compraPopulated.total
            stock(product._id, total)
        }
        res.status(200).json({mensaje: 'Compra realizada con éxito',newBuy})
    }catch{
        res.status(500).json({error: 'Error al realizar la compra'})
    }
}

export const getBuys = async (req, res) => {
    try {
        const userId = req.params.userId;
        const buys = await compra.find({ userId: userId }).populate('products');

        if (!buys || buys.length === 0) {
            return res.status(404).json({ message: 'No se encontraron compras para este usuario.' });
        }

        // Mapea las compras para devolver solo la información relevante
        const formattedBuys = buys.map(buy => {
            return {
                _id: buy._id,
                total: buy.total,
                fecha: buy.fecha,
                address: buy.address,
                products: buy.products // Si necesitas más información de los productos, podrías formatearlos aquí
            };
        });

        res.status(200).json({ buys: formattedBuys });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las compras.' });
    }
};