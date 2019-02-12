import { Schema } from 'mongoose'

exports.default = new Schema({
    consultant: {
        type: String,
        required: [true, 'Product info is required'],
        trim: true
    },
    rate: {
        type: Number,
        min: [1, 'Rate must be in range 1-5'],
        max: [5, 'Rate must be in range 1-5']
    },
    mark: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})