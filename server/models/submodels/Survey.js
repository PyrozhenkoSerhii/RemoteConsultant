import { Schema } from 'mongoose'

import messages from '../../utils/validation/messages'
import { competence, friendliness, note } from '../../utils/validation/range'


const SurveySchema = new Schema({
    competence: {
        type: Number,
        required: [true, messages.required.competence],
        min: [competence.min, messages.restrictions.competence],
        max: [competence.max, messages.restrictions.competence]
    },
    friendliness: {
        type: Number,
        required: [true, messages.required.friendliness],
        min: [friendliness.min, messages.restrictions.friendliness],
        max: [friendliness.max, messages.restrictions.friendliness]
    },
    note: {
        type: String,
        trim: true,
        maxlength: [note.max, messages.restrictions.note]
    }
})

SurveySchema.set('validateBeforeSave', false)


exports.Survey = SurveySchema