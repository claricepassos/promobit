import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router"
import { useHistory } from "react-router"
import { goToMoviePage } from "../route/Coordinator"
import styled from 'styled-components'

const MovieCard = styled.div`
display: flex;
line-height: 1.5;
flex-direction: column;
margin-right: auto;
margin-left: auto;
padding: 10px;
width: 400px;

img{height: 300px;
    width: fit-content;
    margin-right: auto;
margin-left: auto;
}
`
const Title = styled.div`
font-size: 20px;
padding: 10px;
margin-right: auto;
margin-left: auto;
`
const Detail = styled.div`
text-align: justify;
`

const ButtonConteiner = styled.div`
text-align: center;

`

const Conteiner = styled.div`
max-height: 100vh;
box-sizing: border-box;
`

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: #1F1D36;
  border: 2px solid black;
`

export const GetMoviesById = () => {
    const params = useParams()

    const [movieDetail, setMovieDetail] = useState({})

    const getDetails = () => {
        axios
            .get(`
        https://api.themoviedb.org/3/movie/${params.id}?api_key=0eea3eb3c8fbe9525011d7bc4400e0b6&language=en-US
            `)
            .then((res) => {
                setMovieDetail(res.data)
            }).catch((err) => {
                console.log("Erro", err.response)
            });
    }


    useEffect(() => {
        getDetails()
    }, []);

    const history = useHistory()

    const onClickButton = () => {
        goToMoviePage(history)
    }

    const number = movieDetail.budget

    const movieBudget = (new Intl.NumberFormat().format(number));

    const movieGenres = movieDetail.genres

    const renderMovieGenres = movieGenres && movieGenres.map((i) => {
        return (<div key={i.id}>{i.name}</div>)
    })

    const convertedTime = () => {
        const runtime = movieDetail && movieDetail.runtime
        const hours = Math.floor(runtime / 60);          
        const minutes = runtime % 60;

        return `${hours} h ${minutes} min`
    }

    return (
        <Conteiner>
            <MovieCard>
                <img src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`} />
                <Title><b>{movieDetail.title}</b></Title>
                <div><b>Budget: </b>US$ {movieBudget}</div>
                {renderMovieGenres && <div><b>Movie Genres:</b> {renderMovieGenres[0]} {renderMovieGenres[1]} {renderMovieGenres[2]}</div>}
                <Detail><b>Movie Detail:</b>{movieDetail.overview}</Detail>
                <div><b>Status:</b>{movieDetail.status}</div>
                <div><b>Tagline:</b>{movieDetail.tagline}</div>
                <div><b>Runtime:</b>{convertedTime()}</div>
                <div><b>Vote Average:</b>{movieDetail.vote_average}</div>
            </MovieCard>
            <ButtonConteiner>
                <Button onClick={() => onClickButton(history)}>Voltar</Button>
            </ButtonConteiner>
        </Conteiner>
    )
}