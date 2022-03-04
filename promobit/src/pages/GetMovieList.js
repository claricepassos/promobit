/* import react, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'


const Conteiner = styled.div`
font-size: 20px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 10px;
line-height: 1.5;
font-weight: 500;
`

const Title = styled.div`
font-size: 50px;
`

export const GetMovieList = () => {
    const [gender, setGender] = useState([])

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

    useEffect(()=>{
        getGenders()
    }, [])

    const mapGenreIdsToNames = (ids) => {
        const names = ids.map(id => {
            const namedGenre = gender.genres.find(namedGenre => namedGenre.id === id);
            return namedGenre.name;
        });
        return names;
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

    return(
        <Conteiner>
            <Title><b>Filter movie by gender</b></Title>
            {renderMovieGenderList}
        </Conteiner>
    )

} */