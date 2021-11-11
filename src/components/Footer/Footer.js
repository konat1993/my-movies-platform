import React from 'react'

import { AiOutlineCopyright, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import pureFlixImg from "../../assets/pureFlixImg.png"

import "./Footer.scss"
export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__left">
                <AiOutlineCopyright />
                <h3>2021</h3>
                <p>My-movies-platform</p>
            </div>

            <div className="footer__middle">

                <img src={pureFlixImg} alt="pureFlixImg" />
            </div>
            <div className="footer__right">

                <a href="https://github.com/konat1993" rel="noopener noreferrer" target="_blank">
                    <AiFillGithub size="28" />
                </a>
                <a href="https://www.linkedin.com/in/lukasz-konatowski" rel="noopener noreferrer" target="_blank">

                    <AiFillLinkedin size="28" />
                </a>
            </div>
        </div>
    )
}

export default Footer
