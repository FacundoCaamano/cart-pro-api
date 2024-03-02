import jwt from 'jsonwebtoken'

export function generateToken(usuario){
    const payload = {
        id: usuario.id,
        name: usuario.name,
        surname: usuario.surname,
        email: usuario.email,
        role: usuario.role,
        addresses: usuario.addresses,
        cart: usuario.cart
    }

    const secretKey = process.env.SECRET_KEY
    const token = jwt.sign(payload, secretKey, {expiresIn: '7d'})

    return token
}

export const checkToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(401).json({ message: 'Debes incluir la cabecera de autorización' });
    }
    const token = req.headers['authorization'];

    let payload;
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY);
    } catch {
        return res.status(401).json({ message: 'Token inválido' });
    }

    next();
}