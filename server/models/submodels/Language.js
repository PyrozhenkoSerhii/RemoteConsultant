import { Schema } from 'mongoose'

import messages from '../../utils/validation/messages'
import { language } from '../../utils/validation/defaults'
import { title } from '../../utils/validation/range'

import timestamp from 'mongoose-timestamp'

const LanguageSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, messages.required.title],
        minLength: [title.min, messages.restrictions.title],
        maxlength: [title.max, messages.restrictions.title]
    },
    level: {
        type: String,
        required: [true, messages.required.level],
        enum: language.enum
    }
})

LanguageSchema.plugin(timestamp)

exports.Language = LanguageSchema