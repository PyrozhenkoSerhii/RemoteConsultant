import React, { useState } from 'react'
import _omit from 'lodash/omit'

import GlobalContext from '../context/global-context'


const GlobalProvider = props => {
    const [accounts, setAccounts] = useState(JSON.parse(localStorage.getItem('accounts')) || { info: {}, tokens: {} })

    const authenticate = (entity, info, token) => {
        const refreshedInfo = { ...accounts.info, [entity]: info }
        const refreshedTokens = { ...accounts.tokens, [entity]: token }

        refresh(refreshedInfo, refreshedTokens)
    }

    const logout = entity => {
        const refreshedInfo = _omit(accounts.info, entity)
        const refreshedTokens = _omit(accounts.tokens, entity)

        refresh(refreshedInfo, refreshedTokens)
    }

    const refresh = (refreshedInfo, refreshedTokens) => {
        const refreshedAccount = { info: refreshedInfo, tokens: refreshedTokens }

        localStorage.setItem('accounts', JSON.stringify(refreshedAccount))

        setAccounts(refreshedAccount)
    }

    return <GlobalContext.Provider value={{ accounts, authenticate, logout }}>
        {props.children}
    </GlobalContext.Provider>
}


export default GlobalProvider
