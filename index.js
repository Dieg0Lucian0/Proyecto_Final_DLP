const express = require('express');
const morgan = require('morgan');
const dataBase = express();

const admin = require('./Routes/admin');
const empleadosDB = require('./Routes/empleadosDB');

const auth = require('./middleware/auth');
const cors = require('./middleware/cors');
const indeX = require('./middleware/indeX');
const notFound = require('./middleware/notFound')

dataBase.use(cors)
dataBase.use(morgan('dev'));
dataBase.use(express.json());
dataBase.use(express.urlencoded({ extended : true}));

dataBase.get('/', indeX);
dataBase.use("/admin", admin);
dataBase.use(auth);
dataBase.use('/empleadosDB', empleadosDB);
dataBase.use(notFound);

dataBase.listen(process.env.PORT || 3000, () => {
    console.log("System call successful....");
});


