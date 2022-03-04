import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import { goToDetailPage } from '../route/Coordinator';


const MovieCard = styled.div`
display: grid;
margin-top: 25px;
margin-left: 35px;
margin-right: auto;
padding: 10px;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
img{
    height: 300px;
    border: solid black;
}
`

export const GetAllMovies = () => {
    const [movies, setMovies] = useState([])
    let [page, setPage] = useState(1)
    const [gender, setGender] = useState([])

    console.log(gender)

    const getGenders = () => {
        axios
            .get(`
            https://api.themoviedb.org/3/genre/movie/list?api_key=0eea3eb3c8fbe9525011d7bc4400e0b6&language=en-US
            `)
            .then((res) => {
                setGender(res.data.genres)
            }).catch((err) => {
                console.log("Erro", err.response)
            });
    }

    useEffect(() => {
        getGenders()
    }, [])


    const getMovies = () => {
        axios
            .get(`https://api.themoviedb.org/3/movie/popular?api_key=0eea3eb3c8fbe9525011d7bc4400e0b6&page=${page}`)
            .then((res) => {
                setMovies(res.data.results)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    const handlePageChangeIncrement = () => {
        setPage(page + 1)
    }

    const handlePageChangeDecrement = () => {
        setPage(page - 1)
    }


    useEffect(() => {
        getMovies()
    }, [page])

    const history = useHistory()

    const clickCard = (id) => {
        goToDetailPage(history, id)
    }



    const mapGenreIdsToNames = (ids) => {
        const names = ids.map(id => {
            const namedGenre = gender.genres.find(namedGenre => namedGenre.id === id);
            console.log(namedGenre)
            console.log('imprime', id)
            return namedGenre.name;
        });
        return names;
    }




    const renderMovies = movies && movies.map((i)  => {
        return (

            <div onClick={() => clickCard(i.id)}>
                <img src={`https://image.tmdb.org/t/p/w500/${i.poster_path}`} />
                <p>{i.original_title}</p>
          {/*       <p>{mapGenreIdsToNames(i.genre_ids)}</p> */}
            </div>
        )
    })

    return (
        <div>
            <button onClick={() => handlePageChangeIncrement(page)}>Ir para a próxima página</button>
            <button onClick={() => handlePageChangeDecrement(page)}>Ir para a página anteior</button>
            <MovieCard>{renderMovies}</MovieCard>
        </div>
    )
}



