import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types"
import {cn as bem} from "@bem-react/classname"
import './style.css'

const Nav = ({ setPage}) => {
  const cn = bem('Nav')

  return (
    <div className={cn()}>
      <Link to={'/'} className={cn('link-home')} onClick={() => setPage(1)}>
        Главная
      </Link>
    </div>
  )
}

Nav.propTypes = {
  setPage: PropTypes.boolean,
}
Nav.defaultProps = {
  setPage: () => {},
}
export default Nav