import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'

import messages from '../utils/validation/messages'
import { quantity, sum } from '../utils/validation/range'


const OrderSchema = new Schema({
    customer: {
        type: String,
        required: [true, messages.required.customer]
    },
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
    consultant: { /* Username of most useful consultant */
        type: String,
        required: [true, messages.required.consultant]
    }
})

OrderSchema.plugin(timestamps)


mongoose.exports = mongoose.model('Order', OrderSchema)