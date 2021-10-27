import { useEffect, useState } from 'react'
import Axios from 'axios'


function Carga() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [fileSize,setFileSize] = useState(0);
  
    const saveFile = (e) => {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setFileSize(e.target.files[0].size/1048576);
    };
  

    function getFileExtension(filename){
      return fileName.slice((fileName.lastIndexOf(".")-1 >>>0)+2);
    }

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
     
  });

    const uploadFile = async (e) => {
      var base64 = await toBase64(file);
      var archivo64 = base64.split(',');  
      try {
        const res = await Axios.post(
          "http://localhost:3001/Usuario/upload",{
            fileName: fileName,
            extension: getFileExtension(file),
            peso: fileSize,
            cadena: archivo64[1]
        });
        console.log(res);
      } catch (ex) {
        console.log(ex);
      }
    };
  
    return (
      <div className="App">
        <input type="file" onChange={saveFile} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    );
  }
  

export default Carga