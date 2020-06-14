import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'

import messages from '../utils/validation/messages'
import { title } from '../utils/validation/range'

import { Message } from './submodels/Message'
import { Survey } from './submodels/Survey'


const ConsultationSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, messages.required.customer]
    },
    consultant: {
        type: Schema.Types.ObjectId,
        ref: 'Consultant',
        required: [true, messages.required.consultant],
        index: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, messages.required.product]
    },
    alternative: { /* _id of an alternative product */
        type: Schema.Types.ObjectId,
        ref: 'Product',
        minlength: [title.min, messages.restrictions.title],
        maxlength: [title.max, messages.restrictions.title]
    },
    messages: [Message],
    survey: Survey,
    paidConsultation: {
      type: Boolean,
      default: false,
    }
})

ConsultationSchema.plugin(timestamps)



module.exports = mongoose.model('Consultation', ConsultationSchema)