import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2222
        },
        Admin: Number // i dont know why is appearing undefinied!
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
})

 export const userModel = mongoose.model('User', userSchema)