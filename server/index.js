import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.json({
        status: 'succses',
        message: 'Server is running',
    })
})

app.listen(5519, () => {
    console.log(`Server running: http://localhost:5519`);    
});