import { Schema } from 'mongoose'

import messages from '../../utils/validation/messages'
import { message } from '../../utils/validation/range'


exports.default = new Schema({
    consultant: {
        type: String,
        required: [true, messages.required.consultant]
    },
    message: {
        type: String,
        trim: true,
        maxlength: [message.max, messages.restrictions.message]
    },
    approved: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})