import mongoose, {Schema} from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import timestamp from 'mongoose-timestamp'

import config from '../config'
import regex from '../utils/regex'

import Representive from './submodels/Representative'

const CompanySchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        index: true,
        unique: true,
        minlength: [3, 'Title must contains at least 3 character']
    },
    representives: [Representive]
    

})