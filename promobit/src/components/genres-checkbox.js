import React from 'react';
import styled from 'styled-components';

const CheckBoxContainer = styled.div`
    padding: 5px;
    margin: 5px;
    border-radius: 5px;
    box-shadow: 3px 1px 1px black;
   display: inline-block;
    >label,input {
        &:hover {
            cursor: pointer;
            transform: scale(1.05);
        }
    };
    background-color: ${props => props.checked ? '#97C160' : '#E5E5E5'};
`;

const Container = styled.div`
    display: grid;
    padding: 10px;
    grid-template-columns: repeat(7, 1fr);
    justify-content: center;
`;

export const GenresCheckboxes = ({ genres, onChange }) => {

    const onCheckboxChange = (e) => {
        onChange(e.target.value);
        console.log(e.target.value)
    }

    return (
        <Container>
            {genres.map((genre, index) => {
                return (
                    <CheckBoxContainer key={index}>
                        <input type="checkbox" checked={genre.selected} id={genre.name} value={genre.id} onChange={onCheckboxChange} />
                        <label for={genre.name}>{genre.name}</label>
                    </CheckBoxContainer>
                )
            })}
        </Container>
    )
}   