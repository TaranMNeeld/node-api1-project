const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." });
        });
});

server.post('/api/users', (req, res) => {
    const userData = req.body;
    if (!userData.name || !userData.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
        db.insert(userData)
            .then(user => {
                res.status(201).json({ message: `Created ${userData.name}` });
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the user to the database" });
            });
    }
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(404).json({ error: "The user information could not be retrieved." });
    } else {
        db.findById(id)
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                res.status(500).json({ error: "The user information could not be retrieved." });
            });
    }
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(404).json({ error: "The user information could not be retrieved." });
    } else {
        db.remove(id)
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                res.status(500).json({ error: "The user could not be removed" });
            });
    }
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (!id) {
        res.status(404).json({ error: "The user information could not be retrieved." });
    } else if (!changes.name || !changes.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
        db.update(id, changes)
            .then(user => {
                res.status(201).json({ message: `Updated ${changes.name}` });
            })
            .catch(err => {
                res.status(500).json({ error: "The user information could not be modified." });
            });
    }
})

const port = 5000;
server.listen(port, () => console.log('\nserver running\n'));