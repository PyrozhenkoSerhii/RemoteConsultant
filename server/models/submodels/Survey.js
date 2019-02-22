import { Schema } from 'mongoose'

import messages from '../../utils/validation/messages'
import { competence, impression, note } from '../../utils/validation/range'
import { impact } from '../../utils/validation/defaults'


exports.default = new Schema({
    usefulness: {
        type: Boolean,
        required: [true, messages.required.usefulness],
    },
    competence: {
        type: Number,
        required: [true, messages.required.competence],
        min: [competence.min, messages.restrictions.competence],
        max: [competence.max, messages.restrictions.competence]
    },
    impression: {
        type: Number,
        required: [true, messages.required.impression],
        min: [impression.min, messages.restrictions.impression],
        max: [impression.max, messages.restrictions.impression]
    },
    impact: {
        type: String,
        required: [true, messages.required.impact],
        enum: impact.enum
    },
    note: {
        type: String,
        trim: true,
        maxlength: [note.max, messages.restrictions.note]
    }
})