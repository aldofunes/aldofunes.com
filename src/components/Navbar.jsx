import Link from 'gatsby-link'
import React from 'react'
import github from '../img/github-icon.svg'

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link
          to="/"
          className="is-size-3 has-text-weight-bold navbar-item has-text-primary is-uppercase is-marginless is-paddingless"
        >
          Aldo Funes
        </Link>
      </div>
      <div className="navbar-start">
        <Link className="navbar-item" to="/about">
          About
        </Link>
        <Link className="navbar-item" to="/portfolio">
          Portfolio
        </Link>
      </div>
      <div className="navbar-end">
        <a
          className="navbar-item"
          href="https://github.com/aldofunes/aldofunes.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <img src={github} alt="Github" />
          </span>
        </a>
      </div>
    </div>
  </nav>
)

export default Navbar
