const express = require("express");
const dbConexion = require("../database");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/aplicar", async (req, res) => {
  const newpath = __dirname + "/files/";
  const NombreA = req.body.Nombre;
  const ApellidoA = req.body.Apellido;
  const DPIA = req.body.DPI;
  const CorreoA = req.body.Correo;
  const DireccionA = req.body.Direccion;
  const TelefonoA = req.body.Telefono;
  const fileA = req.files.file;
  const fileName = fileA.name;
  const fileSize = req.files.size;
  console.log("Nombre: " + NombreA);
  console.log("Apellido: " + ApellidoA);
  console.log("DPI: " + DPIA);
  console.log("FileN: " + fileName);

  //     Extension: getFileExtension(name),
  //     Peso: files[i].size/1048576,
  const nombreCV = `CV-${DPIA}`;
  console.log(nombreCV);

  fileA.mv(`${newpath}${nombreCV}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
  });
  // let sql = `INSERT INTO Aplicante_Documentos(Nombre,Tamano,Formato,Archivo,id_Aplicante)
  // VALUES('${filename}',${peso},${extension},${cadena64},NULL)`;
  // console.log(sql);

  // try {
  //     let result = await dbConexion.Connection(sql, [], true);
  // } catch (error) {
  //     console.log(error);
  // }
  res.status(200).send({ message: "Se envio", code: 200 });
});

router.get("/getCalificacion/:idPuesto", async (req, res) => {
  //console.log(req.body);
  const puesto = req.params.idPuesto;
  var sql = ``;
  console.log(puesto);
  //console.log('filtro '+filtro);

  sql = `SELECT CAST(AVG(estrella.CALIFICACION) AS DECIMAL(10,2)) AS Calificacion FROM (SELECT CALIFICACION FROM PUESTO_CALIFICACION
    WHERE Id_Puesto = ${puesto})estrella`;

  try {
    let result = await dbConexion.Connection(sql, [], true);
    console.log(result);
    Estrellas = [];
    result.rows.map((us) => {
      let UserSchema = {
        calificacion: us[0],
      };
      Estrellas.push(UserSchema);
    });
    res.json(...Estrellas);
  } catch (error) {
    console.log(error);
  }
});

router.post("/insertCalificacion", async (req, res) => {
  //console.log(req.body);
  const idPuesto = req.body.Puesto;
  const calificacion = req.body.Calificacion;
  
  var sql = ``;
  sql = `INSERT INTO Puesto_Calificacion(id_Puesto,Calificacion) VALUES(${idPuesto},${calificacion})`;
  console.log(sql);
  try {
    let result = await dbConexion.Connection(sql, [], true);

  } catch (error) {
    console.log(error);
  }
  res.status(200).send({status: 200,message:`Insert`});
});

module.exports = router;
