import React from 'react'
import Axios  from 'axios';
import { useEffect,useState ,useContext} from 'react';
import {UserContexto} from '../Context/UsuarioData.js';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'; 



function Reportes() {
    const [cadenaA, setCadenaA] = useState("");

    useEffect(()=>{
        Axios.get("http://localhost:3001/Arbol",{
        }).then((cadena)=>{
            console.log(cadena.data.message);
            setCadenaA(cadena.data.message);
        }).catch((err)=>{
            setCadenaA("");
        });
    },[])


    return (
      <div>
        <div id="graph">
        <img className="img-fluid" src={`/imageArbol.png`}/>
        </div>
        <Link to="/Admin">
          <button className="btn btn-success">Regresar</button>
        </Link>
      </div>
    );
}

export default Reportes