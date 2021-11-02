import React, { useEffect } from 'react'

import requests from "../../api/requests"

import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { selectIsSubscribed, selectUser } from '../../features/userSlice'


import Nav from '../../components/Nav/Nav'
import Banner from '../../components/Banner/Banner'
import Row from '../../components/Row/Row'

import "./HomeScreen.scss"
export const HomeScreen = () => {
    const isSubscribed = useSelector(selectIsSubscribed)
    const user = useSelector(selectUser)
    const history = useHistory()
    useEffect(() => {
        if (user && isSubscribed === false) {
            history.push("/profile")
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
        </div>
    )
}

export default HomeScreen
