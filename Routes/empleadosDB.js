const express = require('express');
const empDB = express.Router();
const db = require('../baseDeDatos/baseDeDatos');

empDB.get('/allEmp', async (req, res, next) => {
    const data = await db.query(`SELECT * FROM empleados`);
    return res.status(200).json({code:200, message: data});
});

empDB.post('/addEmp', async (req, res, next) => {
    const {emp_name, emp_lastname, emp_phone, emp_mail, emp_direction} = req.body;
    if(emp_name && emp_lastname && emp_phone && emp_mail && emp_direction){
        let query = "INSERT INTO empleados(emp_name, emp_lastname, emp_phone, emp_mail, emp_direction)";
        query += `  VALUES ('${emp_name}', '${emp_lastname}', ${emp_phone}, '${emp_direction}')`;
        const rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(201).json({code:200, message: "Empleado agregado correctamente"});
        }
        return res.status(404).json({code:404, message: "Ocurrio un error"});
    }
    return res.status(500).json({code:500, message: "Campos incompletos"});
});

empDB.put('/modifyEmp', async (req, res, next) => {
    const {emp_name, emp_lastname, emp_phone, emp_mail, emp_direction} = req.body
    const rows = await db.query(query);

    if(emp_name && emp_lastname && emp_phone && emp_mail && emp_direction){
        let query = `UPDATE empleados SET emp_name='${emp_name}', emp_lastname='${emp_lastname}', emp_phone=${emp_phone}, emp_mail='${emp_mail}', emp_direction='${emp_direction}' WHERE emp_name='${req.params.name}';`;
        if(rows.affectedRows == 1){
            return res.status(200).json({code:200, message: "Datos de empleado modificados correctamente"});
        }
        return res.status(500).json({code:500, message: "Ocurrio un error"});
    }
    return res.status({code:500, message: "Campos incompletos"}); 
});

empDB.get('/searchEmp', async (req, res, next) => {
    const {emp_name} = req.body
    if(emp_name){
        const data = `SELECT * FROM empleados WHERE emp_name='${emp_name}';`;
        rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(200).json({code:200, message: data});
        }
        return res.status(200).json({code:500, message: "Ocurrio un error"});
    }
    return res.status({code:401, message: "Empleado no encontrado"});   
});

empDB.delete('/deleteEmp', async (req, res, next) => {
    const {emp_name} = req.body
    if(emp_name){
        const data = `DELETE * FROM empleados WHERE emp_name='${emp_name}';`;
        rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(200).json({code:200, message: data})
        }
        return res.status(200).json({code:500, message: "Ocurrio un error"});
    }
    return res.status(200).json({code:401, message: "Empleado no encontrado"});  
});

module.exports = empDB;