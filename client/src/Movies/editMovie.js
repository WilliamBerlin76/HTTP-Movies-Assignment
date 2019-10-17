import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const EditForm = props => {
    const [movie, setMovie] = useState(initialMovie);
    console.log(props.movies)
    useEffect(() => {
        const movieToEdit = props.movies.find(
            item => `${item.id}` === props.match.params.id
        );
        console.log(movieToEdit)    
        if (movieToEdit) setMovie(movieToEdit);
    }, []);

    const handleChange = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore'){
            value = Number(value);
        }
        setMovie({
            ...movie,
            [e.target.name]: value
        })
        console.log(movie)
    };

    const handleSubmit = e => {
        e.preventDefault()
        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            props.updateMovies(res.data);
            props.history.push('/')
        })
        .catch(err => {
            console.log('could not put', err)
        })
    }
 
    return(
        <>
        <h2>Edit Movie</h2>
        <form>
            <input 
                type='text'
                name='title'
                value={movie.title}
                onChange={handleChange}    
            />
            <input 
                type='text'
                name='director'
                value={movie.director}
                onChange={handleChange}    
            />
            <input 
                type='text'
                name='metascore'
                value={movie.metascore}
                onChange={handleChange}    
            />
            <input 
                type='text'
                name='stars'
                value={movie.stars}
                onChange={handleChange}    
            />
            <button onClick={handleSubmit}>Save Changes</button>    
        </form>
        </>
    )
}

export default EditForm;