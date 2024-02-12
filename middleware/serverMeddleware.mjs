import cors from 'cors'
import express from 'express'
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { resolve } from 'path';

const app = express();
const corsOption={
    origin: "https://dainty-baklava-d89b97.netlify.app",
    credentials:true
}

app.use(cors(corsOption));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve(import.meta.url, '..', 'front', 'dist')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ message: 'Sintaxis JSON no válida' });
    }
    next();
});
export default app;
