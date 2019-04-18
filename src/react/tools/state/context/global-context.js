import React from 'react'


export default React.createContext({
    accounts: {
        info: {
            customer: null,
            consultant: null,
            company: null
        },
        tokens: {
            customer: null,
            consultant: null,
            company: null
        }
    },
    authenticate: (entity, info, token) => { },
    logout: entity => { }
})