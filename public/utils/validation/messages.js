"use strict";

var _range = _interopRequireDefault(require("./range"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Object.freeze({
  required: {
    email: "Email is required",
    username: "Username is required",
    fullname: "Fullname is required",
    title: "Title is required",
    password: "Password is required",
    secret: "Secret is required",
    link: "Link is required",
    website: "Website is required",
    age: "Age is required",
    phone: "Phone number is required",
    level: "Level of lang is required",
    assessment: "Evaluation is required",
    message: "Message is required",
    product: "Product info is required",
    customer: "Customer info is required",
    consultant: "Consultant info is required",
    company: "Company is required",
    sender: "Sender info is required",
    receiver: "Receiver info is required",
    category: "Category is required",
    quantity: "Quantity is required",
    price: "Price is required",
    sum: "Sum is required",
    usefulness: "Usefulness is required",
    competence: "Competence is required",
    friendliness: "Impression is required",
    type: "Type is required"
  },
  match: {
    password: "Wrong password format, its length must be at least 8 symbols and contain at least 1 number",
    secret: "Wrong secret format, its length must be at least 5 symbols and contain at least 1 number",
    email: "Wrong email format, valid example: \"name@domain.com\"",
    url: "Wrong url format, please, provide a valid url which uses http(s):// or www://",
    fullname: "Wrong full name format, it must contains at least 2 words",
    phone: "Wrong phone format, valid examples: (000)4445566 or 1112223344 or 000-111-22-33"
  },
  restrictions: {
    email: "Email length must be ranged from ".concat(_range.default.email.min, " to ").concat(_range.default.email.max),
    username: "Username length must be ranged from ".concat(_range.default.username.min, " to ").concat(_range.default.username.max),
    fullname: "Fullname length must be ranged from ".concat(_range.default.fullname.min, " to ").concat(_range.default.fullname.max),
    title: "Title length must be ranged from ".concat(_range.default.title.min, " to ").concat(_range.default.title.max),
    password: "Password length must be ranged from ".concat(_range.default.password.min, " to ").concat(_range.default.password.max),
    secret: "Secret length must be ranged from ".concat(_range.default.secret.min, " to ").concat(_range.default.secret.max),
    url: "Url length must be ranged from ".concat(_range.default.url.min, " to ").concat(_range.default.url.max),
    info: "Info length must be ranged from ".concat(_range.default.info.min, " to ").concat(_range.default.info.max),
    message: "Message length must be ranged from ".concat(_range.default.message.min, " to ").concat(_range.default.message.max),
    description: "Description length must be ranged from ".concat(_range.default.description.min, " to ").concat(_range.default.description.max),
    note: "Note length must be ranged from ".concat(_range.default.note.min, " to ").concat(_range.default.note.max),
    age: "Age must be ranged from ".concat(_range.default.age.min, " to ").concat(_range.default.age.max),
    matureAge: "Age must must be ranged from ".concat(_range.default.matureAge.min, " to ").concat(_range.default.matureAge.max),
    rating: "Rating must be ranged from ".concat(_range.default.rating.min, " to ").concat(_range.default.rating.max),
    assessment: "Evaluation must be ranged from ".concat(_range.default.assessment.min, " to ").concat(_range.default.assessment.max),
    quantity: "Quantity must be ranged from ".concat(_range.default.quantity.min, " to ").concat(_range.default.quantity.max),
    price: "Price must be ranged from ".concat(_range.default.price.min, " to ").concat(_range.default.price.max),
    sum: "Sum must be ranged from ".concat(_range.default.secret.min, " to ").concat(_range.default.secret.max),
    competence: "Competence must be ranged from ".concat(_range.default.competence.min, " to ").concat(_range.default.competence.max),
    friendliness: "Impression must be ranged from ".concat(_range.default.friendliness.min, " to ").concat(_range.default.friendliness.max),
    type: "Type length must be ranged from ".concat(_range.default.type.min, " to ").concat(_range.default.type.max)
  }
});
//# sourceMappingURL=messages.js.map