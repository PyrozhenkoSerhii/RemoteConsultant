import range from './range'

module.exports = Object.freeze({
  required: {
    email: `Email is required`,
    username: `Username is required`,
    fullname: `Fullname is required`,
    title: `Title is required`,

    password: `Password is required`,
    secret: `Secret is required`,

    link: `Link is required`,
    website: `Website is required`,

    age: `Age is required`,
    phone: `Phone number is required`,
    level: `Level of lang is required`,
    assessment: `Evaluation is required`,

    message: `Message is required`,

    product: `Product info is required`,
    customer: `Customer info is required`,
    consultant: `Consultant info is required`,
    company: `Company is required`,
    author: `Author info is required`,

    category: `Category is required`,
    quantity: `Quantity is required`,
    price: `Price is required`,
    sum: `Sum is required`,

    usefulness: `Usefulness is required`,
    competence: `Competence is required`,
    friendliness: `Impression is required`,

    type: `Type is required`,
  },
  match: {
    password: `Wrong password format, its length must be at least 8 symbols and contain at least 1 number`,
    secret: `Wrong secret format, its length must be at least 5 symbols and contain at least 1 number`,
    email: `Wrong email format, valid example: "name@domain.com"`,
    url: `Wrong url format, please, provide a valid url which uses http(s):// or www://`,
    fullname: `Wrong full name format, it must contains at least 2 words`,
    phone: `Wrong phone format, valid examples: (000)4445566 or 1112223344 or 000-111-22-33`,
  },
  restrictions: {
    email: `Email length must be ranged from ${range.email.min} to ${range.email.max}`,
    username: `Username length must be ranged from ${range.username.min} to ${range.username.max}`,
    fullname: `Fullname length must be ranged from ${range.fullname.min} to ${range.fullname.max}`,
    title: `Title length must be ranged from ${range.title.min} to ${range.title.max}`,
    password: `Password length must be ranged from ${range.password.min} to ${range.password.max}`,
    secret: `Secret length must be ranged from ${range.secret.min} to ${range.secret.max}`,
    url: `Url length must be ranged from ${range.url.min} to ${range.url.max}`,
    info: `Info length must be ranged from ${range.info.min} to ${range.info.max}`,
    message: `Message length must be ranged from ${range.message.min} to ${range.message.max}`,
    description: `Description length must be ranged from ${range.description.min} to ${range.description.max}`,
    note: `Note length must be ranged from ${range.note.min} to ${range.note.max}`,
    age: `Age must be ranged from ${range.age.min} to ${range.age.max}`,
    matureAge: `Age must must be ranged from ${range.matureAge.min} to ${range.matureAge.max}`,
    rating: `Rating must be ranged from ${range.rating.min} to ${range.rating.max}`,
    assessment: `Evaluation must be ranged from ${range.assessment.min} to ${range.assessment.max}`,
    quantity: `Quantity must be ranged from ${range.quantity.min} to ${range.quantity.max}`,
    price: `Price must be ranged from ${range.price.min} to ${range.price.max}`,
    sum: `Sum must be ranged from ${range.secret.min} to ${range.secret.max}`,
    competence: `Competence must be ranged from ${range.competence.min} to ${range.competence.max}`,
    friendliness: `Impression must be ranged from ${range.friendliness.min} to ${range.friendliness.max}`,
    type: `Type length must be ranged from ${range.type.min} to ${range.type.max}`,
  }
})