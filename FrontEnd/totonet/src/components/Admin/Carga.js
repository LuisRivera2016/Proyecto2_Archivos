import React from 'react'
import { useEffect,useState ,useContext} from 'react';
import AuthContext from '../Context/UsuarioData.js';
import {Link} from 'react-router-dom';
import Axios from 'axios'


function Carga() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
  
    const saveFile = (e) => {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);;
    };
  

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
          <Link to="/Admin">
            <button className="btn btn-primary float-right">Regresar</button>
          </Link>
       
    </div>
  );
}

export default Carga