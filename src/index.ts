//require('dotenv').config();
//const express = require('express');
import express from "express";
import router from "./routes/main.js";
import cors from 'cors';
import morgan from "morgan";

import rutaNoEncontrada from "./middlewares/rutaNoEncontrada.js";
import manejoErrores from "./middlewares/manejoErrores.js";
import normalizarEnums from "./middlewares/normalizarEnum.js";


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(normalizarEnums);
app.use(cors());
app.use(router);
app.use(rutaNoEncontrada);
app.use(manejoErrores);
//app.get('/', (req, res) => res.json({ ok: true, data: 'API Distribuidora funcionando' }));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
//app.listen(3000, () =>{
  //  console.log('Servidor activo')
//})