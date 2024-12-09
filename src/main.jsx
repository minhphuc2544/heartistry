import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import "./index.css"

import App from './App.jsx'
import Menu from './Menu.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Menu />
    <App />
  </BrowserRouter>
)