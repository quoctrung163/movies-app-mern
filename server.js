const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// connect to mongo
mongoose.connect("mongodb+srv://quoctrung163:qtrung12345678@cluster0.k00qa.mongodb.net/moviesDB?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

// data schema and model
const movieSchema = {
  title: String,
  genre: String,
  year: String
};

const Movie = mongoose.model("Movie", movieSchema);

// api routes
app.get('/movies', (req, res) => {
  Movie.find().then(movies => res.json(movies));
});

// add movie
app.post('/newmovie', (req, res) => {
  const { title, genre, year } = req.body;

  const newMovie = new Movie({
    title,
    genre,
    year
  });

  newMovie.save();
});

// delete movie
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  Movie.findByIdAndDelete({ _id: id }, (err) => {
    if (!err) {
      console.log("Movie deleted");
    } else {
      console.log(err);
    }
  })
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(port, () => console.log(`server is running at ${port}`));