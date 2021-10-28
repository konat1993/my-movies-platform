import React, { useEffect, useState } from 'react'

import axios from "../../api/axios"
import requests from '../../api/requests'

import "./Banner.scss"

const inStyles = (movie) => {
    return {
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backgroundImage: `url(${movie.length !== 0 && (movie.posters.backdrops[0].link || movie.image)})`
        backgroundImage: `url(http://www.elizabethtabish.com/uploads/4/5/0/4/45043953/the-chosen-walk_1_orig.jpg)`
    }
}

export const Banner = () => {

    const [movie, setMovie] = useState([])

    const fetchData = async () => {
        const request = await axios.get(requests.fetchSpecificMovie("tt4950110"))
        setMovie(request.data)

        return request
    }

    useEffect(() => {
        //fetchData()
    }, [])
    // console.log(movie.image)

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    return (
        <header className="banner" style={inStyles(movie)}>
            <div className="banner__content">
                <h1 className="banner__title">{movie?.title || movie?.fullTitle}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">
                    {truncate(`${movie?.plot}`, 400)}
                </h1>
            </div>

            <div className="banner--fadeBottom" />
            <div className="youtubeBannerIframe__wrapper">
                <iframe className="youtubeBannerIframe" src={`https://www.youtube.com/embed/K1-FoFj8Jbo?vq=hd1080&autoplay=1&mute=1`} title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </header>
    )
}

export default Banner
