const express = require('express');
require('./db/mongoose');
const usersRoutes = require('./routes/user');
const tasksRoutes = require('./routes/task');

const app = express();

app.use(express.json());

app.use(usersRoutes);
app.use(tasksRoutes);

module.exports = app;