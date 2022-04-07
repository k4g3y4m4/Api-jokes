const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jokes',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')
).catch(err => console.log('Something went wrong',err));