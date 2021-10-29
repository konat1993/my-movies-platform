import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


// import movieTrailer from "movie-trailer"


import axios from '../../api/axios'
import requests from '../../api/requests';
import { selectIsSubscribed } from '../../features/userSlice';
import "./Row.scss"

const convertLink = (src) => src.replaceAll("watch?v=", "embed/");
export const Row = (props) => {
    const { title, fetchUrl, isLargeRow } = props

    const [movies, setMovies] = useState([])
    const [trailerLink, setTrailerLink] = useState("")

    const isSubscribed = useSelector(selectIsSubscribed)
console.log(movies)
    const fetchData = async () => {
        const request = await axios.get(fetchUrl)
        setMovies(request.data)
    }

    useEffect(() => {
        if (isSubscribed) {
            fetchData()
        }
    }, [])

    const handleClick = async (id) => {
        if (trailerLink) {
            setTrailerLink("")
        } else {
            const request = await axios.get(requests.fetchYoutubeTrailer(id))
            return setTrailerLink(convertLink(request.data.videoUrl))
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {
                    movies.items?.map(movie => (
                        movie.image && (
                            <img key={movie.id} onClick={() => handleClick(movie.id)} src={movie.image} className={`row__poster ${isLargeRow && "row__posterLarge"}`} alt="movieImage" />
                        )
                    ))
                }
            </div>

            {trailerLink && <iframe className="youtubeIframe" width="100%" height="400" src={trailerLink} frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
        </div>
    )
}

export default Row
