import { useEffect,useState } from 'react';
import Axios  from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';

function TopInvitaciones() {
    const [invitaciones, setInvitaciones] = useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:3001/Admin/getInvitaciones",{
        }).then((invitaciones)=>{
            setInvitaciones(invitaciones.data);
        }).catch((err)=>{
            setInvitaciones([]);
        });
    },[])

    return (
        <div>
            <h1>TOP Mas Invitaciones: </h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre Usuario</th>
                        <th>No. Invitaciones</th>

                    </tr>
                </thead>
            <tbody> {invitaciones.map((index)=>{
                    return (<tr>
                                <td>{index.Nombre}</td>
                                <td>{index.Numero}</td>
                            </tr>)
                    })} 
            </tbody>
        </table><br/>
            <Link to="/Admin/Reportes">
            <button className="btn btn-success">Regresar
            </button>
            </Link>
        </div>
    )
}

export default TopInvitaciones
