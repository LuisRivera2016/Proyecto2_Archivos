import { useEffect,useState,useContext} from 'react';
import Axios  from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import AuthContext from '../Context/UsuarioData.js';
import Cookies from 'js-cookie';

function Inicio2() {
    const {user} = useContext(AuthContext);
    const [documentos, setDocumentos] = useState([]);
    const [file, setFile] = useState([]);


    useEffect(()=>{
        console.log('idU '+user.id_Usuario+' IdD '+user.Nombre);
        Axios.get(`http://localhost:3001/Usuario/getDesaprobados/${user.Nombre}`,{
        }).then((usuarios)=>{
            setDocumentos(usuarios.data);
        }).catch((err)=>{
            setDocumentos([]);
        });
    },[]);

    
    const saveFile = (e)=>{
        setFile(e.target.files);
    }
       


   function uploadFile(requisito) {
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("idUsuario", user.id_Usuario);
      formData.append("Aplicante", user.Nombre);
      formData.append("Requisito", requisito);
      Axios.put(`http://localhost:3001/actualizarRequisitos`,
      formData
      ).then(()=>{
          alert('Requisito Actualizado');
        }).catch((err)=>{
            alert('No subido');
        });  
      
    };


    return (
        <div>
           

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Requisitos Desaprobados</th>
                        <th>Motivo</th>
                        <th>Fecha de Rechazo</th>
                        <th>Seleccionar Nuevo Archivo</th>
                        <th>Subir</th>

                    </tr>
                </thead>
            <tbody> {documentos.map((index)=>{
                    return (<tr>
                                <td>{index.Documento}</td>
                                <td>{index.Motivo}</td>
                                <td>{index.Fecha}</td>
                                <td><input type="file" multiple onChange={saveFile}/></td>
                                <td>
                                    <button className="btn btn-primary"  onClick={(e)=>{
                                            e.preventDefault();
                                            uploadFile(index.Documento);
                                    }}>Actualizar Documento</button> 
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

export default Inicio2
