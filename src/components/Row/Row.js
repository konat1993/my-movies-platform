import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import xIcon from "../../assets/xIcon.png"


// import movieTrailer from "movie-trailer"


import axios from '../../api/axios'
import requests from '../../api/requests';
import { selectIsSubscribed, selectMoviesData, setMoviesData } from '../../features/userSlice';
import "./Row.scss"

const convertLink = (src) => src.replaceAll("watch?v=", "embed/");
export const Row = (props) => {
    const { title, fetchUrl, isLargeRow } = props

    const [trailerLink, setTrailerLink] = useState("")

    const moviesData = useSelector(selectMoviesData)
    const isSubscribed = useSelector(selectIsSubscribed)
    const dispatch = useDispatch()

    const fetchData = async () => {
        const request = await axios.get(fetchUrl)

        dispatch(setMoviesData({
            [title]: request.data,
        }))
    }
    useEffect(() => {
        if (isSubscribed && !moviesData?.[title]) {
            fetchData()
        }
    }, [isSubscribed])

    const handlePlayClick = async (id) => {
        if (trailerLink) {
            setTrailerLink("")
        } else {
            const request = await axios.get(requests.fetchYoutubeTrailer(id))
            return setTrailerLink(convertLink(request.data.videoUrl))
        }
    }
    // const handlePlayClick = () => {
    //     console.log("appear")
    //     if (trailerLink) {
    //         setTrailerLink("")
    //     } else {
    //         setTrailerLink("https://www.youtube.com/embed/2HXYmDsGhV0?autoplay=1&mute=1")
    //     }
    // }
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {
                    moviesData?.[title]?.items?.map(movie => (
                        movie.image && (
                            <img key={movie.id} onClick={() => handlePlayClick(movie.id)} src={movie.image} className={`row__poster ${isLargeRow && "row__posterLarge"}`} alt="movieImage" />
                        )
                    ))
                }
            </div>
            {trailerLink && <div className="row__iframeWrapper" onClick={handlePlayClick}>
                <iframe className="youtubeIframe" width="100%" height="400" src={trailerLink} frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <img src={xIcon} alt="xIcon" className="xIcon" />
            </div>}
        </div>
    )
}

export default Row
