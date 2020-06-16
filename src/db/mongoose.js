const mongoose = require('mongoose');

const host = process.env.MONGODB_URL;
const dbname = 'task-manager-api';

mongoose.connect(`${host}/${dbname}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});