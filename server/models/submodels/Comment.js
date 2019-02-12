import { Schema } from 'mongoose'

exports.default = new Schema({
    product: {
        type: String,
        required: [true, 'Product info is required'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'The message field is required'],
        minlength: [3, 'Message must contains at least 3 character'],
        trim: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})