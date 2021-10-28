const express = require('express');
const dbConexion = require('../database');
const router = express.Router();
const bcrypt = require('bcrypt');


//OBTENER ROLES PARA INSERTAR
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

//INSERTAR USUARIOS 
router.post('/insertar', async(req, res) => {
    var usuario = req.body.Nombre;
    var password = req.body.Password;
    var hahsPass = '';
    var tipo = req.body.id_Tipo;
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    var fechaC = hoy.toLocaleDateString();//21/10/2020
    var fecha = new Date();
    //Encriptacion
    var passH = '';
    // const hashPass = await bcrypt.hash(password,12,function(err,hash){
    //     passH = hash;
    // });
    let sql = `INSERT INTO Usuario(Nombre,Password,Fecha_Creacion,Fecha_Fin,Estado,id_Tipo,id_Puesto) 
    VALUES('${usuario}','${password}',TO_DATE('${fecha.toLocaleDateString("en-US", fechaC)}','MM/DD/YYYY'),NULL,1,${tipo},NULL)`;
    console.log(sql);                 
    
    try {
        let result = await dbConexion.Connection(sql, [], true);
    } catch (error) {
        console.log(error);
    }
    
});



//OBTENER USUARIOS
router.get('/getUsuarios', async(req, res) => {
    sql = `Select * From Usuario INNER JOIN Tipo ON Tipo.id_Tipo = Usuario.id_Tipo`;
    let result = await dbConexion.Connection(sql, [], true);
    Usuario = [];
    result.rows.map(us => {
        let UserSchema = {
            "id_Usuario":us[0],
            "Nombre": us[1],
            "Password": us[2],
            "Fecha_Creacion": us[3],
            "Fecha_Fin": us[4],
            "Estado": us[5],
            "id_Tipo": us[6],
            "id_Puesto": us[7],
            "tipo":us[9]
        }
        Usuario.push(UserSchema);
    })
    res.json(Usuario);
});

//ELIMINAR USUARIO
router.put('/eliminarUsuarios', async(req, res) => {
    const usuario = req.body.id_Usuario;
    const fechaF = req.body.fecha_fin;

    sql = `UPDATE Usuario SET Estado = 0,
            Fecha_Fin = TO_DATE('${fechaF}','MM/DD/YYYY')
    WHERE id_Usuario=${usuario}`;
    try {
        let result = await dbConexion.Connection(sql, [], true); 
    } catch (error) {
        console.log(error);
    }
    
});
//MODIFICAR USUARIO
router.put('/actualizarUsuarios', async(req, res) => {
    const usuario = req.body.id_Usuario;
    const nombre = req.body.Nombre;
    const estado = req.body.Estado;
    if(estado==1){
        sql = `UPDATE Usuario SET Nombre = '${nombre}',
            Estado = ${estado},
            Fecha_Fin = NULL,
            WHERE id_Usuario=${usuario}`;
    }else{
        sql = `UPDATE Usuario SET Nombre = '${nombre}',
            Estado = ${estado}
            WHERE id_Usuario=${usuario}`;
    }
    
    try {
        let result = await dbConexion.Connection(sql, [], true); 
    } catch (error) {
        console.log(error);
    }
    
});


module.exports = router;