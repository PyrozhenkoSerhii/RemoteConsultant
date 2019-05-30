import { Schema } from 'mongoose'
import timestamp from 'mongoose-timestamp'

import messages from '../../utils/validation/messages'
import { message } from '../../utils/validation/range'


const RequestSchema = new Schema({
    consultant: {
        type: Schema.Types.ObjectId,
        ref: 'Consultant',
        required: [true, messages.required.consultant]
    },
    message: {
        type: String,
        trim: true,
        maxlength: [message.max, messages.restrictions.message]
    }
})

RequestSchema.plugin(timestamp)

exports.Request = RequestSchema