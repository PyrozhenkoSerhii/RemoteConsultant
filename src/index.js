import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import 'bootstrap/dist/css/bootstrap.css'

import './style/main.scss'
import App from './js/App'


const alertOptions = {
    offset: '50px',
    timeout: 3000,
    position: "top center"
}


ReactDOM.render((
    <AlertProvider template={AlertTemplate}{...alertOptions}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AlertProvider>
), document.getElementById('app'))


