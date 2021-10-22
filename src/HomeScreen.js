import React from 'react'

import Nav from './Nav'
import Banner from './Banner'
import Row from './Row'

import "./HomeScreen.scss"
export const HomeScreen = () => {
    return (
        <div className="homeScreen">
            <Nav />
            <Banner />
            <Row />
        </div>
    )
}

export default HomeScreen
