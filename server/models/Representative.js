import mongoose, { Schema } from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import timestamps from 'mongoose-timestamp'

import { images } from '../utils/validation/defaults'
import messages from '../utils/validation/messages'
import regex from '../utils/validation/regex'
import {email, fullname, password, url, } from '../utils/validation/range'


const RepresentativeSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        required: [true, messages.required.email],
        match: [regex.email, messages.match.email],
        minLength: [email.min, messages.restrictions.email],
        maxlength: [email.max, messages.restrictions.email]
    },
    fullname: {
        type: String,
        trim: true,
        required: [true, messages.required.fullname],
        match: [regex.fullname, messages.match.fullname],
        minlength: [fullname.min, messages.restrictions.fullname],
        minlength: [fullname.max, messages.restrictions.fullname]
    },
    password: {
        type: String,
        select: false,
        bcrypt: true,
        required: [true, messages.required.password],
        match: [regex.password, messages.match.password],
        minlength: [password.min, messages.restrictions.password],
        minlength: [password.max, messages.restrictions.password]
    },
    phone: {
        type: Number,
        required: [true, messages.required.phone],
        match: [regex.phone, messages.match.phone]
    },
    image: {
        type: String,
        default: images.representative,
        match: [regex.url, messages.match.url],
        minlength: [url.min, messages.restrictions.url],
        minlength: [url.max, messages.restrictions.url]
    },
    company: {
        type: String,
        required: [true, messages.required.company]
    }
})

RepresentativeSchema.plugin(bcrypt)
RepresentativeSchema.plugin(timestamps)


module.exports = mongoose.model('Representative', RepresentativeSchema)

