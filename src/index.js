const express = require('express');
require('./db/mongoose');
const Task = require('./models/task');
const usersRoutes = require('./routes/user');
const tasksRoutes = require('./routes/task');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(usersRoutes);
app.use(tasksRoutes);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});