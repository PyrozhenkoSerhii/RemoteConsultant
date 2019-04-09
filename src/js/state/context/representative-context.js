import React from 'react'


export default React.createContext({
    representative: {
        email: '',
        fullname: '',
        phone: '',
        image: ''

    },
    token: null,
    authenticateRepresentative: (representative, token) => { },
    logoutRepresentative: () => { }
})