const express = require('express');
const Task = require('../models/task');
const auth = require('../middlewares/auth');

const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        task.save();

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true' ? true : false;
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? - 1 : 1;
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();

        res.json(req.user.tasks);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});

        if (!task) {
            return res.status(404).send();
        }

        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const fields = Object.keys(req.body);
    const allowedFields = ['description', 'completed'];
    const isValidOperation = fields.every(field => allowedFields.includes(field));

    if (!isValidOperation) {
        return res.status(400).json({error: 'Invalid update'});
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});

        if (!task) {
            return res.status(404).send();
        }

        for (let field of fields) {
            task[field] = req.body[field];
        }

        await task.save();

        res.json(task);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});

        if (!task) {
            return res.status(404).send();
        }

        res.json(task);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;