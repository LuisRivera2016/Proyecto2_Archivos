import React from 'react'
import { useEffect,useState ,useContext} from 'react';
import AuthContext from '../Context/UsuarioData.js';
import {Link} from 'react-router-dom';
import Axios from 'axios'


function Carga() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [verDatos, setVerDatos] = useState(null);
  
    const saveFile = (e) => {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);;
    };
  

    

    function lista() {

        Axios.get("http://localhost:3001/getInsertados"
      ).then((res)=>{
        setVerDatos(res.data);
      }).catch((err)=>{
        console.log(err);
        return(<p>NO se pudieron obtner los datos que se insertaran</p>);
      });
      
    
    }

    function mapear(datos) {
      console.log('ENtro a Mapear');
      console.log(datos.Departamentos);
      return (
        <div>
          <h1>Datos que se Insertaron:</h1>
          <h2>-Departamentos:</h2>
          <h3>No: {datos.Departamentos.length}</h3>
          <ul>
            {datos.Departamentos.map((index)=>{
              return(<li key={index[0]}>{index[1]}</li>)
            })}
          </ul>
          <h2>-Puestos:</h2>
          <h3>No: {datos.Puestos.length}</h3>
          <ul>
            {datos.Puestos.map((index)=>{
              return(<li key={index[0]}>{index[1]}</li>)
            })}
          </ul>
          <h2>-Categorias:</h2>
          <h3>No: {datos.Puestos.length}</h3>
          <ul>
            {datos.Categorias.map((index)=>{
              return(<li key={index[0]}>{index}</li>)
            })}
          </ul>
          <h2>-Requisitos:</h2>
          <h3>No: {datos.Requisitos.length}</h3>
          <ul>
            {datos.Requisitos.map((index)=>{
              return(<li key={index[0]}>{index}</li>)
            })}
          </ul>
          <h2>-Formatos:</h2>
          <h3>No: {datos.Formatos.length}</h3>
          <ul>
            {datos.Formatos.map((index)=>{
              return(<li key={index[0]}>{index}</li>)
            })}
          </ul>
        </div>
      );
    }

    const uploadFile = async (e) => {
      const formData = new FormData();
      formData.append("file",file);
      formData.append("fileName", fileName);
      try {
        console.log(fileName);
        const res = await Axios.post(
          "http://localhost:3001/upload",
          formData
        );
        console.log(res);
        lista();
      } catch (ex) {
        console.log(ex);
      }
    };

  return (
    <div>
      {/* <h1>Usuario:{user.Nombre}</h1><br/><br/> */}
      <div className="App">
        <input type="file" onChange={saveFile} />
        <button className="btn btn-primary" onClick={uploadFile}>Upload</button>

      </div>
          {verDatos ? mapear(verDatos) : <p>Esperando Carga de Datos...</p>}

          <Link to="/Admin">
            <button className="btn btn-primary float-right">Regresar</button>
          </Link>
       
    </div>
  );
}

export default Carga