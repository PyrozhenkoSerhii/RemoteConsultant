import mongoose, { Schema } from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import timestamps from 'mongoose-timestamp'

import regex from '../utils/validation/regex'
import messages from '../utils/validation/messages'
import { gender, images } from '../utils/validation/defaults'
import { email, username, password, age, url, fullname } from '../utils/validation/range'

import { Comment } from './submodels/Comment'


const UserSchema = new Schema({
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
        min: [age.min, messages.restrictions.age],
        max: [age.max, messages.restrictions.age]
    },
    gender: {
        type: String,
        enum: gender.enum,
        default: gender.default
    },
    image: {
        type: String,
        default: images.customer,
        match: [regex.url, messages.match.url],
        minlength: [url.min, messages.restrictions.url],
        minlength: [url.max, messages.restrictions.url]
    },
    comments: [Comment],
    verified: {
        type: Boolean,
        default: false
    }
})


UserSchema.plugin(bcrypt)
UserSchema.plugin(timestamps)


module.exports = mongoose.model('User', UserSchema)