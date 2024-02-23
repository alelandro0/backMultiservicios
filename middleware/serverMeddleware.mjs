import cors from 'cors'
import express from 'express'
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { resolve } from 'path';

const app = express();

app.use(cors({
    origin: 'https://profound-hamster-c6ce47.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  }));
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
