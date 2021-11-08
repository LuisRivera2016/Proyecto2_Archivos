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
import Carga from '../Admin/Carga.js';
import FormularioAplicante from '../Inicio/FormularioAplicante.js';
import InicioR from '../Revisor/Inicio.js';
import InicioU from '../Usuario/Inicio.js';
import Requisitos from '../Revisor/Requisitos.js';
import Usuario2 from '../Usuario/Inicio2.js';
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
                <Route exact path="/Usuario">
                    <InicioU>

                    </InicioU>
                </Route>
                <Route exact path="/Revisor/Requisitos/:idPuesto/:dpi">
                    <Requisitos></Requisitos>
                </Route>
                <Route exact path="/Usuario2">
                    <Usuario2></Usuario2>
                </Route>
                </AuthProvider>
            </Switch>
        </Router> 
    )
}

export default Rutas

