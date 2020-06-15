import { Schema } from 'mongoose'

import messages from '../../utils/validation/messages'
import { message } from '../../utils/validation/range'


exports.Message = new Schema({
    author: {
        type: String,
        required: [true, messages.required.author]
    },
    message: {
        type: String,
        trim: true,
        required: [true, messages.required.message],
        minlength: [message.min, messages.restrictions.message],
        maxlength: [message.max, messages.restrictions.message]
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})