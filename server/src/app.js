import express, { json } from 'express';
import cors from 'cors';

import 'dotenv/config';
import cookieParser from 'cookie-parser'

// Routes
import { signaturesRouter } from './routes/signatures';

// Global Var
const PORT = process.env.PORT || 5000;
const app = express();


// Usage
app.use(cors({
    origin: '*'
}));
app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());


// Body
app.get('/', async (req, res) => {
    res.send('Index End-Point');
});

app.use('/signature', signaturesRouter);

app.listen(PORT, () => {
    console.log('Server is started!');
    console.log('For start in NGROK: <ngrok start --all>');
    console.log('yml-file in C:/Users/fedor/AppData/Local/ngrok');
    console.log(`http://localhost:${PORT}\n`);
});