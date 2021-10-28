const express = require('express');
const cors = require('cors');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');
const prueba = require('./routes/prueba');
const admin = require('./routes/admin');
const userR = require('./routes/user');
const { off } = require('process');
const dbConexion = require('./database');
const bcrypt = require('bcrypt');
let fs = require('fs');
const xml2js = require('xml2js');
const { parse } = require('path');
const jwt = require('jsonwebtoken');
const parser = new xml2js.Parser({ attrkey: "ATTR" });
const app = express();
const execSync = require('child_process').execSync;



app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(fileupload());
app.use(express.static("files"));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(express.json());
app.use('/',prueba);//rutas
app.use('/Admin',admin);//admin
app.use('/Usuario',userR);//user




app.post("/upload", (req, res) => {
    const newpath = __dirname + "/files/";
    const file = req.files.file;
    const filename = file.name;

  
    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        res.status(500).send({ message: "File upload failed", code: 200 });
      }

      fs.readFile(`${newpath}${filename}`, "utf8", function (err, data) {
        if (err) return res.status(500).send({ message: err })

        //--Recorrer xml
        leer(filename)
        

    });

      res.status(200).send({ message: "File Uploaded", code: 200 });
    });

  });


app.get('/',(req,res) =>{
    res.send('Hola desde Express');
});


app.post('/Login',async(req,res)=>{
    let result;
    let tipoEstructura = {};
    const usuario = req.body.Nombre;
    const password = req.body.Password;
    var passH = '';
    // const hashPass = await bcrypt.hash(password,12,function(err,hash){
    //     passH = hash;
    // });
    console.log(`NUser: ${usuario} NPass: ${password}`);
    let query = `SELECT * FROM Usuario WHERE Nombre='${usuario}' AND
    Password='${password}'`
    console.log(query);
    try {
         result = await dbConexion.Connection(query, [], true); 
    } catch (error) {
        console.log('No existe usuario');
    }finally{
        if(result.rows.length == 0){
            console.log('No existe el usuario');
        }else{
           
            result.rows.map(index =>{
                tipoEstructura ={
                    "id_Usuario": index[0],
                    "Nombre": index[1],
                    "Estado": index[5],
                    "id_Tipo":index[6],
                    "id_Puesto":index[7]
                }
              
            })
            const accesToken = generateAccesToken(tipoEstructura);
            const accessRefreshToken = generateRefreshToken(tipoEstructura);
            refreshTokens.push(accessRefreshToken);
            console.log('accesT ',accessRefreshToken);
            return res.json({...tipoEstructura,accesToken: accesToken,refreshToken:accessRefreshToken})
            
        }
    }
});

//--------------------------------------------TOKEN
function generateAccesToken(user){
    return jwt.sign(
        user,
        'Token2021',
        {expiresIn: "3m"}
    )
}

function generateRefreshToken(user){
    return jwt.sign(
        user,
        'TokenRefresco2021',
        {expiresIn: "15m"}
    )
}

let refreshTokens = [];
app.post('/refreshToken',(req,res)=>{
    const refreshToken = req.body.token;
    console.log('refT ',refreshToken);
    if(!refreshToken) return res.status(401).send({status: 401,message: 'No estas logeado'});
    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).send({status: 403,message: 'Token no valido'});
    }
    jwt.verify(refreshToken,'TokenRefresco2021',(err,user)=>{
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token)=>token !== refreshToken);
        let usuarioTemp ={
            "id_Usuario": user.id_Usuario,
            "Nombre": user.Nombre,
            "Estado": user.Estado,
            "id_Tipo": user.id_Tipo,
            "id_Puesto": user.id_Puesto
        };
        console.log(usuarioTemp)
    

    const newAccesToken = generateAccesToken(usuarioTemp);
    const newRefreshToken = generateRefreshToken(usuarioTemp);
    refreshTokens.push(newRefreshToken);
    res.status(200).send({...usuarioTemp,accesToken: newAccesToken,refresToken:newRefreshToken})
    })
})

