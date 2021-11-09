import React from 'react'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
function reportes() {
    return (
        <div>

        
        <div>
             <h1 >REPORTES: </h1>
        </div>
        <div className="div-Reportes">
           
            <Link to="/Admin/Reportes/Organigrama">
            <button className="btn btn-success">Organigrama
            </button>
            </Link><br/>
            <Link to="/Admin/Form">
            <button className="btn btn-success">Top Invitaciones
            </button>
            </Link>{"  "}<br/>
            <Link to="/Admin">
            <button className="btn btn-success">Otro
            </button>
            </Link>
            <Link to="/Admin">
            <button className="btn btn-success">Regresar
            </button>
            </Link>{"  "}<br/>
        </div>
        </div>
    )
}

export default reportes
