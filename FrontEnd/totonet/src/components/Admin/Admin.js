import { useEffect,useState } from 'react';
import Axios  from 'axios';
import React from 'react'


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
        <div>
             <form action="/action_page.php">

            <label for="fname">Usuario:</label>
            <input type="text" onChange={
                (e)=>{
                    setUsuario(e.target.value);
                }
            }/><br/>
            <label for="lname">Password:</label>
            <input type="password" id="lname"onChange={
                (e)=>{
                    setPass(e.target.value);
                }
            }/><br/>
            <button className='btn-register' onClick={(e)=>{
                e.preventDefault();
                Submit();
            }}>Registrar</button> <br/>
            <select name="Tipo_Usuario" onChange={(e)=>{
                setRol(e.target.options.selectedIndex+1);
            }}>
            {roles.map((index)=>{
                return <option key={index.id_Tipo} value={index.Nombre}>{index.Nombre}</option>
            })}

            </select>
            </form> 
            
        </div>
    )
}

export default Admin


