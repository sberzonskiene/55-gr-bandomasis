import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { postPublicRegister } from './src/api/public/postRegister.js';
import { postPublicLogin } from './src/api/public/postLogin.js';
import { getLogin } from './src/api/public/getLogin.js';
import { cookieParser } from './src/middleware/cookieParser.js';
import { userData } from './src/middleware/userData.js';
import { postAdminContainers } from './src/api/admin/containers/postContainers.js';
import { isAdmin } from './src/middleware/isAdmin.js';
import { getPublicContainers } from './src/api/public/getContainers.js';
import { getAdminContainers } from './src/api/admin/containers/getContainers.js';
import { isPublic } from './src/middleware/isPublic.js';
import { putAdminContainers } from './src/api/admin/containers/putContainers.js';
import { deleteAdminContainers } from './src/api/admin/containers/deleteContainers.js';
import { getPublicBoxes } from './src/api/public/getBoxes.js';
import { getAdminBoxes } from './src/api/admin/boxes/getBoxes.js';
import { postAdminBoxes } from './src/api/admin/boxes/postBoxes.js';
import { putAdminBoxes } from './src/api/admin/boxes/putBoxes.js';
import { deleteAdminBoxes } from './src/api/admin/boxes/deleteBoxes.js';
import { FILE_SIZE_LIMIT, PORT } from './src/env.js';
import { uploadBoxThumbnailImage } from './src/middleware/uploadBoxThumbnail.js';
import { postImageUpload } from './src/api/admin/boxes/postImageUpload.js';
import { formatFileSize } from './src/lib/formatFileSize.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(helmet());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5530',
}));
app.use(cookieParser);
app.use(userData);

app.get('/', (req, res) => {
    return res.json({
        status: 'success',
        message: 'Server is running',
    });
});

app.post('/api/register', isPublic, postPublicRegister);
app.post('/api/login', isPublic, postPublicLogin);

app.get('/api/containers', getPublicContainers);
app.get('/api/boxes', getPublicBoxes);

app.get('/api/login', isAdmin, getLogin);

app.get('/api/admin/containers', isAdmin, getAdminContainers);
app.post('/api/admin/containers', isAdmin, postAdminContainers);
app.put('/api/admin/containers/:original_url', isAdmin, putAdminContainers);
app.delete('/api/admin/containers/:url', isAdmin, deleteAdminContainers);

app.get('/api/admin/boxes', isAdmin, getAdminBoxes);
app.post('/api/admin/boxes', isAdmin, postAdminBoxes);
app.put('/api/admin/boxes/:original_url', isAdmin, putAdminBoxes);
app.delete('/api/admin/boxes/:url', isAdmin, deleteAdminBoxes);

app.post('/api/admin/upload-image', isAdmin, uploadBoxThumbnailImage.single('img'), postImageUpload);

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

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});