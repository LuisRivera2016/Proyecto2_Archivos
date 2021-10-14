const express = require('express');
const dbConexion = require('../database');
const router = express.Router();

router.get('/getUsers', async(req, res) => {
    sql = "Select * from Prueba";
    let result = await dbConexion.Connection(sql, [], false);
    User = [];
    result.rows.map(us => {
        let UserSchema = {
            "id_Prueba": us[0],
            "Nombre": us[1],
            "Usuario": us[2]
        }
        User.push(UserSchema);
    })
    res.json(User);
});


module.exports = router;