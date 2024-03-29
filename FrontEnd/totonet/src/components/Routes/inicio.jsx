import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AuthProvider} from '../Context/UsuarioData.js';
import RutaProtegida from '../Routes/RutaPrivada.js';
//RUTAS
import Admin from "../Admin/Admin.js"
import InicioA from '../Admin/Inicio.js';
import Login from '../Inicio/Login.js'
import Home from '../Inicio/Home.js';
import Organigrama from '../Admin/Organigrama.js';
import Carga from '../Admin/Carga.js';
import FormularioAplicante from '../Inicio/FormularioAplicante.js';
import InicioR from '../Revisor/Inicio.js';
import InicioU from '../Usuario/Inicio.js';
import Requisitos from '../Revisor/Requisitos.js';
import Usuario2 from '../Usuario/Inicio2.js';
import InicioRe from '../Reclutador/Inicio.js';
import Reportes from '../Admin/reportes.js';
import Invitaciones from '../Admin/TopInvitaciones.js';
import Rechazos from '../Admin/TopRechazos.js';
import Coordinador from '../Coordinador/Inicio.js';
import Planilla from '../Coordinador/Planilla.js';
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
                <RutaProtegida exact path="/Admin/Reportes/Organigrama">
                    <Organigrama></Organigrama>
                </RutaProtegida>
                <RutaProtegida exact path="/Admin/Reportes/Invitaciones">
                    <Invitaciones></Invitaciones>
                </RutaProtegida>
                <RutaProtegida exact path="/Admin/Reportes/Rechazos">
                    <Rechazos></Rechazos>
                </RutaProtegida>
                <Route exact path="/Formulario/:idPuesto/:nombre/:idDepartamento">
                    <FormularioAplicante>
                    </FormularioAplicante>
                </Route>
                <RutaProtegida exact path="/Revisor">
                    <InicioR></InicioR>
                </RutaProtegida>
                <RutaProtegida exact path="/Usuario">
                    <InicioU>
                    </InicioU>
                </RutaProtegida>
                <RutaProtegida exact path="/Revisor/Requisitos/:idPuesto/:dpi/:correo">
                    <Requisitos></Requisitos>
                </RutaProtegida>
                <RutaProtegida exact path="/Usuario2">
                    <Usuario2></Usuario2>
                </RutaProtegida>
                <RutaProtegida exact path="/Reclutador">
                    <InicioRe></InicioRe>
                </RutaProtegida>
                <RutaProtegida exact path="/Admin/Reportes">
                    <Reportes></Reportes>
                </RutaProtegida>
                <RutaProtegida exact path="/Coordinador">
                    <Coordinador></Coordinador>
                </RutaProtegida>
                <RutaProtegida exact path="/Coordinador/Planilla/:idDepartamento">
                    <Planilla></Planilla>
                </RutaProtegida>
                </AuthProvider>
            </Switch>
        </Router> 
    )
}

export default Rutas

