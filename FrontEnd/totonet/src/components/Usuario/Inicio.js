import { useEffect,useState,useContext} from 'react';
import Axios  from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import AuthContext from '../Context/UsuarioData.js';


function Inicio() {
    const {user} = useContext(AuthContext);
    const [requisitos, setRequisitos] = useState([]);
    const [file, setFile] = useState([]);


    useEffect(()=>{
        console.log('idU '+user.id_Usuario+' IdD '+user.Nombre);
        Axios.get(`http://localhost:3001/Usuario/getRequisitos/${user.Nombre}`,{
        }).then((usuarios)=>{
            setRequisitos(usuarios.data);
        }).catch((err)=>{
            setRequisitos([]);
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
      Axios.post(`http://localhost:3001/insertarRequisitos`,
      formData
      ).then(()=>{
          alert('Requisito Subido');
        }).catch((err)=>{
            alert('No subido');
        });  
      
    };


    return (
        <div>
           

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Requisito</th>
                        <th>Seleccionar</th>
                        <th>Subir</th>

                    </tr>
                </thead>
            <tbody> {requisitos.map((index)=>{
                    return (<tr>
                                <td>{index.Requisito}</td>
                                <td><input type="file" multiple onChange={saveFile}/></td>
                                <td>
                                    <button className="btn btn-primary"  onClick={(e)=>{
                                            e.preventDefault();
                                            uploadFile(index.Requisito);
                                    }}>Subir</button> 
                                </td>
                            </tr>)
                    })} 
            </tbody>
        </table>
       
        
        <br/>
            <Link to="/">
            <button className="btn btn-success">Salir
            </button>
            </Link><br/><br/>
           
        </div>
    )
}

export default Inicio
