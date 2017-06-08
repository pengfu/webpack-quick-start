import React from 'react'
import {Router,hashHistory} from 'react-router'
import routerConfig from './routerConfig'

export default ()=>(
    <Router history={hashHistory} routes={routerConfig}>
    </Router>
)
