import 'dotenv/config'; 
import express from 'express';
import morgan from 'morgan';
import DatabaseFactory from './config/databaseFactory.js';
import personRoute from './rotas/personRoute.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import NodeCache from 'node-cache';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: ['http://127.0.0.1:5500','http://localhost:5500', 'http://localhost:8088', 'http://127.0.0.1:8088'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-KEY', 'X-Requested-With', 'X-Custom-Header'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const database = DatabaseFactory.createDatabase(process.env);

const myCache = new NodeCache({ stdTTL: 10000 });

app.get('/getCEP/:cep', async (req, res) => {
    const cep = req.params.cep;

    try {
        let data;
        if (myCache.has(cep)) {
            data = myCache.get(cep);
            data.tipo = 'cache';
        } else {
            const url = `https://viacep.com.br/ws/${cep}/json/`;
            const response = await axios.get(url);
            data = response.data;
            data.tipo = 'get';
            myCache.set(cep, data); 
        }

        return res.json({ data, success: 1 });
    } catch (error) {
        console.error('Erro:', error);
        return res.json({ data: "Erro Inesperado: " + error.message, success: 0 });
    }
});

database.connect().then(() => {
    const personRoutes = new personRoute(database);
    app.use('/index.php', personRoutes.router);

    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}).catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
});