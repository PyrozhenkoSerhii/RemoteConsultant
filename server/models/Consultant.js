import mongoose, { Schema } from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import timestamps from 'mongoose-timestamp'
import _pull from 'lodash/pull'

import messages from '../utils/validation/messages'
import defaults from '../utils/validation/defaults'
import regex from '../utils/validation/regex'
import { email, username, fullname, password, matureAge, url, rating, info, title, type, note } from '../utils/validation/range'
import logger from '../utils/logger'

import { Language } from './submodels/Language'
import Company from './Company'


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
        maxlength: [username.max, messages.restrictions.username]
    },
    fullname: {
        type: String,
        trim: true,
        required: [true, messages.required.fullname],
        match: [regex.fullname, messages.match.fullname],
        minlength: [fullname.min, messages.restrictions.fullname],
        maxlength: [fullname.max, messages.restrictions.fullname]
    },
    password: {
        type: String,
        select: false,
        bcrypt: true,
        required: [true, messages.required.password],
        match: [regex.password, messages.match.password],
        minlength: [password.min, messages.restrictions.password],
        maxlength: [password.max, messages.restrictions.password]
    },
    age: {
        type: Number,
        min: [matureAge.min, messages.restrictions.matureAge],
        max: [matureAge.max, messages.restrictions.matureAge]
    },
    gender: {
        type: String,
        enum: defaults.gender.enum,
        default: defaults.gender.default
    },
    rating: {
        type: Number,
        min: [rating.min, messages.restrictions.rating],
        max: [rating.max, messages.restrictions.rating],
        default: defaults.rating
    },
    bill: {
        type: Number,
        default: defaults.bill
    },
    phone: {
        type: Number,
        match: [regex.phone, messages.match.phone]
    },
    info: {
        type: String,
        trim: true,
        maxlength: [info.max, messages.restrictions.info]
    },
    image: {
        type: String,
        default: defaults.images.customer,
        match: [regex.url, messages.match.url],
        minlength: [url.min, messages.restrictions.url],
        maxlength: [url.max, messages.restrictions.url]
    },
    certificate: {
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
            data: Buffer,
            contentType: String
        },
        note: {
            type: String,
            trim: true,
            maxlength: [note.max, messages.required.note]
        }
    },
    languages: [Language],
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        trim: true
    },
    online: {
        type: Boolean,
        default: false
    },
    chat: {
        id: String,
        allowAudio: {
            type: Boolean,
            default: true
        },
        allowVideo: {
            type: Boolean,
            default: true
        }
    },
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

ConsultantSchema.pre('remove', next => {
    Company.findById(this.company, (err, company) => {
        if (err) logger.error(`Something went wrong while fetching company. \n Method: consultant remove, cascade remove`)
        if (!company) logger.error(`Company with title ${this.company} wasn't found. \n Method: consultant remove, cascade remove`)

        company.consultants.pull(this._id)

        company.save((err, saved) => {
            if (err) logger.error(`Something went wrong while updating company with title ${this.company} \n Method: consultant remove, cascade remove`)
            if (saved) logger.log(`Company updated \n Method: consultant remove, cascade remove`)

            return next()
        })
    })
})




module.exports = mongoose.model('Consultant', ConsultantSchema)