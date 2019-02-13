import mongoose, {Schema} from 'mongoose'
import timestamps from 'mongoose-timestamp'

import messages from '../utils/validation/messages'

import Message from './submodels/Message'


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
    messages: [Message]
})

ConsultationSchema.plugin(timestamps)


mongoose.exports = mongoose.model('Consultation', ConsultationSchema)