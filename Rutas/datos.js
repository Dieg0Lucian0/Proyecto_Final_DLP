const express = require('express');
const dataBase = express.Router();
const dB = require('..config/database');
var enrutador = "/:id([0-9]{1,3})"

dataBase.post("/", async (req, res, next) => {
    const { user_name, user_lastname, user_phone, user_mail, user_direction} = req.body;

    if( user_name && user_lastname && user_phone && user_mail && user_direction){
        let query = "INSERT INTO datos(user_name, user_lastname, user_phone, user_mail, user_direction)";
        query += `  VALUES ('${user_name}', '${user_lastname}', ${user_phone}, '${user_phone}', '${user_direction}')`;
        const rows = await dB.query(query);

        if(rows.affectedRows == 1){
            return res.status(201).json({code:201, message: "Datos de Empleado insertados correctamente"});
        }
        return res.status(500).json({code:500, message: "Ocurrio en Error"});
    }
    return res.status(500).json({code:500, message: "Campos incompletos"});
});

dataBase.delete(enrutador, async (req, res, next) =>{
    const query = `DELETE FROM datos user_id=${req.params.id}`;
    const rows = await dB.query(query);

    if(rows.affectedRows == 1){
        return res.status(201).json({code:201, message: "Datos de Empleado borrados correctamente"});
    }
    return res.status(404).json({code:404, message: "Empleado no encontrado"});
});

dataBase.put(enrutador, async (req, res, next) =>{
    const { user_name, user_lastname, user_phone, user_mail, user_direction} = req.body;

    if( user_name && user_lastname && user_phone && user_mail && user_direction){
        let query = `UPDATE datos SET user_name='${user_name}', user_lastname='${user_lastname}', user_phone=${user_phone}, user_mail='${user_mail}', user_direction='${user_direction}' WHERE user_id=${req.params.id};`;
        const rows = await dB.query(query);

        if(rows.affectedRows == 1){
            return res.status(200).json({code:200, message: "Datos de Empleado actualizados correctamente"});
        }
        return res.status(500).json({code:500, message: "Ocurrio en Error"});
    }
    return res.status(500).json({code:500, message: "Campos incompletos"});
});

dataBase.patch(enrutador, async (req, res, next) =>{
    const { user_name, user_lastname, user_phone, user_mail, user_direction} = req.body;

    if( user_name && user_lastname && user_phone && user_mail && user_direction){
        let query = `UPDATE datos SET user_name='${user_name}', user_lastname='${user_lastname}', user_phone=${user_phone}, user_mail='${user_mail}', user_direction='${user_direction}' WHERE user_id=${req.params.id};`;
        const rows = await dB.query(query);

        if(rows.affectedRows == 1){
            return res.status(200).json({code:200, message: "Datos de Empleado actualizados correctamente"});
        }
        return res.status(500).json({code:500, message: "Ocurrio en Error"});
    }
    return res.status(500).json({code:500, message: "Campos incompletos"});
});

dataBase.get('/', async (req, res, next) => {
    const empleados = await dB.query('SELECT * FROM datos');
    return res.status(200).json({code:200, message: empleados});
});

dataBase.get(enrutador, async (req, res, next) => {
    const id = req.params.id;
    if(id>=1){
        const ID = await dB.query("SELECT * FROM datos WHERE user_id="+id+";");
        return res.status(200).json({code:200, message:ID});
    }
    return res.status(404).json({code:404, message: "Empleado no encontrado"});
});

dataBase.get('/:name([A-Za-z]+)', async(req, res, next) => {
    const name = req.params.name;
    const NAME = await dB.query("SELECT * FROM datos WHERE user_name='"+name+"';");
    if(NAME.length > 0){
        return res.status(200).json({code:200, message: NAME});
    }
    return res.status(404).json({code:404, message: "Empleado no encontrado"});
});

module.exports = dataBase;