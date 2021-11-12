import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router'

import pureFlixLogo from "../../assets/newPureFlix.png"
import { selectIsSubscribed, selectUser } from '../../features/userSlice'

import "./Nav.scss"

const styles = (user, isSubscribed) => {
    return {
        cursor: user && !isSubscribed ? "not-allowed" : "pointer"
    }
}

export const Nav = () => {
    const [show, handleShow] = useState(false)

    const user = useSelector(selectUser)
    const isSubscribed = useSelector(selectIsSubscribed)

    const navigate = useNavigate()

    const transitionNavBar = () => {
        const widthHomepage = window.innerWidth > 850 && window.scrollY > 80
        const widthProfile = window.innerWidth < 850 && window.scrollY > 25
        if (widthHomepage) {
            handleShow(true)
        } else if (widthProfile) {
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

    const logoHandleClick = () => {
        if (user && isSubscribed) {
            navigate("/")
        } else {
            return alert("You have to make a subscription first to enter movies platform!")
        }
    }
    return (
        <div className={`nav ${show && `nav__bgColorActive`}`}>
            <div className="nav__content">
                <img className="nav__logo" style={styles(user, isSubscribed)} onClick={logoHandleClick} src={pureFlixLogo} alt="logo" />
                <img className="nav__avatar" onClick={() => navigate("/profile")} src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt="avatar" />
            </div>
        </div>
    )
}

export default Nav
