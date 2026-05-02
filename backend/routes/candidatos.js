const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const rutaArchivo = path.join(__dirname, '../data/candidatos.json');

// leer archivo
const leerCandidatos = () => {
    const data = fs.readFileSync(rutaArchivo);
    return JSON.parse(data);
};

// guardar archivo
const guardarCandidatos = (lista) => {
    fs.writeFileSync(rutaArchivo, JSON.stringify(lista, null, 2));
};

// obtener todos los candidatos
router.get('/', (req, res) => {
    const lista = leerCandidatos();
    res.json(lista);
});

// agregar candidato
router.post('/', (req, res) => {
    const { nombre, email, telefono, puesto } = req.body;

    // validaciones básicas
    if (!nombre || !email) {
        return res.status(400).json({
            mensaje: 'Nombre y email son obligatorios'
        });
    }

    if (!email.includes('@')) {
        return res.status(400).json({
            mensaje: 'Email inválido'
        });
    }

    const lista = leerCandidatos();

    const nuevoCandidato = {
        id: Date.now(),
        nombre,
        email,
        telefono: telefono || '',
        puesto: puesto || 'No especificado',
        estado: 'postulado',
        fechaCreacion: new Date().toISOString()
    };

    lista.push(nuevoCandidato);
    guardarCandidatos(lista);

    res.status(201).json(nuevoCandidato);
});

// eliminar candidato por id
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    const lista = leerCandidatos();

    const nuevaLista = lista.filter((c) => c.id !== id);

    if (lista.length === nuevaLista.length) {
        return res.status(404).json({ mensaje: 'Candidato no encontrado' });
    }

    guardarCandidatos(nuevaLista);

    res.json({ mensaje: 'Candidato eliminado' });
});

// actualizar estado de candidato
router.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { estado } = req.body;

    const lista = leerCandidatos();

    const candidato = lista.find((c) => c.id === id);

    if (!candidato) {
        return res.status(404).json({ mensaje: 'Candidato no encontrado' });
    }

    if (!estado) {
        return res.status(400).json({ mensaje: 'Falta el estado' });
    }

    candidato.estado = estado;

    guardarCandidatos(lista);

    res.json(candidato);
});

module.exports = router;