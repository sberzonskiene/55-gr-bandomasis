import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.json({
        status: 'succses',
        message: 'Server is running',
    })
})

app.listen(3002, () => {
    console.log(`Server running: http://localhost:3002`);    
});