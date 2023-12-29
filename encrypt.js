import bcrypt from 'bcrypt'


const hashPassword = async (password) =>{
    const saltRound = 10
    const hashPassword = await bcrypt.hash(password, saltRound)

    return hashPassword
}

const comparePassword = async (password, hashPassword) =>{
    const match = await bcrypt.compare(password, hashPassword)
    return match
}

export {hashPassword, comparePassword}