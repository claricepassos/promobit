import React from "react"
import { useHistory } from "react-router"

export const goToDetailPage = (history, id) =>{
    history.push (`/movies/${id}`)
}

export const goToMoviePage = (history) =>{
    history.push ("/movies")
}