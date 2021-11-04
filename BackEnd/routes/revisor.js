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

//OBTENER USUARIOS
router.get("/getUsuarios/:idUser", async (req, res) => {
  let result;
  const idUsuario = req.params.idUser;
  sql = `SELECT * FROM APLICANTE 
            INNER JOIN REVISION ON REVISION.ID_APLICANTE = APLICANTE.ID_APLICANTE
            INNER JOIN Usuario ON USUARIO.ID_USUARIO = REVISION.ID_USUARIO
            WHERE USUARIO.ID_USUARIO = ${idUsuario}`;
  console.log(sql);
  try {
    result = await dbConexion.Connection(sql, [], true);
  } catch (error) {
    console.log(error);
  } finally {
    Usuario = [];
    result.rows.map((us) => {
      let UserSchema = {
        id_Aplicante: us[0],
        Estado: us[1],
        DPI: us[2],
        Nombre: us[3],
        Apellido: us[4],
        Correo: us[5],
        Direccion: us[6],
        Telefono: us[7],
        Entrada: us[8],
        Curriculum: us[9],
        Id_Puesto: us[11],
        Id_Revision: us[12],
        Estado_Revision: us[13],
        Id_Usuario: us[14],
      };
      Usuario.push(UserSchema);
    });
  }

  res.json(Usuario);
});

//------------------------------CORREO
//-------END POINT CORREO
router.post("/enviarcorreo", async function (req, res) {
  const message = {
    from: "TotonetSA@gmail.com", // direccion que colocaron en el transport
    to: "luisi.najera@gmail.com", // direccion a la que van a enviar el correo
    subject: "PRUEBA CORREO", // asunto del correo
    text: `FELICIDADES HASSIDO ACEPTADO EN EL PUESTO`, // contenido
  };

  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
});

//APROBAR USUARIO
router.post("/aprobarAplicante", async (req, res) => {
  const usuario = req.body.id_Aplicante;
  let resultDatos;
  let datosU = {};
  //Fecha
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  var fechaC = hoy.toLocaleDateString(); //21/10/2020
  var fecha = new Date();
  //Contrasena
  var randomPassword = Math.random().toString(36).slice(-8);
  //APROBAR APLICANTE
  sql = `UPDATE Aplicante SET Estado = 1 
            WHERE id_Aplicante = ${usuario}`;
  console.log(sql);
  try {
    let result = await dbConexion.Connection(sql, [], true);
  } catch (error) {
    console.log(error);
  } finally {
    sql2 = `SELECT DPI,Id_Puesto,Correo FROM Aplicante WHERE id_Aplicante = ${usuario}`;
    console.log(sql2);
    try {
      resultDatos = await dbConexion.Connection(sql2, [], true);
    } catch (error) {
      console.log(error);
    } finally {
      resultDatos.rows.map((us) => {
        datosU = {
          DPI: us[0],
          Id_Puesto: us[1],
          Correo: us[2]
        };
      });
      sql3 = `INSERT INTO Usuario(Nombre,Password,Fecha_Creacion,Fecha_Fin,Estado,id_Tipo,id_Puesto,id_Departamento,Entrada)
      VALUES('${
        datosU.DPI
      }','${randomPassword}',TO_DATE('${fecha.toLocaleDateString(
        "en-US",
        fechaC
      )}','MM/DD/YYYY'),NULL,1,5,${datosU.Id_Puesto},NULL,0)`;
      console.log(sql3);
      try {
        let resultU = await dbConexion.Connection(sql3, [], true);
      } catch (error) {
        console.log(error);
      } finally {
        const message = {
          from: "TotonetSA@gmail.com", // direccion que colocaron en el transport
          to: `${datosU.Correo}`, // direccion a la que van a enviar el correo
          subject: "APLICACION A PUESTO TOTONET S.A", // asunto del correo
          text: `FELICIDADES HAS SIDO ACEPTADO EN EL PUESTO QUE APLICASTE
                  ESTAS SON TUS CREDENCIALES INGRESA PARA CONTINUAR CON EL PROCESO
                  User: ${datosU.DPI} Password: ${randomPassword}`, // contenido
        };

        transport.sendMail(message, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send({ status: 200, message: `Usuario Aceptado` });
          }
        });
      }
    }
  }
});

module.exports = router;
