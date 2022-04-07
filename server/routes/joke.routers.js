const JokeController = require('../controllers/joke.controller');

module.exports = app =>{
    app.get('/api/jokes', JokeController.findAllJokes);
    app.get('/api/jokes/:jokeId', JokeController.findJokeById);
    app.get('/api/jokes/random', JokeController.findRandomJoke);
    //post a new joke
    app.post('/api/jokes/new', JokeController.createJoke);
    //update a joke
    //app.put('/api/jokes/update/:jokeId', JokeController.updateJoke);
    //delete a joke
    //app.delete('/api/jokes/delete/:jokeId', JokeController.deleteJoke);
}