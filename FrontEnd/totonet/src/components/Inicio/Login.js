import { useEffect,useState ,useContext} from 'react';
import Axios  from 'axios';
import React from 'react'
import {Link,Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'; 
import {UserContexto} from '../Context/UsuarioData.js';


function Login() {
    const [usuario, setUsuario] = useState("");
    const [pass, setPass] = useState("");
    const {setUser} = useContext(UserContexto);
    const [redireccion, setRedireccion] = useState(false);

    const Submit = ()=>{
        Axios.post("http://localhost:3001/Login",{
            Nombre: usuario,
            Password: pass
        }).then((res)=>{
            setUser(res.data);
            setRedireccion(true);
            console.log('Si existe usuario');
        }).catch((e)=>{
            console.log('No existe usuario');
        })
    }

    if(redireccion){
      return <Redirect to="/"/>
    }

  return (
    <div class="d-flex flex-row justify-content-center alig-items-center">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Usuario</label>
          <input
            type="texxt"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Ingresar Usuario"
            onChange={(e) => {
              setUsuario(e.target.value);
            }}
          ></input>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          ></input>
          <br />
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            console.log( `useer: ${usuario} pass: ${pass}`);
            Submit();
          }}
        >
          Ingresar
        </button><br/><br/>
        <Link to="/">
          <button className="btn btn-success" >Regresar</button>
        </Link>
      </form>
    </div>
  );
}

export default Login;