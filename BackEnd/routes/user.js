const express = require("express");
const dbConexion = require("../database");
const router = express.Router();
const bcrypt = require("bcrypt");
//REGISTRAR APLICANTE A PUESTO
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

//GET CALIFICACION DEL PUESTO
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

//INSERTAR  CALIFICACION
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

//INSERTAR REVISION
router.post("/insertarRevision", async (req, res) => {
  const DPI = req.body.dpi;
  const idDepartamento = req.body.departamento;
  let resultUsuario;
  let resultUsuario2;
  let resultAPlicante;
  let resultUsuarioD;
  let aplicante = {};
  let usuario = {};

  //SABER USUARIO MINIMO
  let sqlU = `SELECT Id_Usuario FROM Usuario
              WHERE Id_Usuario NOT IN (SELECT ID_USUARIO FROM REVISION GROUP BY ID_USUARIO)
             AND Id_Departamento = ${idDepartamento} AND Id_Tipo = 4 AND ROWNUM  = 1`;

  try {
    resultUsuarioD = await dbConexion.Connection(sqlU, [], true);
  } catch (error) {
    console.log(error);
  }finally{
    if(resultUsuarioD.rows != 0){
      //OBTENER APLICANTE
      resultUsuarioD.rows.map((us) => {
        usuario = {
          id_Usuario: us[0]
        };
      });
      let sql = `SELECT Id_Aplicante FROM APlicante WHERE DPI= ${DPI}`;
      try {
        console.log(sql);
        resultAPlicante = await dbConexion.Connection(sql, [], true);
      } catch (error) {
        console.log(error);
      }finally{
        resultAPlicante.rows.map((us)=>{
          aplicante = {
            id_Aplicante: us[0]
          }
        })
        //INSERTAR REVISION
        let sql4 = `INSERT INTO Revision(Estado_Revision,id_Usuario,Id_Aplicante) 
                      VALUES(0,${usuario.id_Usuario},${aplicante.id_Aplicante})`;
          console.log('INSERT R: '+sql4);
          try {
            let resultF = await dbConexion.Connection(sql4, [], true);
          } catch (error) {
            console.log(error);
          }finally{
            res.status(200).send({ message: "Se Inserto", code: 200 });
          }

      }

    }else{
      let sql2 = `SELECT conteo.Id_Usuario FROM (SELECT Id_Usuario,COUNT(Id_Usuario)as cont FROM Revision
  GROUP BY Id_Usuario)conteo
  INNER JOIN USUARIO ON USUARIO.Id_Usuario = conteo.Id_Usuario
  WHERE conteo.cont = (
  SELECT MIN(conteo.cont) FROM (
  SELECT Id_Usuario,COUNT(Id_Usuario)as cont FROM Revision
  GROUP BY Id_Usuario)conteo)
  AND USUARIO.Id_Departamento = ${idDepartamento}`;
  console.log(sql2);

  try {
    resultUsuario = await dbConexion.Connection(sql2, [], true);
  } catch (error) {
    console.log(error);
  } finally {
    if (resultUsuario.rows == 0) {
      console.log("NO hay revisiones");
      let sql3 = `SELECT Id_Usuario FROM Usuario WHERE id_Departamento = ${idDepartamento} 
                      AND id_Tipo = 4 AND ROWNUM  = 1`;
      
      try {
        resultUsuario2 = await dbConexion.Connection(sql3, [], true);
      } catch (error) {
        console.log(error);
      }finally{
        //OBTENER APLICANTE 
        resultUsuario2.rows.map((us) => {
           usuario = {
            id_Usuario: us[0]
          };
        });
        let sql = `SELECT Id_Aplicante FROM APlicante WHERE DPI= ${DPI}`;
        try {
          console.log(sql);
          resultAPlicante = await dbConexion.Connection(sql, [], true);
        } catch (error) {
          console.log(error);
        }finally{
          resultAPlicante.rows.map((us)=>{
            aplicante = {
              id_Aplicante: us[0]
            }
          })
          //INSERTAR REVISION

          let sql4 = `INSERT INTO Revision(Estado_Revision,id_Usuario,Id_Aplicante) 
                      VALUES(0,${usuario.id_Usuario},${aplicante.id_Aplicante})`;
          console.log('INSERT R: '+sql4);
          try {
            let resultF = await dbConexion.Connection(sql4, [], true);
          } catch (error) {
            console.log(error);
          }finally{
            res.status(200).send({ message: "Se Inserto", code: 200 });
          }
          //SE INSERTO

        }

        
      }


    } else {
      //OBTENER APLICANTE
      resultUsuario.rows.map((us) => {
        usuario = {
          id_Usuario: us[0]
        };
      });
      let sql = `SELECT Id_Aplicante FROM APlicante WHERE DPI= ${DPI}`;
      try {
        console.log(sql);
        resultAPlicante = await dbConexion.Connection(sql, [], true);
      } catch (error) {
        console.log(error);
      }finally{
        resultAPlicante.rows.map((us)=>{
          aplicante = {
            id_Aplicante: us[0]
          }
        })
        //INSERTAR REVISION
        let sql4 = `INSERT INTO Revision(Estado_Revision,id_Usuario,Id_Aplicante) 
                      VALUES(0,${usuario.id_Usuario},${aplicante.id_Aplicante})`;
          console.log('INSERT R: '+sql4);
          try {
            let resultF = await dbConexion.Connection(sql4, [], true);
          } catch (error) {
            console.log(error);
          }finally{
            res.status(200).send({ message: "Se Inserto", code: 200 });
          }

      }

      //
    }
  }
    }
  }

  //
  

  
});

module.exports = router;
