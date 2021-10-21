const express = require('express');
const cors = require('cors');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');
const prueba = require('./routes/prueba');
const admin = require('./routes/admin');
const { off } = require('process');
const dbConexion = require('./database');
let fs = require('fs');
const xml2js = require('xml2js');
const { parse } = require('path');
const parser = new xml2js.Parser({ attrkey: "ATTR" });
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(fileupload());
app.use(express.static("files"));
app.use('/',prueba);//rutas
app.use('/Admin',admin);//admin
app.use(bodyParser.urlencoded({extended:true}));



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




//ler archivo
function leer(nameArch) {
    //./files/${nameArch}
    fs.readFile(`./files/datosBD.xml`, 'utf-8', (err, data) => {
        if (err) {
            console.log('error: ', err);
        } else {
            data = data.replace(/\n/g, '')
            data = data.replace(/\t/g, '')
            data = data.replace(/\r/g, '')
            parser.parseString(data, function (error, result) {
                if (error === null) {
                    var AuxDepart = [];
                    var idDep = 1;
                    var AuxPuestos = [];
                    var idPuesto = 1;
                    var AuxCategorias = [];
                    var idCategorias = 1;
                    var AuxRequisito = [];
                    var idRequisito = 1;
                    var AuxFormato = [];
                    var idFormato = 1;


                    var listado = result.departamentos.departamento
                    //recorremos departamentos
                    listado.forEach(departamento => {
                        AuxDepart.push([idDep, departamento.nombre[0], departamento.capital_total[0]])//guardar departamento
                        //obtener los puestos de un departamento
                        departamento.puestos[0].puesto.forEach(puesto => {
                            AuxPuestos.push([idPuesto, puesto.nombre[0], puesto.salario[0], idDep])
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
                        idDep += 1;
                    });

                    //mandamos a insertar el departamento
                    Insertardepartamentos(AuxDepart);
                    InsertarPuestos(AuxPuestos);
                    InsertarCategorias(AuxCategorias);
                    InsertarRequisito(AuxRequisito);
                    InsertarFormato(AuxFormato)

                }
                else {
                    console.log(error);
                }
            });
        }
    });
}
//leer();


//funciones para insertar
async function Insertardepartamentos(lista) {
    //console.log("\n#########---APARTAMENTOS---##########")
    for (const val of lista){
        var query = 'INSERT INTO Departamento(id_Departamento,Nombre,Capital,DepartamentoP) VALUES('+val[0]
        +','+`'${val[1]}'`+','+val[2]+`,'0'`+')';
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
        var query = 'INSERT INTO Puesto(id_Puesto,Nombre,Salario,Calificacion,Disponible,id_Departamento) VALUES('+
        val[0]+','+`'${val[1]}'`+','+val[2]+',0,1,'+val[3]+')';
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
        val[0]+','+`'${val[1]}`+')';
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
        val[0]+','+`'${val[1]}`+','+val[2]+','+val[3]+')';
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
        pk+','+`'${auxFormato[index]}`+')';
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

const port = process.env.PORT || 3001;

app.listen(port,()=>{
    console.log('Escuchando en el puerto',port);
})
