import { useEffect,useState } from 'react';
import Axios  from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';

function TopRechazos() {
    const [rechazos, setRechazos] = useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:3001/Admin/getRechazos",{
        }).then((invitaciones)=>{
            setRechazos(invitaciones.data);
        }).catch((err)=>{
            setRechazos([]);
        });
    },[])

    return (
        <div>
            <h1>TOP Mas Documentos Rechazados: </h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>DPI</th>
                        <th>Nombre Aplicante</th>
                        <th>No. de Documentos Rechazados</th>

                    </tr>
                </thead>
            <tbody> {rechazos.map((index)=>{
                    return (<tr>
                                <td>{index.DPI}</td>
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

export default TopRechazos
