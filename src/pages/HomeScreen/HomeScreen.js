import React, { useEffect } from 'react'

import requests from "../../api/requests"

import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { selectIsSubscribed, selectUser } from '../../features/userSlice'


import Nav from '../../components/Nav/Nav'
import Banner from '../../components/Banner/Banner'
import Row from '../../components/Row/Row'
import Footer from '../../components/Footer/Footer'

import "./HomeScreen.scss"
export const HomeScreen = () => {
    const isSubscribed = useSelector(selectIsSubscribed)
    const user = useSelector(selectUser)

    const navigate = useNavigate()

    useEffect(() => {
        if (user && isSubscribed === false) {
            navigate("/profile")
        }
    }, [isSubscribed])

    return (
        <div className="homeScreen">
            <Nav />
            <Banner />
            <Row
                title="Pure Flix Originals"
                fetchUrl={requests.fetchPureFlixMovies}
                isLargeRow={true}
            />
            <Row
                title="Christian Cinema Production"
                fetchUrl={requests.fetchChristianCinemaMovies}
                isLargeRow={false}
            />
            <Row
                title="Top Christian Movies"
                fetchUrl={requests.fetchTopChristianMovies}
                isLargeRow={false}
            />
            <Footer />
        </div>
    )
}

export default HomeScreen
