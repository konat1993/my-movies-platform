//const TD_DB_API_KEY = "0eb75ac1a5ca1601bee3e4fb2a4a7d3b"
const IM_DB_API_KEY = "k_svdcp329"
const IM_DB_API_KEY2 = "k_h106awpe"
const IM_DB_API_KEY3 = "k_wpa5j156"

const requests = {
    fetchPureFlixMovies: `/Company/${IM_DB_API_KEY2}/co0193544`,
    fetchChristianCinemaMovies: `/Company/${IM_DB_API_KEY2}/co0059221`,
    fetchTopChristianMovies: `/IMDbList/${IM_DB_API_KEY2}/ls555894106`,
    fetchYoutubeTrailer: (id) =>  `/YouTubeTrailer/k_wpa5j156/${id}`,
    fetchSpecificMovie: (id = "tt6054650") => {
        return `/Title/${IM_DB_API_KEY2}/${id}/Posters`
    },
}

export default requests