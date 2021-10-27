import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Inicio from "../Inicio/Index.js"
import Admin from "../Admin/Admin.js"
import InicioA from '../Admin/Inicio.js';
import Login from '../Inicio/Login.js'
import Home from '../Inicio/Home.js';
import Reportes from '../Admin/Reportes.js';
import {UserContexto} from '../Context/UsuarioData.js';
import {useState} from 'react';

function Rutas() {
    const [usuario, setUsuario] = useState("");
    return (
        <Router>
            <Switch>
                <UserContexto.Provider value={{usuario,setUsuario}}>
                <Route exact path ="/">
                    <Home>
                        
                    </Home>
                </Route>
                <Route exact path="/Inicio">
                    <Inicio>

                    </Inicio>
                </Route>
                <Route exact path="/Admin">
                    <InicioA>
                        
                    </InicioA>
                </Route>
                <Route exact path="/Admin/Form">
                    <Admin>   
                    </Admin>
                </Route>
                <Route exact path="/Login">
                    <Login> 
                    </Login>
                </Route>
                <Route exact path="/Admin/Reportes">
                    <Reportes>
                        
                    </Reportes>
                </Route>
                </UserContexto.Provider>
            </Switch>
        </Router> 
    )
}

export default Rutas

