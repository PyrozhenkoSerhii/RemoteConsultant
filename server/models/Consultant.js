import mongoose, { Schema } from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import timestamps from 'mongoose-timestamp'

import messages from '../utils/validation/messages'
import { images, gender } from '../utils/validation/defaults'
import regex from '../utils/validation/regex'
import { email, username, fullname, password, matureAge, url, rating } from '../utils/validation/range'

import Certificate from './submodels/Certificate'
import Language from './submodels/Language'


/**
 * Note: Fields [Age, Phone, Image, Gender] not required during registration
 *       They should be initialized by consultant from profile setting to
 *       set field {completed: true} and allow consultations
 */
const ConsultantSchema = new Schema({
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
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, messages.required.username],
        minlength: [username.min, messages.restrictions.username],
        minlength: [username.max, messages.restrictions.username]
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
    age: {
        type: Number,
        min: [matureAge.min, messages.restrictions.matureAge],
        max: [matureAge.max, messages.restrictions.matureAge]
    },
    gender: {
        type: String,
        enum: gender.enum,
        default: gender.default
    },
    
    rating: {
        type: String,
        min: [rating.min, messages.restrictions.rating],
        max: [rating.max, messages.restrictions.rating]
    },
    phone: {
        type: Number,
        match: [regex.phone, messages.match.phone]
    },
    certificate: Certificate,
    languages: [Language],
    verified: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    }
})

ConsultantSchema.plugin(bcrypt)
ConsultantSchema.plugin(timestamps)


module.exports = mongoose.model('Consultant', ConsultantSchema)