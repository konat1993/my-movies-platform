import axios from 'axios'
import React, {useEffect, useState} from 'react'

import "./Row.scss"
export const Row = (props) => {
    const { title, fetchUrl, isLargeRow } = props

    const [movies, setMovies] = useState([])

    const fetchData = async () => {
        const request = await axios.get(fetchUrl)
        setMovies(request.data)
    }

    console.log(movies)

    useEffect(() => {
       fetchData()
    }, [])

    return (
        <div className="row">
            <h2>{title}</h2>
        </div>
    )
}

export default Row
