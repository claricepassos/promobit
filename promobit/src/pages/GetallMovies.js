import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import { goToDetailPage } from '../route/Coordinator';
import moment from 'moment';
import { GenresCheckboxes } from '../components/genres-checkbox';
import { useRequestData } from '../hooks/useRequestData'

const Conteiner = styled.div`
` 


const MovieCard = styled.div`
display: grid;
margin-top: -10px;
margin-left: 35px;
margin-right: auto;
padding: 10px;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
img{
    height: 300px;
    border: solid black;
};
&:hover{
    cursor: pointer;
};
`

const CardVote = styled.div`
    width: 50px;
    height: 50px;
    position: relative;
    margin-left: 170px;
    margin-top: -40px;
    text-align: center;
    justify-content: center;
    background-color: mintcream;
    color: black;
    font-weight: 600;
    border-radius: 50%;
    display: flex;
    flex-wrap: wrap;`

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

const ButtonConteiner = styled.div`
   text-align: center;
`

export const GetAllMovies = () => {
    const [movies, setMovies] = useState([])

    let [page, setPage] = useState(1)

    const [genresResponse, genresLoading, genresError] = useRequestData(`    https://api.themoviedb.org/3/genre/movie/list?api_key=0eea3eb3c8fbe9525011d7bc4400e0b6`);

    const [genres, setGenres] = useState([])

    const history = useHistory()


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


    const clickCard = (id) => {
        goToDetailPage(history, id)
    }

    const onChangeCheckbox = (id) => {
        const newGenres = genres.map(genre => {
            if(genre.id == id) {
                return genre.selected ? 
                    { ...genre, selected: false } : { ...genre, selected: true };
            }
            return genre;
        });
        setGenres(newGenres);
    }

    useEffect(() => {
        if(genresResponse) {
            const newGenres = genresResponse && genresResponse.genres.map(genre => ({...genre, selected: true}));
            setGenres(newGenres);
        }
    }, [genresResponse]);

    const filterMovieByGenre = (movie) => {
        const ids = movie.genre_ids;
        let selected = false;
        ids.forEach(id => {
            const genreObject = genres.find(genre => genre.id === id);
            if(genreObject.selected) selected = true;
        });
        return selected;
    }

    const renderMovies = genresResponse && movies.filter(filterMovieByGenre).map((i) => {
        return (

            <div onClick={() => clickCard(i.id)}>
                <img src={`https://image.tmdb.org/t/p/w500/${i.poster_path}`} />
                <CardVote><p>{i.vote_average}</p></CardVote>
              <p>{i.original_title}</p>
                <p><b>Data de Lançamento:</b> {moment(`${i.release_date}`).format("DD/MM/YYYY")}</p>
            </div>
        )
    })



    return (
        <Conteiner>
            <GenresCheckboxes genres={genres} onChange={onChangeCheckbox}/>
            <MovieCard>{renderMovies}</MovieCard>
            <ButtonConteiner>
                <Button onClick={() => handlePageChangeIncrement(page)}>Ir para a próxima página</Button>
                <Button onClick={() => handlePageChangeDecrement(page)}>Ir para a página anterior</Button>
            </ButtonConteiner>
        </Conteiner>
    )
}



