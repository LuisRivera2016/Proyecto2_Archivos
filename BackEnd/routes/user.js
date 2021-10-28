const express = require('express');
const dbConexion = require('../database');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post("/upload", async(req, res) => {
    const filename = req.body.fileName;
    const extension = req.body.extension;
    const peso = req.body.peso;
    const cadena64 = req.body.cadena;
    console.log('archivo: '+filename);
    console.log('archivo: '+extension);
    console.log('archivo: '+peso);
    //console.log('archivo: '+cadena64);

    let sql = `INSERT INTO Aplicante_Documentos(Nombre,Tamano,Formato,Archivo,id_Aplicante) 
    VALUES('${filename}',${peso},${extension},${cadena64},NULL)`;
    console.log(sql);                 
    
    try {
        let result = await dbConexion.Connection(sql, [], true);
    } catch (error) {
        console.log(error);
    }

  });


  module.exports = router;