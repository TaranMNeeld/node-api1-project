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
            res.json(err);
        });
});

server.post('/api/users', (req, res) => {
    const userData = req.body;
    if (!userData) {
        res.status(400).json({ message: 'name not found' });
    } else {
        db.insert(userData)
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                res.json({ message: 'user must have a name and bio' });
            });
    }
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.json(err);
        });
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.json(err);
        });
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.json(err);
        });
})

const port = 5000;
server.listen(port, () => console.log('\nserver running\n'));