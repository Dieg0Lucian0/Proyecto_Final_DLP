const express = require('express');
const admin = express.Router();
const db = require('../baseDeDatos/baseDeDatos');
const jwt = require('jsonwebtoken');

admin.post("/login", async (req ,res, next) => {
    const { admin_mail, admin_password} = req.body;
    const query = `SELECT * FROM administradores WHERE admin_mail = '${admin_mail}' AND admin_password = '${admin_password}';`;
    const rows = await db.query(query);

    if(admin_mail && admin_password){
        if(rows.length == 1){
            const token = jwt.sign({
                admin_id: rows[0].admin_id,
                admin_mail: rows[0].admin_mail,
            }, "debugkey");
            console.log(admin_mail)
            return res.status(200).json({code:200, message: token});
        }
        else{
            return res.status(200).json({code:401, message: "Usuario y/o contraseña no encontrados"});
        }
    }
    return res.status(200).json({code:500, message: "Campos incompletos"});
});

admin.get("/", async (req, res, next) => {
    const query = `SELECT * FROM administradores`;
    const rows = await db.query(query);
    
    return res.status(200).json({code:200, message: rows});
});

module.exports = admin;