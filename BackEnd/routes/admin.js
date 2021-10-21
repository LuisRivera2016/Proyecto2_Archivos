const express = require('express');
const dbConexion = require('../database');
const router = express.Router();


router.get('/getRoles', async(req, res) => {
    sql = "Select * From Tipo";
    let result = await dbConexion.Connection(sql, [], true);
    Tipo = [];
    result.rows.map(us => {
        let UserSchema = {
            "id_Tipo":us[0],
            "Nombre": us[1]
        }
        Tipo.push(UserSchema);
    })
    res.json(Tipo);
});


router.post('/insertar', async(req, res) => {
    const usuario = req.body.Nombre;
    const password = req.body.Password;
    const tipo = req.body.id_Tipo;
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tempoTranscurrido);
    const fechaC = hoy.toLocaleDateString();

    // let sql = `INSERT INTO Usuario(Nombre,Password,Fecha_Creacion,Fecha_Fin,Estado,id_Tipo,id_Puesto) 
    //                 VALUES('${usuario}','${password}',TO_DATE(${fechaC},'MM/DD/YYYY'),${NULL},1,${tipo},0)`;
    // try {
    //     let result = await dbConexion.Connection(sql, [], true);
    // } catch (error) {
    //     console.log('Error al Insertar');
    // }
    
});

module.exports = router;