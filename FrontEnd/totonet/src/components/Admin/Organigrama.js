import React from 'react'
import Axios  from 'axios';
import { useEffect,useState ,useContext} from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



function Reportes() {
    const [cadenaA, setCadenaA] = useState(null);

    function getImagen(){
        Axios.get("http://localhost:3001/Admin/Arbol",{
        }).then((cadena)=>{
            console.log(cadena.data);
            setCadenaA(cadena.data);
        }).catch((err)=>{
            setCadenaA(null);
        });
      }

    function imagen(){
      return (<img className="img-fluid" src={`${cadenaA}`}/>)
    }

    return (
      <div>
        <div id="graph">
        <img className="img-fluid" src={'/imageArbol.png'}/>
        </div>
        <div>
        <button className="btn btn-success" onClick={
                (e)=>{
                  e.preventDefault();
                  console.log('default');
                  getImagen()
                }
        }>Imagen</button>
        </div>
        <Link to="/Admin/Reportes">
          <button className="btn btn-success">Regresar</button>
        </Link>
      </div>
    );
}

export default Reportes