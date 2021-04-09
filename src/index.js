require('dotenv').config(); // leer archivo de variables de entorno
const morgan = require('morgan');
const express = require('express');
const cors = require('cors')
const app = express();

// configuracion
require('./database'); // conexion a la bd
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); // entender inputs 
app.use(express.json()); // recibir y entender json
app.use(cors())

// rutas
app.use('/', require('./routes/index'))
app.use('/api/users', require('./routes/users'));

// servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor en puerto: ${app.get('port')}`);
});