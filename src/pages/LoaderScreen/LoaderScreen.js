import React from 'react'

import logoStudio from "../../assets/logoStudio.png"

import "./LoaderScreen.scss"
const Loader = () => {
    return (
        <div className="loaderScreen">
            <div className="loaderScreen__wrapper">
                <img src={logoStudio} alt="logoStudio" />
                <p>Loading...</p>
            </div>
        </div>
    )
}

export default Loader
