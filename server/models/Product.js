import mongoose, {Schema} from 'mongoose'
import timestamps from 'mongoose-timestamp'

import { images } from '../utils/validation/defaults'
import { title, price, quantity, url, description } from '../utils/validation/range'
import messages from '../utils/validation/messages'
import regex from '../utils/validation/regex'


const ProductSchema = new Schema({
    title: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        required: [true, messages.required.title],
        minlength: [title.min, messages.restrictions.title],
        minlength: [title.max, messages.restrictions.title]
    },
    company: {
        type: String,
        required: [true, messages.required.company]
    },
    category: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, messages.required.category]
    },
    price: {
        type: Number,
        required: [true, messages.required.price],
        min: [price.min, messages.restrictions.price],
        max: [price.max, messages.restrictions.price]
    },
    quantity: {
        type: Number,
        required: [true, messages.required.quantity],
        min: [quantity.min, messages.restrictions.quantity],
        max: [quantity.max, messages.restrictions.quantity]
    },
    image: {
        type: String,
        default: images.product,
        match: [regex.url, messages.match.url],
        minlength: [url.min, messages.restrictions.url],
        maxlength: [url.max, messages.restrictions.url]
    },
    description: {
        type: String,
        minlength: [description.min, messages.restrictions.description],
        maxlength: [description.max, messages.restrictions.description]
    },
    specification: [Object]
})

ProductSchema.plugin(timestamps)


module.exports = mongoose.model('Product', ProductSchema)