import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import 'typeface-roboto-mono'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import ReactFC from 'react-fusioncharts'
import FusionCharts from 'fusioncharts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import Widgets from 'fusioncharts/fusioncharts.widgets'

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
