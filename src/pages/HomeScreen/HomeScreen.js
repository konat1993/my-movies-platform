import React from 'react'

import { Redirect } from 'react-router'

import { useSelector } from 'react-redux'
import { selectIsSubscribed } from '../../features/userSlice'

import requests from "../../api/requests"

import Nav from '../../Nav'
import Banner from '../../Banner'
import Row from '../../Row'

import "./HomeScreen.scss"
export const HomeScreen = () => {

    const isSubscribed = useSelector(selectIsSubscribed)
    console.log("isSubscribed ", isSubscribed)
    return (
        <div className="homeScreen">
            {
                !isSubscribed ? (
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
                    </>
                )
            }
        </div>
    )
}

export default HomeScreen
