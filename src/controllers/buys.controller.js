import compra from "../models/buys.js"


export const createBuy = async (req,res)=>{
    try{
        const { products, total ,userId} = req.body

        const newBuy = new compra({
            userId,
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
                products: buy.products // Si necesitas más información de los productos, podrías formatearlos aquí
            };
        });

        res.status(200).json({ buys: formattedBuys });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las compras.' });
    }
};