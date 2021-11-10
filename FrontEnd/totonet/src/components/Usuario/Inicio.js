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
    const [requisitos, setRequisitos] = useState([]);
    const [file, setFile] = useState();
    const [aplicante,setAplicante] = useState([]);
    const [verDatos,setVerDatos] = useState(false);
    //MODAL
    const [modalEditar, setModalEditar] = useState(false);
    const [usuarioSeleccionado, setusuarioSeleccionado] = useState({
        Nombre: '',
        Apellido: '',
        Correo: '',
        Direccion: '',
        Telefono: ''
      });
   
      const seleccionarUsuario = (user)=>{
        setusuarioSeleccionado(user);
        setModalEditar(true);
    }

      const handleChange=e=>{
        const {name, value}=e.target;
        setusuarioSeleccionado((prevState)=>({
          ...prevState,
          [name]: value
        }));
      }

      const editar=()=>{
            Axios.put(`http://localhost:3001/Usuario/actualizarUsuario/${user.Nombre}`, {
              Nombre: usuarioSeleccionado.Nombre,  
              Apellido: usuarioSeleccionado.Apellido,
              Correo: usuarioSeleccionado.Correo,
              Direccion:usuarioSeleccionado.Direccion,
              Telefono: usuarioSeleccionado.Telefono
            })
              .then((e) => {
                alert("Se Actualizo el Usuario");
              })
              .catch((err) => {
                alert("No se pudo Actualizar el Usuario");
              });
          
        setModalEditar(false);
      } 
      ///////////////////
    useEffect(()=>{
        console.log('idU '+user.id_Usuario+' IdD '+user.Nombre);
        Axios.get(`http://localhost:3001/Usuario/getRequisitos/${user.Nombre}`,{
        }).then((usuarios)=>{
            setRequisitos(usuarios.data);
            datosU();
        }).catch((err)=>{
            setRequisitos([]);
        });

       

    },[]);


    function datosU(){
        Axios.get(`http://localhost:3001/Usuario/getDatosAplicante/${user.Nombre}`,{
        }).then((datosus)=>{
            console.log(datosus.data);
            setAplicante(datosus.data);
        }).catch((err)=>{
            setAplicante([]);
        });
        
    }

    function tabla(datosA) {
        return(
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Direccion</th>
                        <th>Telefono</th>
                        <th>Actualizar Datos</th>

                    </tr>
                </thead>
            <tbody> 
                            <tr>
                                <td>{datosA.Nombre}</td>
                                <td>{datosA.Apellido}</td>
                                <td>{datosA.Correo}</td>
                                <td>{datosA.Direccion}</td>
                                <td>{datosA.Telefono}</td>
                                <td>
                                    <button className="btn btn-primary"  onClick={(e)=>{
                                            e.preventDefault();
                                            seleccionarUsuario(datosA);
                                    }}>Actualizar</button> 
                                </td>
                            </tr>
                     
            </tbody>
        </table>

        )
    }   
    
    const saveFile = (e)=>{
        setFile(e.target.files[0]);
    }
       
    function actualizarEntrada() {
        Axios.put(`http://localhost:3001/Usuario/actualizarEntrada/${user.Nombre}`,{
        }).then((usuarios)=>{
            <Redirect to="/"/>
        }).catch((err)=>{
            alert('No se pudo Salir');
        });
    }

   function uploadFile(requisito) {
      const formData = new FormData();
      formData.append("file", file);
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
           
           <h2>Requisitos a Subir: </h2><br/>
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
       
        <div>
            <h2>Tus Datos: </h2>{"  "}
            <button className="btn btn-primary" onClick={(e)=>{
                e.preventDefault();
                setVerDatos(true);
            }}>Ver Datos</button>
        
           {verDatos ? tabla(aplicante):<p>Datos de su Usuario:</p>}
        </div>
        <div>
        <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Datos</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="Nombre"
              value={usuarioSeleccionado && usuarioSeleccionado.Nombre}
              onChange={handleChange}
            />
            <br />

            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="Apellido"
              value={usuarioSeleccionado && usuarioSeleccionado.Apellido}
              onChange={handleChange}
            />
            <br />

            <label>Correo</label>
            <input
              className="form-control"
              type="email"
              name="Correo"
              value={usuarioSeleccionado && usuarioSeleccionado.Correo}
              onChange={handleChange}
            />
            <br />
            <label>Direccion</label>
            <input
              className="form-control"
              type="text"
              name="Direccion"
              value={usuarioSeleccionado && usuarioSeleccionado.Direccion}
              onChange={handleChange}
            />
            <br />
            <label>Telefono</label>
            <input
              className="form-control"
              type="number"
              name="Telefono"
              value={usuarioSeleccionado && usuarioSeleccionado.Telefono}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
        </div> 


        <br/>
            <Link to="/" className="btn btn-success" onClick={(e)=>{
                actualizarEntrada();
                Cookies.remove("refreshToken");
            }}>Salir
            </Link>
            
            <br/><br/>  
        </div>
    )
}

export default Inicio
