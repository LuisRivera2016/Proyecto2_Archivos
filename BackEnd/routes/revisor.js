const express = require("express");
const dbConexion = require("../database");
const router = express.Router();

let result;


//OBTENER USUARIOS
router.get("/getUsuarios/:idUser", async (req, res) => {
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
        Id_Usuario: us[14]
      };
      Usuario.push(UserSchema);
    });
  }

  res.json(Usuario);
});

//APROBAR USUARIO
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


module.exports = router;