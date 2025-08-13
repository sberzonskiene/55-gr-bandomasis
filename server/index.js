import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { postRegister } from './src/api/public/postRegister.js';
import { postLogin } from './src/api/public/postLogin.js';
import { getLogin } from './src/api/public/getLogin.js';
import { cookieParser } from './src/middleware/cookieParser.js';
import { userData } from './src/middleware/userData.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: 'http://localhost:5520',
}));
app.use(cookieParser);
app.use(userData);

app.get('/', (req, res) => {
    return res.json({
        status: 'success',
        message: 'Server is running',
    });
});

app.post('/api/register', postRegister);

app.post('/api/login', postLogin);
app.get('/api/login', getLogin);

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