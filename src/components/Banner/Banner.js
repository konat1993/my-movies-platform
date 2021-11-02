import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { selectIsSubscribed, selectMoviesData, setMoviesData } from '../../features/userSlice'

import axios from "../../api/axios"
import requests from '../../api/requests'

import "./Banner.scss"

const customMoviesList = ["tt2528814", "tt1630036", "tt2872518", "tt7522002", "tt4902904", "tt9471404", "tt9471404", "tt9471404", "tt1129423", "tt9471404"]
const convertLink = (src) => src?.replaceAll("watch?v=", "embed/").concat("?autoplay=1&mute=1");

const inStyles = (movie) => {
    return {
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backgroundImage: `url(${movie.length !== 0 && (movie.posters.backdrops[0].link || movie.image)})`
        backgroundImage: `url(${movie?.details?.length !== 0 && (movie?.details?.posters?.backdrops[0]?.link || movie?.details?.images?.items[0].image)})`
        // backgroundImage: `url(http://www.elizabethtabish.com/uploads/4/5/0/4/45043953/the-chosen-walk_1_orig.jpg)`
    }
}

export const Banner = () => {

    const dispatch = useDispatch()
    const isSubscribed = useSelector(selectIsSubscribed)
    const moviesData = useSelector(selectMoviesData)

    useEffect(() => {
        if (isSubscribed && !moviesData?.bannerMoviesData) {
            fetchData()
        }
    }, [isSubscribed])

    const fetchData = async () => {
        const getRandomMovies = customMoviesList[Math.floor(Math.random() * customMoviesList.length)]
        const request = await axios.get(requests.fetchSpecificMovie(getRandomMovies))
        const youtubeRequest = await axios.get(requests.fetchYoutubeTrailer(getRandomMovies))

        return dispatch(setMoviesData({
            bannerMoviesData: {
                details: request.data,
                trailer: convertLink(youtubeRequest.data.videoUrl)
            }
        }))
    }

    const truncate = (string, n) => {
        if (moviesData?.bannerMoviesData) {
            return string?.length > n ? string.substr(0, n - 1) + '...' : string
        }
    }
    return (
        <>
            <header className="banner" style={inStyles(moviesData?.bannerMoviesData)}>
                <div className="banner__content">
                    <h1 className="banner__title">{moviesData?.bannerMoviesData?.details?.title || moviesData?.bannerMoviesData?.details?.fullTitle}</h1>
                    <div className="banner__buttons">
                        <button className="banner__button">My list</button>
                        <button className="banner__button">Related movies</button>
                    </div>
                    <h1 className="banner__description">
                        {truncate(`${moviesData?.bannerMoviesData?.details?.plot}`, 400)}
                    </h1>
                </div>

                <div className="banner--fadeBottom" />
            </header>
            <iframe className="youtubeBannerIframe" src={moviesData?.bannerMoviesData?.trailer} title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </>
    )
}

export default Banner
