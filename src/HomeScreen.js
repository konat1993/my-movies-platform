import React from 'react'

import requests from "./api/requests"

import Nav from './Nav'
import Banner from './Banner'
import Row from './Row'

import "./HomeScreen.scss"
export const HomeScreen = () => {
    return (
        <div className="homeScreen">
            <Nav />
            <Banner />
            <Row
                title="Pure Flix Originals"
                fetchUrl={requests.fetchPureFlixMovies}
                isLargeRow
            />
            <Row
                title="Most Popular Movies"
                fetchUrl={requests.fetchMostPopularMovies}
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
            />
            <Row
                title="LATER"
                fetchUrl={requests.fetchPureFlixMovies}
                isLargeRow
            />
        </div>
    )
}

export default HomeScreen
