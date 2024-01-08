import jwt from 'jsonwebtoken'

function generateToken(usuario){
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