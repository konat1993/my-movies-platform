import React, { useState, useEffect } from 'react'

import pureFlixLogo from "./assets/newPureFlix.png"

import "./Nav.scss"
export const Nav = () => {

    const [show, handleShow] = useState(false)

    const transitionNavBar = () => {
        if(window.scrollY > 120) {
            handleShow(true)
        } else {
            handleShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll",
        transitionNavBar)
        return () => window.removeEventListener("scroll", transitionNavBar)
    }, [])

    return (
        <div className={`nav ${show && `nav__bgColorActive`}`}>
            <div className="nav__content">
            <img className="nav__logo" src={pureFlixLogo} alt="logo" />
            <img className="nav__avatar" src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt="avatar" />
            </div>
        </div>
    )
}

export default Nav
