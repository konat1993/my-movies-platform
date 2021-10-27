import React from 'react'

import { Redirect } from 'react-router'

import { useSelector } from 'react-redux'
import { selectIsSubscribed, selectUser } from '../../features/userSlice'

import requests from "../../api/requests"

import Nav from '../../Nav'
import Banner from '../../Banner'
import Row from '../../Row'

import "./HomeScreen.scss"
export const HomeScreen = () => {

    const isSubscribed = useSelector(selectIsSubscribed)
    const user = useSelector(selectUser)

    return (
        <div className="homeScreen">
            {
                user && !isSubscribed ? (
                    <Redirect to="/profile" />
                ) : (
                    <>
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
                    </>
                )
            }
        </div>
    )
}

export default HomeScreen
