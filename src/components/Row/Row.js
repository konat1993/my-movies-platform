import React, { useEffect, useState } from 'react'


// import movieTrailer from "movie-trailer"


import axios from '../../api/axios'
import "./Row.scss"

const convertLink = (src) => src.replaceAll("watch?v=", "embed/");
export const Row = (props) => {
    const { title, fetchUrl, isLargeRow } = props

    const [movies, setMovies] = useState([])
    const [trailerLink, setTrailerLink] = useState("")

    const fetchData = async () => {
        const request = await axios.get(fetchUrl)
        setMovies(request.data)
        console.log(request)
    }

    useEffect(() => {
        fetchData()
    }, [])

    // const handleClick = async (id) => {
    // if (trailerLink) {
    //     setTrailerLink("")
    // } else {
    //     const request = await axios.get("https://imdb-api.com/API/YouTubeTrailer/k_svdcp329/tt0411008")
    //     // return console.log("request ", request.data.videoUrl)
    //     return setTrailerLink(convertLink(request.data.videoUrl))
    // }
    // }

    // useEffect(async () => {
    //     if (trailerLink) {
    //         setTrailerLink("")
    //     } else {
    //         const request = await axios.get(`https://imdb-api.com/API/YouTubeTrailer/k_h106awpe/tt6054650`)
            // return console.log("request ", request.data.videoUrl)
            // return setTrailerLink(convertLink(request.data.videoUrl))
    //     }
    // }, [])
    const handleClick = async (movie) => {
        if (trailerLink) {
            setTrailerLink("")
        } else {
            const request = await axios.get(`https://imdb-api.com/API/YouTubeTrailer/k_h106awpe/tt6054650`)
            console.log("request ", request)
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

            {trailerLink && <iframe className="youtubeIframe" width="100%" height="400" src={trailerLink} frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
        </div>
    )
}

export default Row
