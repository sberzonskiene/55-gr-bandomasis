import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.json({
        status: 'succses',
        message: 'Server is running',
    })
})

app.listen(3006, () => {
    console.log(`Server running: http://localhost:3006`);    
});