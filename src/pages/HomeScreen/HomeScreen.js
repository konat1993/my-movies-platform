import React, { useEffect } from 'react'

import { Redirect, useHistory } from 'react-router'

import { useSelector } from 'react-redux'
import { selectIsSubscribed, selectUser, setLoading } from '../../features/userSlice'

import requests from "../../api/requests"

import Nav from '../../Nav'
import Banner from '../../Banner'
import Row from '../../Row'

import "./HomeScreen.scss"
export const HomeScreen = () => {

    const isSubscribed = useSelector(selectIsSubscribed)
    const user = useSelector(selectUser)
    const isLoading = useSelector(setLoading)

    const history = useHistory()

    console.log("isSubscribed ", isSubscribed)
    console.log("user ", user)

    // useEffect(() => {
    //     if (!isLoading && user && isSubscribed) {
    //       history.push("/")
    //     } else if (!isLoading && user && !isSubscribed) {
    //       history.push("/profile")
    //     } else if (!isLoading && !user) {
    //       history.push("/login")
    //     }
    //   }, [isLoading, isSubscribed, history, user])

    // useEffect(() => {
    //     if (!isLoading && !user) {
    //         console.log("!isLoading && !user")
    //         history.push("/login")
    //     } else if (!isLoading && user && !isSubscribed) {
    //         console.log("!isLoading && user && !isSubscribed")
    //         history.push("/profile")
    //     }
    // }, [user, isLoading, history, isSubscribed])
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
