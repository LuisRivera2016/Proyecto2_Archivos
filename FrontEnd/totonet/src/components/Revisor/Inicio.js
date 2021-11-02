import { useEffect,useState,useContext} from 'react';
import Axios  from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import AuthContext from '../Context/UsuarioData.js';
import CV  from '../Revisor/CV.js';

function Inicio() {
    const {user} = useContext(AuthContext);
    console.log(user);
    const [usuarios, setUsuarios] = useState([]);
    const [verCV,setverCV] = useState(false);
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
        obtenerPDF(user.Curriculum);
        //setverCV(true);
    }

    const obtenerPDF = (url)=>{
        Axios.get(`${url}`,{
        }).then((usuarios)=>{
            console.log(usuarios);
        }).catch((err)=>{
            console.log(err)
        });
    }

    const CambiarEstado = (id)=>{
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        var fechaC = hoy.toLocaleDateString();//21/10/2020
        var fecha = new Date();
        var fechaF = fecha.toLocaleDateString("en-US", fechaC);

        Axios.put("http://localhost:3001/Admin/eliminarUsuarios",{
            id_Usuario: id,
            fecha_fin: fechaF
        }).then((e)=>{
            console.log('Se elimino')
        }).catch((err)=>{
            console.log('No se elimino');
        }); 
    }

    // const handleChange=e=>{
    //     const {name, value}=e.target;
    //     setusuarioSeleccionado((prevState)=>({
    //       ...prevState,
    //       [name]: value
    //     }));
    //   }

      // const editar=()=>{
      //   var dataNueva=usuarios;
      //   dataNueva.map(user=>{
      //     if (user.id_Usuario === usuarioSeleccionado.id_Usuario) {
      //       Axios.put("http://localhost:3001/Admin/actualizarUsuarios", {
      //         id_Usuario: usuarioSeleccionado.id_Usuario,  
      //         Nombre: aplicanteSeleccionado.Nombre,
      //         Estado: aplicanteSeleccionado.Apellido
      //       })
      //         .then((e) => {
      //           console.log("Se elimino");
      //         })
      //         .catch((err) => {
      //           console.log("No se elimino");
      //         });
      //     }
      //   });
      //   setModalCV(false);
      // }  

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
                                        CambiarEstado(index.id_Aplicante);
                                    }}>Aceptar Aplicante</button>{"  "}
                                    <button className="btn btn-primary"  onClick={()=>seleccionarAplicante(index)}>Ver CV</button>
                                </td>
                            </tr>)
                    })} 
            </tbody>
        </table>
        {verCV ? <CV curr={aplicanteSeleccionado.Curriculum}/>:undefined}
        <button onClick={()=>{setverCV(false)}}>Cerrar</button>
        <br/>
            <Link to="/">
            <button className="btn btn-success">Salir
            </button>
            </Link><br/><br/>
           
        </div>
    )
}

export default Inicio
