import { useEffect,useState } from 'react';
import Axios  from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'; 

function Admin() {
    const [roles, setRoles] = useState([]);
    const [usuario, setUsuario] = useState("");
    const [pass, setPass] = useState("");
    const [rol, setRol] = useState(0);

    useEffect(()=>{
        Axios.get("http://localhost:3001/Admin/getRoles",{
        }).then((roles)=>{
            setRoles(roles.data);
        }).catch((err)=>{
            setRoles([]);
        });
    },[])

const Submit = ()=>{
    console.log(rol);
    Axios.post("http://localhost:3001/Admin/insertar",{
        Nombre: usuario,
        Password: pass,
        id_Tipo: rol
    }).then(()=>{
        console.log('Se inserto');
    }).catch((e)=>{
        console.log('No inserto');
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
        
            <select name="Tipo_Usuario" onChange={(e)=>{
                
                setRol(e.target.options.selectedIndex+1);
                console.log(e.target.options.selectedIndex+1);
            }}>
            {roles.map((index)=>{
                return <option key={index.id_Tipo} value={index.Nombre}>{index.Nombre}</option>
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


