import { Schema } from 'mongoose'

import messages from '../../utils/validation/messages'
import { assessment, note } from '../../utils/validation/range'


exports.default = new Schema({
    consultant: {
        type: String,
        required: [true, messages.required.consultant]
    },
    assessment: {
        type: Number,
        required: [true, messages.required.assessment],
        min: [assessment.min, messages.restrictions.assessment],
        max: [assessment.max, messages.restrictions.assessment]
    },
    note: {
        type: String,
        trim: true,
        maxlength: [note.max, messages.restrictions.note]
    },
    date: {
        type: Date,
        default: Date.now()
    }
})