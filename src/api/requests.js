//const TD_DB_API_KEY = "0eb75ac1a5ca1601bee3e4fb2a4a7d3b"
const IM_DB_API_KEY = "k_svdcp329"
const IM_DB_API_KEY2 = "k_h106awpe"

const requests = {
    fetchPureFlixMovies: `/Company/${IM_DB_API_KEY}/co0193544`,
    fetchChristianCinemaMovies: `/Company/${IM_DB_API_KEY}/co0059221`,
    fetchTopChristianMovies: `/IMDbList/${IM_DB_API_KEY}/ls555894106`,
    fetchSpecificMovie: (id = "tt6054650") => {
        console.log("id ", id)
        return `/Title/${IM_DB_API_KEY2}/${id}/Posters,Images,Trailer`
        // return
    },

    // fetchActionMovies: `/discover/movie?api_key=${IM_DB_API_KEY}&with_genres=28`,
    // fetchComedyMovies: `/discover/movie?api_key=${IM_DB_API_KEY}&with_genres=35`,
    // fetchHorrorMovies: `/discover/movie?api_key=${IM_DB_API_KEY}&with_genres=27`,
    // fetchRomanceMovies: `/discover/movie?api_key=${IM_DB_API_KEY}&with_genres=10749`,
    // fetchDocumentaries: `/discover/movie?api_key=${IM_DB_API_KEY}&with_genres=99`
}

export default requests