import { useEffect,useState ,useContext} from 'react';
import Axios  from 'axios';
import React from 'react'
import {Link,Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'; 
import AuthContext from '../Context/UsuarioData.js';


function Login() {
    const  {setNombre:setUsuario,setPass,RedirectC:redireccion,SubmitForm} = useContext(AuthContext);

    if(redireccion){
      return <Redirect to="/"/>
    }

  return (
    <div class="d-flex flex-row justify-content-center alig-items-center">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Usuario</label>
          <input
            type="text"
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
            //console.log( `useer: ${usuario} pass: ${pass}`);
            SubmitForm();
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