import React from 'react'
import {Link,IndexLink} from 'react-router'
import NavItem from './NavItem/index.jsx'
import style from './style.css'

export default class extends React.Component {
    render(){
        return (
            <div className={style.menu}>
                {/*<div className="avatar" >
                    <img src={avatar}/>
                    <p>测试</p>
                    <p><i className="fontello icon-wechat"></i>46565</p>
                </div>*/}
                <div className={style['menu-list']}>
                    <ul>
                        <NavItem to='/' index={true} onlyActiveOnIndex>
                            <i className="fontello icon-tasks"></i>
                            清风啊啊1
                        </NavItem>
                        <NavItem to='/history'>
                            <i className="fontello icon-history"></i>
                            清风啊啊2
                        </NavItem>
                        <NavItem to='/graduation'>
                            <i className="fontello icon-graduation-cap"></i>
                            清风啊啊3
                        </NavItem>
                        {/*<li>
                            <i className="fontello icon-tasks"></i>
                            <IndexLink to="/" activeClassName={style.active}>清风啊啊1</IndexLink>
                        </li>
                        <li>
                            <i className="fontello icon-history"></i>
                            <Link to="/history" activeClassName={style.active}>清风啊啊1</Link>
                        </li>
                        <li>
                            <i className="fontello icon-graduation-cap"></i>
                            <Link to="/graduation" activeClassName={style.active}>清风啊啊1</Link>
                        </li>*/}
                    </ul>
                </div>
            </div>
        )
    }
}