import { Schema } from 'mongoose'

import messages from '../../utils/validation/messages'
import { message } from '../../utils/validation/range'


exports.Comment = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, messages.required.product]
    },
    message: {
        type: String,
        trim: true,
        required: [true, messages.required.message],
        minlength: [message.min, messages.restrictions.message],
        maxlength: [message.max, messages.restrictions.message]
    },
    date: {
        type: Date,
        default: Date.now()
    }
})