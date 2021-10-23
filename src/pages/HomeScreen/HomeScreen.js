import React from 'react'

import requests from "../../api/requests"

import Nav from '../../Nav'
import Banner from '../../Banner'
import Row from '../../Row'

import "./HomeScreen.scss"
export const HomeScreen = () => {
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
                isLargeRow={true}
            />
            {/* <Row
                title="LATER"
                fetchUrl={requests.fetchPureFlixMovies}
                isLargeRow
                />
            <Row
                title="LATER"
                fetchUrl={requests.fetchPureFlixMovies}
                isLargeRow
            />
            <Row
                title="LATER"
                fetchUrl={requests.fetchPureFlixMovies}
                isLargeRow
            />
            <Row
                title="LATER"
                fetchUrl={requests.fetchPureFlixMovies}
                isLargeRow
            />
            <Row
                title="LATER"
                fetchUrl={requests.fetchPureFlixMovies}
                isLargeRow
            /> */}
        </div>
    )
}

export default HomeScreen