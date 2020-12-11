import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import "./header.css"

const Header = ({ siteTitle }) => (
  <>
    <header className="header">
      <Link className="header__title" to="/">
        <h1>{siteTitle}</h1>
      </Link>
      <p>Version 0.0.3</p>
    </header>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
