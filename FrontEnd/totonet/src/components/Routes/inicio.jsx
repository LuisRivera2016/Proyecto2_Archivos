import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Inicio from "../Inicio/Index.js"
import Admin from "../Admin/Admin.js"
import InicioA from '../Admin/Inicio.js';
import Login from '../Inicio/Login.js'
import Home from '../Inicio/Home.js';
import Reportes from '../Admin/Reportes.js';
import Aplicacion from '../Usuario/Cargar.js';
import {AuthProvider} from '../Context/UsuarioData.js';
import RutaProtegida from '../Routes/RutaPrivada.js'
import {useState} from 'react';

function Rutas() {
    const [usuario, setUsuario] = useState("");
    return (
        <Router>
            <Switch>
                <AuthProvider value={{usuario,setUsuario}}>
                <Route exact path ="/">
                    <Home>
                        
                    </Home>
                </Route>
                <Route exact path="/Inicio">
                    <Inicio>

                    </Inicio>
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
                <Route exact path="/Login">
                    <Login> 
                    </Login>
                </Route>
                <RutaProtegida exact path="/Admin/Reportes">
                    <Reportes>
                        
                    </Reportes>
                </RutaProtegida>
                </AuthProvider>
            </Switch>
        </Router> 
    )
}

export default Rutas

