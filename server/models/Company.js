import mongoose, {Schema} from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import timestamps from 'mongoose-timestamp'

import regex from '../utils/validation/regex'
import messages from '../utils/validation/messages'
import { images } from '../utils/validation/defaults'
import {title, url, secret, info } from '../utils/validation/range'

import Request from './submodels/Request'


const CompanySchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, messages.required.title],
        index: true,
        unique: true,
        minlength: [title.min, messages.restrictions.title],
        maxlength: [title.max, messages.restrictions.title]
    },
    website: {
        type: String,
        required: [true, messages.required.website],
        trim: true,
        unique: true,
        match: [regex.url, match.url],
        minlength: [url.max, messages.restrictions.url],
        maxlength: [url.max, messages.restrictions.url]
    },
    secret: {
        type: String,
        required: [true, messages.required.secret],
        trim: true,
        match: [regex.secret, messages.match.secret],
        minlength: [secret.min, messages.restrictions.secret],
        maxlength: [secret.max, messages.restrictions.secret] 
    },
    info: {
        type: String,
        trim: true,
        maxlength: [info.max, messages.restrictions.info]
    },
    image: {
        type: String,
        default: images.company,
        match: [regex.url, messages.match.url],
        minlength: [url.max, messages.restrictions.url],
        maxlength: [url.max, messages.restrictions.url]
    },
    certificates: [String],
    requsts: [Request],
    representives: [String],
    consultants: [String],
    products: [String]
})


UserSchema.plugin(bcrypt)
UserSchema.plugin(timestamps)

mongoose.exports = mongoose.model('Company', CompanySchema)