const Joke = require('../models/joke.model');

//find all jokes
module.exports.findAllJokes = (req, res) => {
    Joke.find()
        .then(jokes => {
            res.json(jokes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving jokes."
            });
        });
};

//find a joke by id
module.exports.findJokeById = (req, res) => {
    Joke.findById(req.params.jokeId)
        .then(joke => {
            if (!joke) {
                return res.status(404).send({
                    message: "Joke not found with id " + req.params.jokeId
                });
            }
            res.json(joke);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Joke not found with id " + req.params.jokeId
                });
            }
            return res.status(500).send({
                message: "Error retrieving joke with id " + req.params.jokeId
            });
        });
}

//return random joke
module.exports.findRandomJoke = (req, res) => {
    Joke.find()
        .then(jokes => {
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            res.json(randomJoke);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving jokes."
            });
        });
}

//create a new joke
module.exports.createJoke = (req, res) => {
    // Validate request
    if (!req.body.setup) {
        return res.status(400).send({
            message: "Joke setup can not be empty"
        });
    }

    if (!req.body.punchline) {
        return res.status(400).send({
            message: "Joke punchline can not be empty"
        });
    }

    // Create a Joke
    const joke = new Joke({
        setup: req.body.setup,
        punchline: req.body.punchline
    });

    // Save Joke in the database
    joke.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the joke."
            });
        });
};

//update a joke by id
module.exports.updateJokeById = (req, res) => {
    // Validate request
    if (!req.body.setup) {
        return res.status(400).send({
            message: "Joke setup can not be empty"
        });
    }

    if (!req.body.punchline) {
        return res.status(400).send({
            message: "Joke punchline can not be empty"
        });
    }

    // Find joke and update it with the request body
    Joke.findByIdAndUpdate(req.params.jokeId, {
        setup: req.body.setup,
        punchline: req.body.punchline
    }, { new: true })
        .then(joke => {
            if (!joke) {
                return res.status(404).send({
                    message: "Joke not found with id " + req.params.jokeId
                });
            }
            res.json(joke);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Joke not found with id " + req.params.jokeId
                });
            }
            return res.status(500).send({
                message: "Error updating joke with id " + req.params.jokeId
            });
        });
};

//delete a joke by id
module.exports.deleteJokeById = (req, res) => {
    Joke.findByIdAndRemove(req.params.jokeId)
        .then(joke => {
            if (!joke) {
                return res.status(404).send({
                    message: "Joke not found with id " + req.params.jokeId
                });
            }
            res.json({ message: "Joke deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Joke not found with id " + req.params.jokeId
                });
            }
            return res.status(500).send({
                message: "Could not delete joke with id " + req.params.jokeId
            });
        });
};
