import express from 'express';
import analyzeRouter from './Routes/analyze.route';
import cors from 'cors'

const app = express()
const PORT = 3000;

app.use(cors())
app.use(express.json());
app.use(express.text());
app.use(analyzeRouter)

app.listen(PORT, () => {
    console.log(`Server is running at Port: ${PORT}`);
})