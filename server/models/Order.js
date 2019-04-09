import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'
import _forEach from 'lodash/forEach'

import messages from '../utils/validation/messages'
import { quantity, sum } from '../utils/validation/range'
import { calculate, getValue } from '../utils/contribution/calculator'

import Consultant from './Consultant'


const OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, messages.required.customer]
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
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
    consultant: { /* _id of the most useful consultant */
        type: Schema.Types.ObjectId,
        ref: 'Consultant',
        required: [true, messages.required.consultant]
    }
})

OrderSchema.plugin(timestamps)


OrderSchema.post('save', async order => {
    const coefficients = await calculate(order)

    const sums = getValue(order.sum, coefficients)

    _forEach(sums, (sum, consultant) => {
        Consultant.findOneAndUpdate({ username: consultant }, { $inc: { bill: sum } })
    })
})


module.exports = mongoose.model('Order', OrderSchema)