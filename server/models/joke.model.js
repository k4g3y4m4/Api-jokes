const mongoose = require('mongoose');

const jokeSchema = new mongoose.Schema(
{
    setup:{ 
        type: String,
        required: [true, 'Joke setup is required'],
        minlength: [10, 'Joke setup must be at least 10 characters long']
    },
    punchline:{
        type: String,
        required: [true, 'Joke punchline is required'],
        minlength: [3, 'Joke punchline must be at least 3 characters long']
    }
});

const Joke = mongoose.model('Joke', jokeSchema);

module.exports = Joke;
