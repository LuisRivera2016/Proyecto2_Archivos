import { useEffect,useState,useContext} from 'react';
import Axios  from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import AuthContext from '../Context/UsuarioData.js';
import Cookies from 'js-cookie';

function Inicio() {
    const {user} = useContext(AuthContext);
    const [usuarios, setUsuarios] = useState([]);
    const [aplicanteSeleccionado, setaplicanteSeleccionado] = useState({
      id_Aplicante: '',
      Estado: '',
      DPI: '',
      Nombre: '',
      Apellido: '',
      Correo: '',
      Direccion: '',
      Telefono: '',
      Entrada: '',
      Curriculum: '',
      Id_Puesto: '',
      Id_Revision: '',
      Estado_Revision: '',
      Id_Usuario: ''
      });

    useEffect(()=>{
        console.log('idU '+user.id_Usuario+' IdD '+user.id_Departamento);
        Axios.get(`http://localhost:3001/Revisor/getUsuarios/${user.id_Usuario}`,{
        }).then((usuarios)=>{
            setUsuarios(usuarios.data);
        }).catch((err)=>{
            setUsuarios([]);
        });
    },[])

    const seleccionarAplicante = (user)=>{
        setaplicanteSeleccionado(user);
        console.log('surriculumP: '+user.Curriculum);
        obtenerPDF(user.id_Aplicante);

    }

    const obtenerPDF = async(url)=>{
        Axios.get(`http://localhost:3001/getDocumento/${url}`,{
            responseType: "blob"

    }).then(response=>{
            const file = new Blob([response.data],{
                type: "application/pdf"
            });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        }).catch(err=>{
            console.log(err)
        });
    }

    
      const aceptarA=(aplicante)=>{
            Axios.post("http://localhost:3001/Revisor/aprobarAplicante", {
              id_Aplicante: aplicante
            })
              .then((e) => {
                alert("Se Acepto el Aplicante");
              })
              .catch((err) => {
                alert("No se pudo Aceptar el Aplicante");
              });
      };  

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
                        <th>Id_Puesto a Aplicar</th>

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
                                <td>{index.Id_Puesto}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={()=>{
                                        aceptarA(index.id_Aplicante);
                                    }}>Aceptar Aplicante</button>{"  "}
                                    <button className="btn btn-primary"  onClick={()=>seleccionarAplicante(index)}>Ver CV</button>{" "}
                                    <Link to={`/Revisor/Requisitos/${index.Id_Puesto}/${index.DPI}`}><button className="btn btn-success">Ver Expedientes</button></Link>
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
