import { useEffect,useState,useContext} from 'react';
import Axios  from 'axios';
import React from 'react'
import {Link,Redirect,useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import AuthContext from '../Context/UsuarioData.js';
import Cookies from 'js-cookie';

function Inicio() {
    const {user} = useContext(AuthContext);
    const [usuarios, setUsuarios] = useState([]);
    const [puestos, setPuestos] = useState([]);
    const [puestoSelec, setPuestoSelec] = useState("");

    useEffect(()=>{
        console.log('idU '+user.id_Usuario+' IdD '+user.id_Departamento);
        Axios.get(`http://localhost:3001/Reclutador/getAplicantes/${user.id_Departamento}`,{
        }).then((usuarios)=>{
            setUsuarios(usuarios.data);
            verPuestos();
        }).catch((err)=>{
            setUsuarios([]);
        });
    },[])

    function verPuestos() {
        Axios.get(`http://localhost:3001/Reclutador/getPuestos`,{
        }).then((usuarios)=>{
            setPuestos(usuarios.data);
        }).catch((err)=>{
            setPuestos([]);
        });
    }

    function enviarCorreo(correo,puesto,dpi) {
        Axios.post(`http://localhost:3001/Reclutador/enviarCorreo`,{
            Puesto: puesto,
            Correo: correo
        }).then((usuarios)=>{
            Axios.post(`http://localhost:3001/Reclutador/insertarInvitacion`,{
                Puesto: puesto,
                DPI: dpi,
                Nombre: user.Nombre,
                Usuario: user.id_Usuario
            }).then((usuarios)=>{
                alert('Invitacion Enviada');
            }).catch((err)=>{
                alert('No se pudo Enviar la Invitacion');
            });
        }).catch((err)=>{
            alert('No se pudo Enviar la Invitacion');
        });
    }

    

    return (
        <div>
           

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>DPI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Direccion</th>
                        <th>Telefono</th>
                        <th>Puesto al que  Aplico</th>
                        <th>Invitar al Puesto de:</th>

                    </tr>
                </thead>
            <tbody> {usuarios.map((index)=>{
                    return (<tr>
                                <td>{index.DPI}</td>
                                <td>{index.Nombre}</td>
                                <td>{index.Apellido}</td>
                                <td>{index.Correo}</td>
                                <td>{index.Direccion}</td>
                                <td>{index.Telefono}</td>
                                <td>{index.Puesto}</td>
                                <td><select id="puestos" onChange={(e)=>{
                                    var select = document.getElementById("puestos");
                                    var selectedOperation = select.options[select.selectedIndex].value;
                                    setPuestoSelec(selectedOperation);
                                }

                                }>
                                    {puestos.map((indice)=>{
                                        return(
                                            <option>{indice.Nombre}</option>
                                        )
                                    })}

                                    </select></td>
                                <td>
                                    <button className="btn btn-primary" onClick={(e)=>{
                                        e.preventDefault();
                                        enviarCorreo(index.Correo,puestoSelec,index.DPI);
                                    }}>Enviar Invitacion</button>{"  "}
                                  
                                </td>
                            </tr>)
                    })} 
            </tbody>
        </table>
       
        
        <br/>
            <Link to="/">
            <button className="btn btn-success" onClick={(e)=>{
                Cookies.remove("refreshToken");
            }}>Salir
            </button>
            </Link><br/><br/>
           
        </div>
    )
}

export default Inicio


