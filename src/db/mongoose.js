const mongoose = require('mongoose');

const host = process.env.MONGODB_URL;

mongoose.connect(host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});