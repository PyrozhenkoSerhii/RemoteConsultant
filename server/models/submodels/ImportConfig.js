import { Schema } from 'mongoose'

import messages from '../../utils/validation/messages'
import regex from '../../utils/validation/regex'
import { url, title } from '../../utils/validation/range'
import defaults from '../../utils/validation/defaults'


exports.ImportConfig = new Schema({
    mode: {
        type: String,
        /* TODO: fix error with enum */
        // enum: [defaults.mode.enum],
        // default: [defaults.mode.default]
    },
    url: {
        type: String,
        /* removed for testing*/
        // match: [regex.url, messages.match.url],
        // minlength: [url.min, messages.restrictions.url],
        // maxlength: [url.max, messages.restrictions.url]
    },
    interval: Number,
    patterns: [{
        connections: Object,
        fieldsPathMap: Object,
        startPath: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Representative'
        },
        title: {
            type: String,
            trim: true,
            minlength: [title.min, messages.restrictions.title],
            maxlength: [title.max, messages.restrictions.title]
        }
    }]
})