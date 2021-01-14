import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [movies, setMovies] = useState([{
    title: '',
    genre: '',
    year: ''
  }]);

  const [movie, setMovie] = useState({
    title: '',
    genre: '',
    year: ''
  });

  useEffect(() => {
    fetch('/movies').then(res => {
      if (res.ok) {
        return res.json();
      }
    }).then(jsonRes => setMovies(jsonRes));
  });

  const deleteMovie = (id) => {
    axios.delete(`/delete/${id}`);
    alert("movie deleted");
  }

  const addMovie = e => {
    e.preventDefault();
    alert('movie added');
    const newMovie = {
      title: movie.title,
      genre: movie.genre,
      year: movie.year
    }

    axios.post('/newmovie', newMovie);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setMovie(prevInput => {
      return (
        {
          ...prevInput,
          [name]: value
        }
      )
    })
  }

  return (
    <div className="App">
      <h1>Add Movie</h1>
      <form>
        <input onChange={handleChange} name="title" value={movie.title} />
        <input onChange={handleChange} name="genre" value={movie.genre} />
        <input onChange={handleChange} name="year" value={movie.year} />
        <button onClick={addMovie}>Add Movie</button>
      </form>
      {movies.map(movie => {
        return (
          <div>
            <h1>{movie.title}</h1>
            <h1>{movie.genre}</h1>
            <h1>{movie.year}</h1>
            <button onClick={() => deleteMovie(movie._id)}>Delete</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
