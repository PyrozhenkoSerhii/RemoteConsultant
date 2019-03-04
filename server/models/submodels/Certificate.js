import { Schema } from 'mongoose'

import messages from '../../utils/validation/messages'
import regex from '../../utils/validation/regex'
import { title, url, note } from '../../utils/validation/range'


exports.Certificate = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, messages.required.title],
        minlength: [title.min, messages.restrictions.title],
        maxlength: [title.max, messages.restrictions.title]
    },
    url: {
        type: String,
        required: [true, messages.required.url],
        match: [regex.url, messages.match.url],
        minlength: [url.min, messages.restrictions.url],
        maxlength: [url.max, messages.restrictions.url]
    },
    note: {
        type: String,
        trim: true,
        maxlength: [note.max, messages.required.note]
    },
    date: {
        type: Date,
        default: Date.now()
    }
})