import mongoose, { Schema } from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import timestamps from 'mongoose-timestamp'

import regex from '../utils/validation/regex'
import messages from '../utils/validation/messages'
import { images } from '../utils/validation/defaults'
import { title, url, secret, info } from '../utils/validation/range'
import logger from '../utils/logger'

import { Request } from './submodels/Request'
import Representative from './Representative'
import Product from './Product'


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
        match: [regex.url, messages.match.url],
        minlength: [url.min, messages.restrictions.url],
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
        minlength: [url.min, messages.restrictions.url],
        maxlength: [url.max, messages.restrictions.url]
    },
    certificates: [String], /* Title of certificate */
    requests: [Request],
    representatives: [String], /* Username of representative */
    consultants: [String], /* Username of consultant */
    products: [String] /* Title of product */
})

CompanySchema.plugin(bcrypt)
CompanySchema.plugin(timestamps)

CompanySchema.pre('remove', function(next){
    /* Note: these functions don't trigger post/pre hooks */
    Product.deleteMany({ company: this.title }, err => {
        if (err) logger.error(`Something went wrong while deleting products of company ${this.title}. Method: company remove, cascade delete`)
        else logger.log(`Products of company ${this.title} were deleted. Method: company remove, cascade delete`)
    })
    Representative.deleteMany({ company: this.title }, err => {
        if (err) logger.error(`Something went wrong while deleting representatives of company ${this.title}. Method: company remove, cascade delete`)
        else logger.log(`Representatives of company ${this.title} were deleted. Method: company remove, cascade delete`)
    })

    next()
})


module.exports = mongoose.model('Company', CompanySchema)