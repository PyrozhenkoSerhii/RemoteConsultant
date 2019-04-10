import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'

import messages from '../utils/validation/messages'
import regex from '../utils/validation/regex'
import { title, url, note, type } from '../utils/validation/range'
import { images } from '../utils/validation/defaults'

const CertificateSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, messages.required.title],
        minlength: [title.min, messages.restrictions.title],
        maxlength: [title.max, messages.restrictions.title]
    },
    type: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
        required: [true, messages.required.type],
        minlength: [type.min, messages.restrictions.type],
        maxlength: [type.max, messages.restrictions.type]
    },
    image: {
        type: String,
        default: images.certificate,
        match: [regex.url, messages.match.url],
        minlength: [url.min, messages.restrictions.url],
        maxlength: [url.max, messages.restrictions.url]
    },
    note: {
        type: String,
        trim: true,
        maxlength: [note.max, messages.required.note]
    }
})

CertificateSchema.plugin(timestamps)


module.exports = mongoose.model('Certificate', CertificateSchema)
