import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'

import messages from '../utils/validation/messages'
import { title } from '../utils/validation/range'

import Message from './submodels/Message'
import Survey from './submodels/Survey'


const ConsultationSchema = new Schema({
    customer: {
        type: String,
        required: [true, messages.required.customer]
    },
    consultant: {
        type: String,
        required: [true, messages.required.consultant]
    },
    product: {
        type: String,
        required: [true, messages.required.product]
    },
    alternative: { /* title of alternative product */
        type: String,
        minlength: [title.min, messages.restrictions.title],
        minlength: [title.max, messages.restrictions.title]
    },
    messages: [Message],
    survey: Survey
})

ConsultationSchema.plugin(timestamps)


mongoose.exports = mongoose.model('Consultation', ConsultationSchema)