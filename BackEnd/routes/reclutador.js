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
router.get("/getAplicantes/:idDep", async (req, res) => {
  let result;
  const idDepartamento = req.params.idDep;
  sql = `SELECT * FROM APLICANTE
    INNER JOIN PUESTO ON APLICANTE.ID_PUESTO = PUESTO.ID_PUESTO
    INNER JOIN DEPARTAMENTO ON PUESTO.ID_DEPARTAMENTO = DEPARTAMENTO.ID_DEPARTAMENTO
    WHERE DEPARTAMENTO.ID_DEPARTAMENTO = ${idDepartamento}`;
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
        Puesto: us[12],
      };
      Usuario.push(UserSchema);
    });
  }

  res.json(Usuario);
});

//OBTENER PUESTOS
router.get("/getPuestos", async (req, res) => {
  let result;
  sql = `SELECT * FROM PUESTO`;
  console.log(sql);
  try {
    result = await dbConexion.Connection(sql, [], true);
  } catch (error) {
    console.log(error);
  } finally {
    Puestos = [];
    result.rows.map((us) => {
      let UserSchema = {
        Nombre: us[1],
        Salario: us[2],
      };
      Puestos.push(UserSchema);
    });
  }

  res.json(Puestos);
});

//-------END POINT CORREO
router.post("/enviarCorreo", async function (req, res) {
  const puesto = req.body.Puesto;
  const correo = req.body.Correo;
  const message = {
    from: "TotonetSA@gmail.com", // direccion que colocaron en el transport
    to: `${correo}`, // direccion a la que van a enviar el correo
    subject: "INVITACION A PUESTO EN TOTONET S.A", // asunto del correo
    text: `TE INVITAMOS A QUE APLIQUES AL SIGUIENTE PUESTO:
                 ${puesto}
          PUEDE QUE SEA DE TU INTERES`, // contenido
  };

  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ status: 200, message: `Invitacion Enviada` });
    }
  });
});

//INSERTAR INVITACION
router.post("/insertarInvitacion", async function (req, res) {
  const puesto = req.body.Puesto;
  const dpi = req.body.DPI;
  const nombre = req.body.Nombre;
  const idUsuario = req.body.Usuario;
  var sql = ``;
  sql = `INSERT INTO INVITACION(Puesto_Enviado,DPI_APlicante,Nombre,id_Usuario) 
        VALUES('${puesto}',${dpi},'${nombre}',${idUsuario})`;
  console.log(sql);
  try {
    let result = await dbConexion.Connection(sql, [], true);
    res.status(200).send({ status: 200, message: `Insert` });
  } catch (error) {
    console.log(error);
  }
  
});

module.exports = router;
