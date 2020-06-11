const express = require('express');
const empDB = express.Router();
const db = require('../baseDeDatos/baseDeDatos');

empDB.post("/addEmp", async (req,res,next) => {
    const { emp_name, emp_lastname, emp_phone, emp_mail, emp_direction} = req.body;

    console.log("si llego");
    
    if(emp_name && emp_lastname && emp_phone && emp_mail && emp_direction){
        let query = "INSERT INTO empleados(emp_name, emp_lastname, emp_phone, emp_mail, emp_direction)";
        query += `  VALUES ('${emp_name}', '${emp_lastname}', ${emp_phone}, '${emp_mail}', '${emp_direction}');`;
        const rows = await db.query(query);

        console.log(rows);

        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Empleado registrado correctamente"});
        }
        
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

empDB.delete("/deleteEmp", async (req, res, next) => {
    const { emp_name } = req.body;

    const query = `DELETE FROM empleados WHERE emp_name='${emp_name}';`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado borrado correctamente"});
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

empDB.put("/modifyEmp", async (req, res, next) => {
    const { emp_name, emp_lastname, emp_phone, emp_mail, emp_direction} = req.body;
    
    if(emp_name && emp_lastname && emp_phone && emp_mail && emp_direction){
        let query = `UPDATE empleados SET emp_name='${emp_name}', emp_lastname='${emp_lastname}', emp_phone=${emp_phone}, emp_mail='${emp_mail}',  emp_direction='${emp_direction}' WHERE emp_name='${emp_name}';`;
        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Empleado modificado correctamente"});
        }
        
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(400).json({code: 400, message: "Campos incompletos"});
});

empDB.get('/allEmp', async (req, res, next) => {
    const all = await db.query('SELECT * FROM empleados');
    return res.status(200).json({code: 200, message: all});
});

empDB.get('/searchEmp', async (req,res,next) => {
    const { emp_name } = req.body;
    const NAME = await db.query(`SELECT * FROM empleados WHERE emp_name='${emp_name}';`);
    if (NAME.length > 0) {
        return res.status(200).json({code: 200, message: NAME});
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

module.exports = empDB;