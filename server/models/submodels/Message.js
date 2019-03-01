import { Schema } from 'mongoose'

import messages from '../../utils/validation/messages'
import { message } from '../../utils/validation/range'


exports.Message = new Schema({
    sender: {
        type: String,
        required: [true, messages.required.sender]
    },
    receiver: {
        type: String,
        required: [true, messages.required.receiver]
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