'use strict';

const express = require('express');

// Constants
const PORT = 80;
const HOST = 'localhost';

const app = express();
app.use('/MantenimientoFront',express.static(__dirname));
app.listen(80, ()=>
    console.log(`Corriendo en: http://${HOST}:${PORT}`)
);