const verify = (req,res,next)=>{
    const autoHeader = req.headers["authorization"];
    if(autoHeader){
        const token = autoHeader.split(" ")[1];
        jwt.verify(token,'TOken2021',(err,user)=>{
            if(err){
                res.status(403).send({status: 403,message: "JWT no valido"})
            }
            req.user = user;
            next();
        })
    }else{
        res.status(401).send({status: 401,message: "credenciales incorrectas"})
    }
}
//-------------------------------------------------------
//ler archivo
function leer(nameArch) {
    //./files/${nameArch}
    fs.readFile(`./files/archivo_entrada.xml`, 'utf-8', (err, data) => {
        if (err) {
            console.log('error: ', err);
        } else {
            data = data.replace(/\n/g, '')
            data = data.replace(/\t/g, '')
            data = data.replace(/\r/g, '')
            parser.parseString(data, function (error, result) {
                idDep = 1;
                idPuesto = 1;
                idCategorias = 1;
                idRequisito = 1;
                idFormato = 1;
                lecturaDepartamentos(result.departamentos,0);
            });
        }
    });
}
//variables lectura
var idDep = 0;
var idPuesto = 0;
var idCategorias = 0;
var idRequisito = 0;
var idFormato = 0;
var cadenaArbol = `digraph G {\n0[label = "Departamentos" style="filled" color="darkgreen" shape="box"];\n`;

leer();

function lecturaDepartamentos(result,padre){
    var AuxDepart = [];
    var AuxPuestos = [];
    var AuxCategorias = [];
    var AuxRequisito = [];
    var AuxFormato = [];
    var auxRecursividad = [];
    var listado = result.departamento

    //recorremos departamentos
     listado.forEach(departamento => {
        var llaves = Object.keys(departamento);
        
        
        AuxDepart.push([idDep, departamento.nombre[0], departamento.capital_total[0], padre])//guardar departamento
        //CADENA ARBOL
        cadenaArbol += idDep +`[label= "${departamento.nombre[0]}" style="filled" color="dodgerblue" shape="box"];\n`;
        cadenaArbol += padre + `-> ${idDep} ;\n`;
        //
        //obtener los puestos de un departamento
        departamento.puestos[0].puesto.forEach(puesto => {
            var imagen = '';
            if(Object.keys(puesto).indexOf('imagen') != -1){
                imagen = puesto.imagen[0];
            }
            AuxPuestos.push([idPuesto, puesto.nombre[0], puesto.salario[0],idDep,imagen])
            //Obtener las categorias
            puesto.categorias[0].categoria.forEach(categoria => {
                AuxCategorias.push([idCategorias, categoria.nombre[0], idPuesto])
                idCategorias += 1
            })

            //obtener los requisitos
            puesto.requisitos[0].requisito.forEach(requisito => {
                AuxRequisito.push([idRequisito, requisito.nombre[0], requisito.tamaño[0], requisito.obligatorio[0], idPuesto])
                //obtener los formatos
                requisito.formatos[0].formato.forEach(formato => {
                    AuxFormato.push([idFormato, formato.nombre[0], idRequisito])
                    idFormato += 1;
                });


                idRequisito += 1
            })



            idPuesto += 1;
        });
        if(llaves.indexOf('departamentos')!= -1){
            auxRecursividad.push([departamento.departamentos[0],idDep]);
                        
       }
        idDep += 1;
    
     });

   // mandamos a insertar el departamento
    Insertardepartamentos(AuxDepart);
    InsertarPuestos(AuxPuestos);
    InsertarCategorias(AuxCategorias);
    InsertarRequisito(AuxRequisito);
    InsertarFormato(AuxFormato)
    auxRecursividad.forEach(element => {
        lecturaDepartamentos(element[0],element[1]);
       
    }); 
    cadenaArbol += `}%`;
}

//funciones para insertar
async function Insertardepartamentos(lista) {
    //console.log("\n#########---APARTAMENTOS---##########")
    for (const val of lista){
        var query = 'INSERT INTO Departamento(id_Departamento,Nombre,Capital,DepartamentoP) VALUES('+val[0]
        +','+`TRIM('${val[1]}')`+','+val[2]+`,TRIM('${val[3]}')`+')';
        console.log(query);
        try {
            //var result = await dbConexion.Connection(query, [], true);
        } catch (error) {
            console.log('error '+error);
        }
        
        //console.log('ID:' + val[0], 'nombre:' + val[1], 'valor:' + val[2]) 
    }
}
//PUESTOS
async function InsertarPuestos(lista) {
    //console.log("\n#########---PUESTOS---##########")
    for (const val of lista){
        var query = 'INSERT INTO Puesto(id_Puesto,Nombre,Salario,Imagen,Disponible,id_Departamento) VALUES('+
        val[0]+','+`TRIM('${val[1]}')`+','+`TRIM('${val[4]}')`+','+val[2]+',1,'+val[3]+')';
        console.log(query);
        try {
            //var result = await dbConexion.Connection(query, [], true);
        } catch (error) {
            console.log('error '+error);
        }
        
       // console.log('ID:' + val[0], 'nombre:' + val[1], 'valor:' + val[2]) 
    }
}

