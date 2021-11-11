const express = require("express");
const dbConexion = require("../database");
const router = express.Router();
var nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
    service: "gmail",
    port: 2525,
    secure: false,
    auth: {
      type: "login",
      user: "TotonetSA@gmail.com",
      pass: "totonet12345", //-activar el acceso de aplicaciones no seguras a su cuenta de google
    },
  });

  //APROBAR USUARIO
router.get("/getAprobados/:departamento", async (req, res) => {
    const departamento = req.params.departamento;
    let sql,sql2 = '';
    let result;
    let result2;
    let Aprobados = [];
    let UsuariosA = [];
    let aprobado = {};
    let usuario = {};
 
    //BUSCAR APROBADOS
    sql = `SELECT USUARIO_REQUISITO.ID_USUARIO,USUARIO_REQUISITO.DPI FROM USUARIO_REQUISITO
            WHERE USUARIO_REQUISITO.ID_USUARIO NOT IN 
            (SELECT ID_USUARIO FROM USUARIO_REQUISITO
            WHERE ESTADO = 2
            GROUP BY USUARIO_REQUISITO.ID_USUARIO)
            GROUP BY USUARIO_REQUISITO.ID_USUARIO,USUARIO_REQUISITO.DPI`;
    console.log(sql);
    try {
       result = await dbConexion.Connection(sql, [], true);
      result.rows.map((us) => {
        aprobado = {
          Id_Usuario: us[0],
          DPI: us[1]
        };
        Aprobados.push(aprobado);
      });
      for (let index = 0; index < Aprobados.length; index++) {
        sql2 = `SELECT * FROM APLICANTE 
        INNER JOIN PUESTO ON APLICANTE.ID_PUESTO = PUESTO.ID_PUESTO
        INNER JOIN DEPARTAMENTO ON PUESTO.ID_DEPARTAMENTO = DEPARTAMENTO.ID_DEPARTAMENTO
        WHERE DPI = ${Aprobados[index].DPI} AND DEPARTAMENTO.ID_DEPARTAMENTO = ${departamento}`;
        console.log(sql2);
        try {
            result2 = await dbConexion.Connection(sql2, [], true);
            result2.rows.map((us) => {
                usuario = {
                  DPI: us[2],
                  Nombre:us[3],
                  Puesto:us[12],
                  Salario:us[13],
                };
                UsuariosA.push(usuario);
              });
              res.json(UsuariosA); 
        } catch (error) {
            console.log(error);
        }
    }
    } catch (error) {
      console.log(error);
    } 
  });

  //DESAPROBAR APLICANTE
router.put("/rechazarAplicante", async (req, res) => {
    //console.log(req.body);
    const dpi = req.body.dpi;
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    var fechaC = hoy.toLocaleDateString();//21/10/2020
    var fecha = new Date();

    var sql = ``;
    sql = `UPDATE USUARIO SET
    Estado = 0,
    Fecha_Fin = TO_DATE('${fecha.toLocaleDateString("en-US", fechaC)}','MM/DD/YYYY')
    WHERE DPI =  ${dpi}`;
    console.log(sql);
    try {
      let result = await dbConexion.Connection(sql, [], true);
      res.status(200).send({ status: 200, message: `Se Rechazo` });
    } catch (error) {
      console.log(error);
    }
  });

 //DESAPROBAR APLICANTE
 router.post("/contratarAplicante", async (req, res) => {
  //console.log(req.body);
  const dpi = req.body.dpi;
  const salario = req.body.salario;
  const idDepartamento = req.body.idDepartamento;

  let usuario = {};
  //OBTENER ID_USUARIO
  var sql,sql2 = ``;
  sql = `SELECT Id_Usuario FROM Usuario
  WHERE Nombre =  '${dpi}'`;
  console.log(sql);

  try {
    let result = await dbConexion.Connection(sql, [], true);
    result.rows.map((us) => {
      usuario = {
        Id_Usuario: us[0],
      };
    });
    
    sql2 = `INSERT INTO Planilla(id_Usuario,id_Departamento) 
            VALUES(${usuario.Id_Usuario},${idDepartamento})`
    console.log(sql2);
    try {
      let result2 = await dbConexion.Connection(sql2, [], true);
      res.status(200).send({ status: 200, message: `Se Contrato` });
    } catch (error) {
      console.log(error);
    }
    
  } catch (error) {
    console.log(error);
  }
});  

  //OBTENER PLANILLA DEL DEPARTAMENTO
  router.get("/getPlanilla/:idDepartamento", async (req, res) => {
    //console.log(req.body);
    const departamento = req.params.idDepartamento;
    Trabajadores = [];
    trabajador = {};
    Planilla = [];
    empleados = {};

    var sql,sql2 = ``;

    sql = `SELECT * FROM PLANILLA
            INNER JOIN USUARIO ON PLANILLA.ID_USUARIO = USUARIO.ID_USUARIO`;
    console.log(sql);
    try {
      let result = await dbConexion.Connection(sql, [], true);
      result.rows.map((us) => {
        trabajador = {
          dpi: us[4],
        };
        Trabajadores.push(trabajador);
      });
      for (let index = 0; index < Trabajadores.length; index++) {
        sql2 = `SELECT * FROM APLICANTE
        INNER JOIN PUESTO ON APLICANTE.ID_PUESTO = PUESTO.ID_PUESTO
        WHERE DPI = ${Trabajadores[index].dpi}`;
        try {
          let result2 = await dbConexion.Connection(sql2, [], true);
         result2.rows.map((us) => {
        empleados = {
          DPI: us[2],
          Nombre: us[3],
          Correo: us[5],
          Direccion: us[6],
          Telefono: us[7],
          Puesto: us[12],
          Salario: us[13]
        };
        Planilla.push(empleados);
      });
          res.json(Planilla);
        } catch (error) {
          console.log(error);
        }
        
      }
     
    } catch (error) {
      console.log(error);
    }
  });

  router.get("/getDepartamento/:idDepartamento", async (req, res) => {
    //console.log(req.body);
    const departamento = req.params.idDepartamento;
    depar = {};
  
    var sql = ``;

    sql = `SELECT NOMBRE FROM DEPARTAMENTO WHERE Id_Departamento = ${departamento}`;
    console.log(sql);
    try {
      let result = await dbConexion.Connection(sql, [], true);
      result.rows.map((us) => {
        depar = {
          Nombre: us[0]
        };
      });
      res.json(depar);
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;