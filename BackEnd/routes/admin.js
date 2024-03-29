const express = require('express');
const dbConexion = require('../database');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Router } = require('express');



//OBTENER ROLES PARA INSERTAR
router.get('/getRoles', async(req, res) => {
    sql = "Select * From Tipo WHERE Rol != 'Administrador'";
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

//OBTENER DEPARTAMENTOS PARA INSERTAR
router.get('/getDepartamentos', async(req, res) => {
    sql = "Select * From Departamento";
    let result = await dbConexion.Connection(sql, [], true);
    Dep = [];
    result.rows.map(us => {
        let UserSchema = {
            "id_Departamento":us[0],
            "Nombre": us[1]
        }
        Dep.push(UserSchema);
    })
    res.json(Dep);
});

//INSERTAR USUARIOS 
router.post('/insertar', async(req, res) => {
    var usuario = req.body.Nombre;
    var password = req.body.Password;
    var hahsPass = '';
    var tipo = req.body.id_Tipo;
    var departamento = req.body.id_Departamento;
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    var fechaC = hoy.toLocaleDateString();//21/10/2020
    var fecha = new Date();
    //Encriptacion
    var passH = '';
    // const hashPass = await bcrypt.hash(password,12,function(err,hash){
    //     passH = hash;
    // });
    let sql = `INSERT INTO Usuario(Nombre,Password,Fecha_Creacion,Fecha_Fin,Estado,id_Tipo,id_Puesto,id_Departamento,Entrada) 
    VALUES('${usuario}','${password}',TO_DATE('${fecha.toLocaleDateString("en-US", fechaC)}','MM/DD/YYYY'),NULL,1,${tipo},NULL,${departamento},1)`;
    console.log(sql);                 
    
    try {
        let result = await dbConexion.Connection(sql, [], true);
    } catch (error) {
        console.log(error);
    }
    
});



//OBTENER USUARIOS
router.get('/getUsuarios', async(req, res) => {
    sql = `Select * From Usuario INNER JOIN Tipo ON Tipo.id_Tipo = Usuario.id_Tipo
                WHERE Tipo.id_Tipo != 1`;
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
            "tipo":us[11]
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
    console.log(req.body);

    const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        var fechaC = hoy.toLocaleDateString();//21/10/2020
        var fecha = new Date();
        var fechaF = fecha.toLocaleDateString("en-US", fechaC);

    if(estado==1){
        sql = `UPDATE Usuario SET Nombre = '${nombre}',
            Estado = ${estado},
            Fecha_Fin = NULL
            WHERE id_Usuario= ${usuario}`;
    }else{
        sql = `UPDATE Usuario SET Nombre = '${nombre}',
            Estado = ${estado},
            Fecha_Fin = TO_DATE('${fechaF}','MM/DD/YYYY')
            WHERE id_Usuario= ${usuario}`;
    }
    
    try {
        console.log(sql);
        let result = await dbConexion.Connection(sql, [], true); 
    } catch (error) {
        console.log(error);
    }
    
});
//OBTENER PUESTOS DISPONIBLES
router.get('/getPuestos', async(req, res) => {
    //console.log(req.body);
    //const filtro = req.body.Nombre;
    var sql = ``;
    let result;
   //console.log('filtro '+filtro);
    
        sql = `Select * From Puesto INNER JOIN Departamento 
            ON Puesto.id_Departamento = Departamento.id_Departamento
            WHERE Puesto.Disponible !=0`;
        
            try {
                 result = await dbConexion.Connection(sql, [], true); 
            } catch (error) {
                console.log(error);
            }
    
        Tipo = [];
        result.rows.map(us => {
            let UserSchema = {
                "id_Puesto":us[0],
                "Nombre": us[1],
                "Salario": us[2],
                "Imagen": us[3],
                "Disponible": us[4],
                "id_Departamento": us[5],
                "NombreDep": us[7]
            }
            Tipo.push(UserSchema);
        })
        res.json(Tipo);
    
    
});

//OBTENER INVITACIONES
router.get('/getInvitaciones', async(req, res) => {
    
    var sql = ``;
    let result;
    
        sql = `SELECT NOMBRE,COUNT(ID_USUARIO) AS NO FROM INVITACION
        WHERE ROWNUM <= 5
        GROUP BY NOMBRE
        ORDER BY NO DESC`;
        
            try {
                 result = await dbConexion.Connection(sql, [], true); 
            } catch (error) {
                console.log(error);
            }
    
        Invitaciones = [];
        result.rows.map(us => {
            let UserSchema = {
                "Nombre":us[0],
                "Numero": us[1]
            }
            Invitaciones.push(UserSchema);
        })
        res.json(Invitaciones);
    
});
//OBTENER DOCUMENTOS RECHAZADOS
router.get('/getRechazos', async(req, res) => {
    
    var sql = ``;
    let result;
    
        sql = `SELECT APLICANTE.DPI,APLICANTE.NOMBRE,COUNT(APLICANTE.ID_APLICANTE) AS NO FROM APLICANTE 
        INNER JOIN USUARIO_REQUISITO ON APLICANTE.DPI = USUARIO_REQUISITO.DPI
        WHERE USUARIO_REQUISITO.ESTADO = 2 AND ROWNUM <=5
        GROUP BY APLICANTE.DPI,APLICANTE.NOMBRE
        ORDER BY NO DESC`;
        console.log(sql);
            try {
                 result = await dbConexion.Connection(sql, [], true); 
                 Rechazos = [];

                 result.rows.map(us => {
                     let UserSchema = {
                         "DPI":us[0],
                         "Nombre": us[1],
                         "Numero": us[2]
                     }
                     Rechazos.push(UserSchema);
                 })
                 res.json(Rechazos);
            } catch (error) {
                console.log(error);
            }
    
      
    
});



module.exports = router;