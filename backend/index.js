const express = require('express');
const cors = require('cors');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rutas
const rutasCandidatos = require('./routes/candidatos');
app.use('/candidatos', rutasCandidatos);

// servidor
const PUERTO = 3000;

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});