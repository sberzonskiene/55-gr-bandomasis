import express from 'express';
import cors from 'cors';

import { postRegister } from './src/api/public/postRegister.js';
import { postLogin } from './src/api/public/postLogin.js';

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: 'http://localhost:5520',
}));

app.get('/', (req, res) => {
    return res.json({
        status: 'success',
        message: 'Server is running',
    });
});

app.post('/api/register', postRegister);
app.post('/api/login', postLogin);

app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send('Server error');
});

app.get('*error', (req, res) => {
    return res.json({
        status: 'error',
        message: 'No such route',
    });
});

app.listen(5519, () => {
    console.log(`Server running: http://localhost:5519`);
});