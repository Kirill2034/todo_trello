const express = require('express');
const { Client } = require('pg')
const config = require('./config');
const cors = require('cors');
const uuid = require('uuid');

const app = express();

const client = new Client(config)

app.use(cors());
app.use(express.json());

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
    const token = req.header('Authorization');
    
    const result = await client.query(QUERES.GET_USER_ID_BY_TOKEN(token));

    const userId =  result.rows[0].user_id;
    console.log(userId)

     const todo = {
         createdDate: new Date().toISOString(),
         ...req.body,
         userId
     }
    await client.query(QUERES.CREATE_TODO(todo))
    res.sendStatus(201);
 } catch (e) {
     res.status(400).send(e);
 }
});

app.get('/api/todos', async (req, res) => {
    try {
        const token = req.header('Authorization');

        const result = await client.query(QUERES.GET_USER_ID_BY_TOKEN(token));

        const userId =  result.rows[0].user_id;

        const todos = await client.query(QUERES.GET_TODOS_BY_USER_ID(userId))

        res.send(todos.rows);

    } catch (e) {
        res.status(400).send(e);
    }

});

// app.post('/api/create', async (req, res) => {

// })

app.get('/', (req, res) => {
    res.send('Hello world')
})

function init() {
    client.connect();

    app.listen(3001, () => {
        console.log('Started')
    })
}

init();

// users
// id, first_name, last_name, login, password

// todo
// id, title, description, done, user_id