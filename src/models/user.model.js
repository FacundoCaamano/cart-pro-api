import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
        default: null
    },
    role: {
        type: String,
        default: 'user'
    },
    addresses: [{
        street: String,
        city: String,
        num: String,
        province: String,
        postalCode: String
    }]
})

const userModel = mongoose.model('user', userSchema)

export default userModel