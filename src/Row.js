import axios from './api/axios'
import React, { useEffect, useState } from 'react'

import "./Row.scss"
export const Row = (props) => {
    const { title, fetchUrl, isLargeRow } = props

    const [movies, setMovies] = useState([])

    const fetchData = async () => {
        const request = await axios.get(fetchUrl)
        setMovies(request.data)
        console.log(request)
    }

    useEffect(() => {
        //fetchData()
    }, [])

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {
                    movies.items?.map(movie => (
                        movie.image && (
                            <img key={movie.id} src={movie.image} className={`row__poster ${isLargeRow && "row__posterLarge"}`} alt="movieImage" />
                        )
                    ))
                }
            </div>
        </div>
    )
}

export default Row
