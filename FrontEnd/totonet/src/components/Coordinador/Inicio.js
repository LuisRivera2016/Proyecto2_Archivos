import { useEffect,useState,useContext } from 'react';
import Axios  from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import AuthContext from '../Context/UsuarioData.js';
import Cookies from 'js-cookie';

function Inicio() {
    const {user} = useContext(AuthContext);
    const [aprobados, setAprobados] = useState([]);


    useEffect(()=>{
        Axios.get(`http://localhost:3001/Coordinador/getAprobados/${user.id_Departamento}`,{
        }).then((usuarios)=>{
            setAprobados(usuarios.data);
        }).catch((err)=>{
            setAprobados([]);
        });
    },[]);

    function rechazarAplicante(dpi) {
        Axios.put(`http://localhost:3001/Coordinador/rechazarAplicante`,{
            dpi: dpi
        }).then((usuarios)=>{
            alert('Aplicante Rechazado');
        }).catch((err)=>{
           alert('No se pudo Rechazar al Aplicante');
        });
    }

    function contratarAplicante(dpi,salario) {
        Axios.post(`http://localhost:3001/Coordinador/contratarAplicante`,{
            dpi: dpi,
            salario: salario,
            idDepartamento: user.id_Departamento
        }).then((usuarios)=>{
            alert('Aplicante Contratado');
        }).catch((err)=>{
           alert('No se pudo Contratar al Aplicante');
        });
    }

    return (


        <div>
            <h2>Usuarios Aprobados: </h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>DPI</th>
                        <th>Nombre</th>
                        <th>Puesto</th>
                        <th>Salario</th>
                        <th>Contratar/Rechazar</th>
                        

                    </tr>
                </thead>
            <tbody> {aprobados.map((index)=>{
                    return (<tr>
                                <td>{index.DPI}</td>
                                <td>{index.Nombre}</td>
                                <td>{index.Puesto}</td>
                                <td>{index.Salario}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={(e)=>{
                                        e.preventDefault();
                                        contratarAplicante(index.DPI,index.Salario);
                                    }}>Contratar</button>{"  "}
                                    <button className="btn btn-danger" onClick={(e)=>{
                                        e.preventDefault();
                                        rechazarAplicante(index.DPI);
                                    }}>Rechazar</button>
                                </td>
                            </tr>)
                    })} 
            </tbody>
        </table><br/>

            <Link to="/">
            <button className="btn btn-success" onClick={(e)=>{
                Cookies.remove("refreshToken");
            }}>Salir
            </button>
            </Link>{"  "}
            <Link to={`/Coordinador/Planilla/${user.id_Departamento}`}><button className="btn btn-success">Ver Planilla</button></Link>
        </div>
    )
}

export default Inicio
