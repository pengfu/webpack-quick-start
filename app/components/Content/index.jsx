/**
 * Add transition when link switched.
 */
import React from 'react'
import style from './style.css'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
const transitionDuration = 300;
const transitionEnterTimeout = 2 * transitionDuration;
export default class extends React.Component {
    render(){
        return (
            <div className={style.content}>
                <div className={style['content-title']}>实例概述</div>
                <CSSTransitionGroup
                    component="div"
                    className="transition-group"
                    transitionName="repo"
                    transitionEnterTimeout={transitionEnterTimeout}
                    transitionLeaveTimeout={transitionDuration}>
                    {
                        React.cloneElement(this.props.children,{ key: this.props.location.pathname })}
                </CSSTransitionGroup >

            </div>
        )

    }
}