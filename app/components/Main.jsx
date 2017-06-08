import React from 'react'
import style from './style.css'

import Menu from './Menu/index.jsx'
import Content from './Content/index.jsx'
export default class extends React.Component {
    render() {
        return (
            <div className={style.container}>
                <Menu/>
                <Content {...this.props}/>
            </div>
        )
    }
}