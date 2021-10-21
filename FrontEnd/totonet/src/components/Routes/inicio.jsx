import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Inicio from "../Inicio/Index.js"
import Admin from "../Admin/Admin.js"
import InicioA from '../Admin/Inicio.js';

function Rutas() {
    return (
        <Router>
            <Switch>
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
            </Switch>
        </Router> 
    )
}

export default Rutas

