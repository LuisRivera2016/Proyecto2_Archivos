import { useEffect,useState } from 'react';
import Axios  from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import Swal from "sweetalert2"; 

function Admin() {
    const [roles, setRoles] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [usuario, setUsuario] = useState("");
    const [pass, setPass] = useState("");
    const [rol, setRol] = useState(0);
    const [rolD, setRolD] = useState(0);

    useEffect(()=>{
        Axios.get("http://localhost:3001/Admin/getRoles",{
        }).then((roles)=>{
            setRoles(roles.data);
        }).catch((err)=>{
            setRoles([]);
        });
    },[])

    useEffect(()=>{
        Axios.get("http://localhost:3001/Admin/getDepartamentos",{
        }).then((roles)=>{
            setDepartamentos(roles.data);
        }).catch((err)=>{
            setDepartamentos([]);
        });
    },[])

const Submit = ()=>{
    console.log(rol);
    Axios.post("http://localhost:3001/Admin/insertar",{
        Nombre: usuario,
        Password: pass,
        id_Tipo: rol,
        id_Departamento: rolD
    }).then(()=>{
        Swal.fire('Usuario Agregado con Exito')
    }).catch((e)=>{
        Swal.fire('No se pudo agregar el Usuario')
    })
}

    return (
        <div className="form-group" class="col-auto bg-danger p-5 text-center">
             <form>

            <label fo="fname">Usuario:</label><br/>
            <input type="text" onChange={
                (e)=>{
                    setUsuario(e.target.value);
                }
            }/><br/>
            <label fo="lname">Password:</label><br/>
            <input type="password" id="lname"onChange={
                (e)=>{
                    setPass(e.target.value);
                }
            }/><br/>
            <label fo="lname">Tipo de Usuario:</label><br/>
            <select name="Tipo_Usuario" onChange={(e)=>{
                
                setRol(e.target.options.selectedIndex+1);
                console.log(e.target.options.selectedIndex+1);
            }}>
                <option key={0} value={``}>Seleccionar Tipo</option>
            {roles.map((index)=>{
                return <option key={index.id_Tipo} value={index.Nombre}>{index.Nombre}</option>
            })}

            </select><br/>
            <label fo="lname">Departamento al que pertenecera:</label><br/>
            <select name="Departamentos" onChange={(e)=>{
                
                setRolD(e.target.options.selectedIndex);
                console.log(e.target.options.selectedIndex);
            }}>
                <option key={0} value={``}>Seleccionar Departamento</option>
            {departamentos.map((index)=>{
                return <option key={index.id_Departamento} value={index.Nombre}>{index.Nombre}</option>
            })}

            </select><br/>
            <button className="btn btn-primary" onClick={(e)=>{
                e.preventDefault();
                Submit();
            }}>Registrar</button> <br/>
            </form>
            <br/>
            <Link to="/Admin">
            <button className="btn btn-success" >Regresar
            </button>
            </Link>

            
            
        </div>
    )
}

export default Admin


