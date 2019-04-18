import { Schema } from 'mongoose'

import messages from '../../utils/validation/messages'
import regex from '../../utils/validation/regex'
import { url } from '../../utils/validation/range'

exports.ImportConfig = new Schema({
    structure: { Object },
    API: {
        type: String,
        min: [url.min, messages.restrictions.url],
        max: [url.max, messages.restrictions.url],
        match: [regex.url, messages.match.url]
    }
})