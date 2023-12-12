import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

//conectar a la base de datos
db.authenticate()
    .then( () => {
        console.log('DB conectada');
    })
    .catch( error => console.log('Error de conexion'));

//Definir el puerto
const port = process.env.PORT || 4000;

/**Middleware */

//habilitar pug
app.set('view engine', 'pug');

//obtener el anio actual
app.use((request, response, next) => {
    const year = new Date();

    response.locals.actualYear = year.getFullYear();
    response.locals.nombreSitio = 'Agencia de viajes'
    next();
})

//agregar body parser para leer los datos de un formulario 
app.use(express.urlencoded({extended: true}))

//definir la carpeta unica
app.use(express.static('public'));

//agregar router
app.use('/', router);


//correr el servidor
app.listen(port, () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})