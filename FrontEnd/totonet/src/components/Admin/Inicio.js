import { useEffect,useState } from 'react';
import Axios  from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import Cookies from 'js-cookie';

function Inicio() {
    const [usuarios, setUsuarios] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [usuarioSeleccionado, setusuarioSeleccionado] = useState({
        id_Usuario: '',
        Nombre: '',
        Password: '',
        Fecha_Creacion: '',
        Fecha_Fin: '',
        Estado: '',
        id_Tipo: '',
        id_Puesto: '' ,
        id_Departamento: '',
        tipo:'',
        Entrada:''
      });

    useEffect(()=>{
        Axios.get("http://localhost:3001/Admin/getUsuarios",{
        }).then((usuarios)=>{
            setUsuarios(usuarios.data);
        }).catch((err)=>{
            setUsuarios([]);
        });
    },[])

    const seleccionarUsuario = (user)=>{
        setusuarioSeleccionado(user);
        setModalEditar(true);
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
            alert('Se Elimino el Usuario')
        }).catch((err)=>{
            alert('No se Elimino el Usuario');
        }); 
    }

    const handleChange=e=>{
        const {name, value}=e.target;
        setusuarioSeleccionado((prevState)=>({
          ...prevState,
          [name]: value
        }));
      }

      const editar=()=>{
        var dataNueva=usuarios;
        dataNueva.map(user=>{
          if (user.id_Usuario === usuarioSeleccionado.id_Usuario) {
            Axios.put("http://localhost:3001/Admin/actualizarUsuarios", {
              id_Usuario: usuarioSeleccionado.id_Usuario,  
              Nombre: usuarioSeleccionado.Nombre,
              Estado: usuarioSeleccionado.Estado
            })
              .then((e) => {
                alert("Se Actualizo el Usuario");
              })
              .catch((err) => {
                alert("No se Actualizo el Usuario");
              });
          }
        });
        setModalEditar(false);
      }  

    return (
      <div className="container-app">
      <div className="nav-container">{/* <Navbar/> */}
            <Link to="/Admin/Carga">
            <button className="btn btn-success">Cargar Datos
            </button>
            </Link>
            <Link to="/Admin/Form">
            <button className="btn btn-success">Agregar
            </button>
            </Link>{"  "}
            <Link to="/">
            <button className="btn btn-success" onClick={(e)=>{
                Cookies.remove("refreshToken");
            }}>Salir
            </button>
            </Link>{"  "}
            <Link to="/Admin/Reportes">
            <button className="btn btn-success">Reportes
            </button>
            </Link>
      </div>

        <div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Fecha_Creacion</th>
                        <th>Estado</th>
                        <th>Rol</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
            <tbody> {usuarios.map((index)=>{
                    return (<tr>
                                <td>{index.Nombre}</td>
                                <td>{index.Fecha_Creacion}</td>
                                <td>{index.Estado}</td>
                                <td>{index.tipo}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={()=>{
                                        CambiarEstado(index.id_Usuario);
                                    }}>Eliminar</button>{"  "}
                                    <button className="btn btn-primary" onClick={()=>seleccionarUsuario(index)}>Modificar</button>
                                </td>
                            </tr>)
                    })} 
            </tbody>
        </table>

         <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id_Usuario"
              value={usuarioSeleccionado && usuarioSeleccionado.id_Usuario}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="Nombre"
              value={usuarioSeleccionado && usuarioSeleccionado.Nombre}
              onChange={handleChange}
            />
            <br />

            <label>Estado</label>
            <input
              className="form-control"
              type="text"
              name="Estado"
              value={usuarioSeleccionado && usuarioSeleccionado.Estado}
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


              

        <br/>
           
        </div>
        </div>
    )
}

export default Inicio
