import jwt from 'jsonwebtoken'

export function generateToken(usuario){
    const payload = {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        role: usuario.role
    }

    const secretKey = process.env.SECRET_KEY
    const token = jwt.sign(payload, secretKey, {expiresIn: '1d'})

    return token
}

export const checkToken=(req,res,next)=>{
    console.log('pasa por el middleware');
    if(!req.headers['authorization']){
        return res.json(401).send({message: 'debes incluir la cabecera de autorización'})
    }
    const token = req.headers['authorization']

    let payload
    try{
        payload = jwt.verify(token, process.env.SECRET_KEY)
    }catch{
        return res.json(401).send({message: 'token invalido'})
    }

    next()
}