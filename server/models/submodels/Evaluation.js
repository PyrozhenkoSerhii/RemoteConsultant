import { Schema } from 'mongoose'

exports.default = new Schema({
    consultant: {
        type: String,
        required: [true, 'Product info is required'],
        trim: true
    },
    rate: {
        type: Number,
        min: [1, 'Enter a valid product quantity']
    },
    mark: {
        type: Number,
        min: [1, "The price field is invalid"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
})