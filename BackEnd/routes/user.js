const express = require('express');
const dbConexion = require('../database');
const router = express.Router();
const bcrypt = require('bcrypt');

app.post("/upload", async(req, res) => {
    const newpath = __dirname + "/files/";
    //const file = req.files.file;
    const filename = req.body.fileName;
    const extension = req.body.extension;
    const peso = req.body.peso;
    const cadena64 = req.body.cadena;
    console.log('archivo: '+filename);
    console.log('archivo: '+extension);
    console.log('archivo: '+peso);
    console.log('archivo: '+cadena64);

    // let sql = `INSERT INTO Usuario(Nombre,Password,Fecha_Creacion,Fecha_Fin,Estado,id_Tipo,id_Puesto) 
    // VALUES('${usuario}','${password}',TO_DATE('${fecha.toLocaleDateString("en-US", fechaC)}','MM/DD/YYYY'),NULL,1,${tipo},NULL)`;
    // console.log(sql);                 
    
    // try {
    //     let result = await dbConexion.Connection(sql, [], true);
    // } catch (error) {
    //     console.log(error);
    // }

  });


  module.exports = router;