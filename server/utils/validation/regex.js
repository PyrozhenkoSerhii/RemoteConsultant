module.exports = {
    email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    secret: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
    url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    fullname: /(\w.+\s).+/i,
    phone: /^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/,
    idCharacters: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
}