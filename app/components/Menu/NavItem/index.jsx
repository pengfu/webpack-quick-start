import React from 'react'
import PropTypes from 'prop-types'
import { Link, IndexLink } from 'react-router'
import style from './style.css'

class NavItem extends React.Component {
    render () {
        const { router } = this.context
        const { index, onlyActiveOnIndex, to, children } = this.props

        const isActive = router.isActive(to, onlyActiveOnIndex)
        const LinkComponent = index ? Link : IndexLink

        return (
            <li className={isActive ? style.active : ''}>
                <LinkComponent {...this.props}>{children}</LinkComponent>
            </li>
        )
    }
}
NavItem.contextTypes = {
    router:PropTypes.object
}
export default NavItem