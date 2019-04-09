import React from 'react'


export default React.createContext({
    representative: {
        email: '',
        fullname: '',
        phone: '',
        image: '',
        company: ''
    },
    token: null,
    authenticateRepresentative: (representative, token) => { },
    logoutRepresentative: () => { }
})