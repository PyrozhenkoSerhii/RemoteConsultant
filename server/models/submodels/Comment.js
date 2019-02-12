import { Schema } from 'mongoose'

exports.default = new Schema({
    product: {
        type: String,
        required: [true, 'Product info is required'],
        trim: true
    },
    message: {
        type: Number,
        min: [1, 'Enter a valid product quantity']
    },
    date: {
        type: Date,
        default: Date.now()
    }
})