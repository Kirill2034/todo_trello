const express = require('express');
const { Client } = require('pg')
const config = require('./config');
const cors = require('cors');
const uuid = require('uuid');

const app = express();

const client = new Client(config)

app.use(cors());
app.use(express.json());

const publicUrls = ['/api/login', '/api/register'];

const authMiddleware = async (req, res, next) => {
    if (publicUrls.indexOf(req.originalUrl) !== -1) {
        next()
    } else {
        const token = req.header('Authorization');
    
        if (!token) {
            res.sendStatus(401);
        } else {
            try {
                const result = await client.query(QUERES.GET_USER_ID_BY_TOKEN(token));

                res.locals.userId = result.rows[0].user_id

                next();
            } catch (e) {
                res.sendStatus(400);
            }
        }

    }
};

app.use(authMiddleware)

const QUERES = {
    CREATE_TOKEN: ({ userId, value }) => ({
        text: 'INSERT INTO tokens (value, user_id) VALUES($1, $2)',
        values: [value, userId],
    }),
    CREATE_USER: ({ firstName, lastName, login, password }) => ({
        text: 'INSERT INTO users (first_name, last_name, login, password) VALUES($1, $2, $3, $4)',
        values: [firstName, lastName, login, password],
    }),
    CREATE_TODO: ({name, createdDate, userId}) => ({
        text: 'INSERT INTO todos (name, created_date, user_id) VALUES ($1, $2, $3)',
        values: [name, createdDate, userId]
    }),
    GET_TODOS_BY_USER_ID: (userId) => ({
        text: 'SELECT * FROM todos WHERE user_id=$1',
        values: [userId]
    }),
    GET_USER_BY_LOGIN_AND_PASSWORD: ({ login, password }) => ({
        text: 'SELECT * FROM users WHERE login=$1 and password=$2',
        values: [login, password],
    }),
    GET_USER_ID_BY_TOKEN: (token) => ({
        text: 'SELECT user_id FROM tokens WHERE value=$1',
        values: [token]
    }),
    DELETE_TODO_BY_ID: (id) => ({
        text: 'DELETE FROM todos WHERE id=$1',
        values: [id]
    }),
    GET_TODO_BY_ID: (id) => ({
        text: 'SELECT * FROM todos WHERE id=$1',
        values: [id]
    }),
    UPDATE_TODO_BY_ID: (id, {done}) => ({
        text: 'UPDATE todos SET done=$1 WHERE id=$2',
        values: [done, id]
    }),
    DELETE_TOKEN_BY_USER_ID: (userId) => ({
        text: 'DELETE FROM tokens WHERE user_id=$1',
        values: [userId]
    })
}

app.post('/api/register', async (req, res) => {
    try {
        await client.query(QUERES.CREATE_USER(req.body));
        res.sendStatus(201);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const result = await client.query(QUERES.GET_USER_BY_LOGIN_AND_PASSWORD(req.body));

        const user = result.rows[0];

        if (!user) {
            res.sendStatus(404);
        } else {
            const token = uuid.v4();

            await client.query(QUERES.CREATE_TOKEN({ userId: user.id, value: token }));

            res.send(token);
        }
    } catch (e) {
        res.status(400).send(e);
    }
});

app.post('/api/todos', async (req, res) => {
 try {

     const todo = {
         createdDate: new Date().toISOString(),
         ...req.body,
         userId: res.locals.userId
     }
    await client.query(QUERES.CREATE_TODO(todo))
    res.sendStatus(201);
 } catch (e) {
     res.status(400).send(e);
 }
});

app.get('/api/todos', async (req, res) => {
    try {

        
        const todos = await client.query(QUERES.GET_TODOS_BY_USER_ID(res.locals.userId));

        res.send(todos.rows);

    } catch (e) {
        res.status(400).send(e);
    }

});

app.delete('/api/todos/:id', async (req, res) => {
    try {

        const todoResult = await client.query(QUERES.GET_TODO_BY_ID(req.params.id));

        const todoUserId = todoResult.rows[0].user_id;

        if (res.locals.userId === todoUserId) {
            await client.query(QUERES.DELETE_TODO_BY_ID(req.params.id));

            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }

    } catch (e) {
        res.status(400).send(e)
    }
});

app.put('/api/todos/:id', async (req, res) => {
    try {

        const todoResult = await client.query(QUERES.GET_TODO_BY_ID(req.params.id));

        const todoUserId = todoResult.rows[0].user_id;

        if (res.locals.userId === todoUserId) {

            await client.query(QUERES.UPDATE_TODO_BY_ID(req.params.id, req.body));

            const updatedTodoResult = await client.query(QUERES.GET_TODO_BY_ID(req.params.id));

            res.send(updatedTodoResult.rows[0]);

        } else {
            res.sendStatus(403);
        }

        await client.query(QUERES.UPDATE_TODO)

    } catch (e) {
        res.status(400).send(e)
    }
});

app.delete('/api/logout', async (req, res) => {
    try {
        await client.query(QUERES.DELETE_TOKEN_BY_USER_ID(res.locals.userId));
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(400);
    }
})

function init() {
    client.connect();

    app.listen(3001, () => {
        console.log('Started')
    })
}

init();