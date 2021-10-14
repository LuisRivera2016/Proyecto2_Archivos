import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Inicio from "../Inicio/Index.js"

function Rutas() {
    return (
        <Router>
            <Switch>
                <Route exact path="/Inicio">
                    <Inicio>

                    </Inicio>
                </Route>
            </Switch>
        </Router>
    )
}

export default Rutas

