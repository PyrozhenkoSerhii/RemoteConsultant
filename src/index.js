import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import 'bootstrap/dist/css/bootstrap.css'

import './style/main.scss'
import App from './js/App'


const alertOptions = {
    offset: '50px',
    timeout: 3000,
    position: positions.TOP_CENTER,
    transition: transitions.SCALE
}


ReactDOM.render((
    <AlertProvider template={AlertTemplate}{...alertOptions}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AlertProvider>
), document.getElementById('app'))


