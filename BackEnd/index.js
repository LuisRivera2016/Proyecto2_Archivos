const express = require('express');
const cors = require('cors');
const prueba = require('./routes/prueba');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use('/',prueba);//rutas

app.get('/',(req,res) =>{
    res.send('Hola desde Express');
});

const port = process.env.PORT || 3001;

app.listen(port,()=>{
    console.log('Escuchando en el puerto',port);
})
