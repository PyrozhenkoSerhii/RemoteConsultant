import { Schema } from 'mongoose'

import messages from '../../utils/validation/messages'
import { quantity, sum } from '../../utils/validation/range'


exports.default = new Schema({
    product: {
        type: String,
        required: [true, messages.required.product]
    },
    quantity: {
        type: Number,
        required: [true, messages.required.quantity],
        min: [quantity.min, messages.restrictions.quantity],
        max: [quantity.max, messages.restrictions.quantity]
    },
    sum: {
        type: Number,
        required: [true, messages.required.sum],
        min: [sum.min, messages.restrictions.sum],
        max: [sum.max, messages.restrictions.sum]
    },
    date: {
        type: Date,
        default: Date.now()
    }
})