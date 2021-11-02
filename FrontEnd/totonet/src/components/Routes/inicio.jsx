import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AuthProvider} from '../Context/UsuarioData.js';
import RutaProtegida from '../Routes/RutaPrivada.js';
//RUTAS
import Admin from "../Admin/Admin.js"
import InicioA from '../Admin/Inicio.js';
import Login from '../Inicio/Login.js'
import Home from '../Inicio/Home.js';
import Reportes from '../Admin/Reportes.js';
import Aplicacion from '../Usuario/Cargar.js';
import Carga from '../Admin/Carga.js';
import FormularioAplicante from '../Inicio/FormularioAplicante.js';
import InicioR from '../Revisor/Inicio.js';
import CV from '../Revisor/CV.js';
//


function Rutas() {
    return (
        <Router>
            <Switch>
                <AuthProvider>
                <Route exact path ="/">
                    <Home>
                        
                    </Home>
                </Route>
                <Route exact path="/Aplicacion">
                    <Aplicacion>

                    </Aplicacion>
                </Route>
                <RutaProtegida exact path="/Admin">
                    <InicioA>
                        
                    </InicioA>
                </RutaProtegida>
                <RutaProtegida exact path="/Admin/Form">
                    <Admin>   
                    </Admin>
                </RutaProtegida>
                <RutaProtegida exact path="/Admin/Carga">
                    <Carga>

                    </Carga>
                </RutaProtegida>
                <Route exact path="/Login">
                    <Login> 
                    </Login>
                </Route>
                <RutaProtegida exact path="/Admin/Reportes">
                    <Reportes>
                        
                    </Reportes>
                </RutaProtegida>
                <Route exact path="/Formulario/:idPuesto/:nombre/:idDepartamento">
                    <FormularioAplicante>
                    </FormularioAplicante>
                </Route>
                <Route exact path="/Revisor">
                    <InicioR></InicioR>
                </Route>
                <Route exact path="/Revisor/CV">
                    <CV>

                    </CV>
                </Route>
                </AuthProvider>
            </Switch>
        </Router> 
    )
}

export default Rutas

