import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider as AlertProvider } from "react-alert"
import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from 'redux-persist/lib/integration/react'
import AlertTemplate from "react-alert-template-basic"

import './style/main.scss'
import { store, persistor } from './js/redux/store'
import App from './js/App'
import LoadingView from './js/LoadingView'


const alertOptions = {
    offset: '50px',
    timeout: 3000,
    position: "top center"
}


ReactDOM.render((
    <ReduxProvider store={store}>
        <PersistGate persistor={persistor} LoadingView={<LoadingView />}>
            <AlertProvider template={AlertTemplate}{...alertOptions}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AlertProvider>
        </PersistGate>
    </ReduxProvider>
), document.getElementById('app'))


