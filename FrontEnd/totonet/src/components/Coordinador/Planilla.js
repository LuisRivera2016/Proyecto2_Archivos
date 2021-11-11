import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import AuthContext from "../Context/UsuarioData.js";

function Planilla() {
    const {idDepartamento} = useParams();
    const {user} = useContext(AuthContext);
    const [planilla, setPlanilla] = useState([]);
    const [depar, setDepar] = useState("");


    useEffect(()=>{
        Axios.get(`http://localhost:3001/Coordinador/getDepartamento/${idDepartamento}`,{
        }).then((usuarios)=>{
            recorrerD(usuarios.data)
            getPlanilla();
        }).catch((err)=>{
            setDepar("");
        });
    },[]);

    function getPlanilla() {
        Axios.get(`http://localhost:3001/Coordinador/getPlanilla/${idDepartamento}`,{
        }).then((usuarios)=>{
            setPlanilla(usuarios.data)
        }).catch((err)=>{
            setPlanilla([]);
        }); 
    }
   
    function recorrerD(dat) {
        let cadena = "";
        cadena += dat.Nombre;
        setDepar(cadena);
      }
    return (


        <div>
            <h2>Planilla del Departamento: {depar}</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>DPI</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Direccion</th>
                        <th>Telefono</th>
                        <th>Puesto</th>
                        <th>Salario</th>
                        

                    </tr>
                </thead>
            <tbody> {planilla.map((index)=>{
                    return (<tr>
                                <td>{index.DPI}</td>
                                <td>{index.Nombre}</td>
                                <td>{index.Correo}</td>
                                <td>{index.Direccion}</td>
                                <td>{index.Telefono}</td>
                                <td>{index.Puesto}</td>
                                <td>{index.Salario}</td>
                               
                            </tr>)
                    })} 
            </tbody>
        </table><br/>

            <Link to="/Coordinador">
            <button className="btn btn-success">Salir
            </button>
            </Link>{"  "}
            
        </div>
    )
}

export default Planilla