//CATEGORIAS
async function InsertarCategorias(lista) {
    //console.log("\n#########---CATEGORIAS---##########")
    for (const val of lista){
        var query = 'INSERT INTO Categoria(id_Categoria,Nombre) VALUES('+
        val[0]+','+`TRIM('${val[1]}')`+')';
        console.log(query);
        try {
            //var result = await dbConexion.Connection(query, [], true);
        } catch (error) {
            console.log('error '+error);
        }
        // console.log('ID:' + val[0], 'nombre:' + val[1], 'valor:' + val[2]) 
       //PUESTO_CATEGORIA
       var query2 = 'INSERT INTO Puesto_Categoria(id_Puesto,id_Categoria) VALUES('+
       val[2]+','+val[0]+')';
       console.log(query2);
       try {
           //var result = await dbConexion.Connection(query2, [], true);
       } catch (error) {
           console.log('error '+error);
       }
    }
}

//REQUISITO
async function InsertarRequisito(lista) {
    //console.log("\n#########---REQUISITOS---##########")
    for (const val of lista){
        var query = 'INSERT INTO Requisito(id_Requisito,Nombre,Tamano,Obligatorio) VALUES('+
        val[0]+','+`TRIM('${val[1]}')`+','+val[2]+','+val[3]+')';
        console.log(query);
        try {
            //var result = await dbConexion.Connection(query, [], true);
        } catch (error) {
            console.log('error '+error);
        }
        // console.log('ID:' + val[0], 'nombre:' + val[1], 'valor:' + val[2]) 
       //PUESTO_REQUISITO
       var query2 = 'INSERT INTO Puesto_Requisito(id_Puesto,id_Requisito) VALUES('+
       val[4]+','+val[0]+')';
       console.log(query2);
       try {
           //var result = await dbConexion.Connection(query2, [], true);
       } catch (error) {
           console.log('error '+error);
       }
    }
}


//FORMATO
async function InsertarFormato(lista) {
    //console.log("\n#########---FORMATO---##########")
    var auxFormato = []
    lista.forEach(element => {
        if (!auxFormato.includes(element[1])) {
            auxFormato.push(element[1])
        }
    });
    //FORMATO
    for (let index = 0; index < auxFormato.length; index++) {
        var pk = index +1;
        var query = 'INSERT INTO Formato(id_Formato,Nombre) VALUES('+
        pk+','+`TRIM('${auxFormato[index]}')`+')';
        console.log(query);
        try {
            //var result = await dbConexion.Connection(query, [], true);
        } catch (error) {
            console.log('error '+error);
        }
    }
    //FORMATO_REQUISITO
   // console.log("\n#########---FORMATO-REQUISITO--##########")
   for (const val of lista){
        var query2 = 'INSERT INTO Requisito_Formato(id_Requisito,id_Formato) VALUES('+val[2]
        +','+(auxFormato.indexOf(val[1]) + 1)+')';
        console.log(query2);
    try {
        //var result = await dbConexion.Connection(query2, [], true);
    } catch (error) {
        console.log('error '+error);
    }
    
    //console.log('ID:' + val[0], 'nombre:' + val[1], 'valor:' + val[2]) 
}



}

//ARBOL
app.get('/Arbol',async(req,res)=>{
   
    var arbol = cadenaArbol.split('%');
    var rutaImagen = '../FrontEnd/totonet/public/imageArbol.png';
    console.log(arbol[0]);
    if(!arbol){
        res.status(500).send({status: 500,message: 'Cadena vacia'});
    }else{
        fs.writeFile('./files/Arbol.dot',arbol[0],(err)=>{
            if(err){
                return console.log(err);
            }
            console.log('creado correctamente')
            const output = execSync(`dot ./files/Arbol.dot -Tpng -o ${rutaImagen}`, { encoding: 'utf-8' });
            //console.log('Output was:\n', output);
        })
        res.status(200).send({status: 200,message:`/imageArbol.png`});
    }
})


const port = process.env.PORT || 3001;

app.listen(port,()=>{
    console.log('Escuchando en el puerto',port);
})
