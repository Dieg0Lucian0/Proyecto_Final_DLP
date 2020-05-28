const morgan = require('morgan');
const express = require('express');
const app = express();

const datos = require('./Rutas/datos');
const usuario = require('./Rutas/usuario')

const auth = require('./Middleware/auth')
const notFound = require('./Middleware/notFound')
const indeX = require('./Middleware/indeX')
const cors = require('./Middleware/cors')

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.get('/',indeX);

app.use("/usuario", usuario);
app.use(auth);
app.use("/datos", datos)
app.use(notFound)

app.listen(process.env.PORT || 3000, () =>{
    console.log("System call suceessful....")
});