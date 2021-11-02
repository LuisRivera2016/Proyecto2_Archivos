import { useState } from 'react';
import {useParams,Redirect,Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from 'axios'


function FormularioAplicante() {

    const {idPuesto,nombre,idDepartamento} = useParams();
    
    //---------------------------------------------------------
    const [files, setFiles] = useState([]);
    const [redireccion, setRedireccion] = useState(false);
    console.log(idDepartamento);
    const saveFile = (e) => {
      setFiles(e.target.files);
    };

    // if(redireccion){

    //   console.log('es true');
    //   <Redirect to='/'/>
    // }
  
    function ValidationErrors(values) {
      let err='';
      if(values.DPI.length !== 13 || isNaN(values.DPI)){
          return err='Dpi invalido';
      }
      if(!/\S+@\S+\.\S+/.test(values.Correo)){
          return err='Correo invalido'
      }
      if(values.Telefono.length!==8|| isNaN(values.Telefono)){
          return err='numero de telefono invalido'
      }
      return err
      
  }
    

    const uploadFile = async (e) => { 
      e.preventDefault();

      const validacion = ValidationErrors(values);
      if(validacion == ''){
         //FORMULARIO
        // console.log(files.length);
        // for (let index = 0; index < files.length; index++) {
        //   formData.append(`archivo[${index}]`,files[index]);
          
        // }
        const formData = new FormData();
        formData.append('file',files[0]);
        formData.append('idPuesto',idPuesto);
        formData.append('idDepartamento',idDepartamento);
        formData.append('Nombre',values.Nombre);
        formData.append('Apellido',values.Apellido);
        formData.append('DPI',values.DPI);
        formData.append('Correo',values.Correo);
        formData.append('Direccion',values.Direccion);
        formData.append('Telefono',values.Telefono);

      try {
        const res = await Axios.post(
          "http://localhost:3001/aplicar",
          formData,{
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then((res)=>{
          console.log(res);
          Axios.post("http://localhost:3001/Usuario/insertarRevision",{
            dpi: values.DPI,
            departamento: idDepartamento
          }).then((res)=>{
            alert('GRACIAS POR APLICAR SE LE NOTIFICARA POR CORREO SU RESPUESTA');
            setRedireccion(true);
          })
          
        });
        
      } catch (ex) {
        console.log(ex);
      }
      }else{
        alert(validacion);
      }

      
       
        
    };
    //-------------------------------------------------------------
    
    // console.log(puesto);

    const handleFormSubmit = (event) =>{
      event.preventDefault();
      console.log(values);
  };

  const handleChange = (event)=>{
      setvalues({
          ...values,
          [event.target.name]: event.target.value,
      });
  };

  
  
  const [values, setvalues] = useState({
      Nombre:"",
      Apellido:"",
      DPI:"",
      Correo:"",
      Direccion:"",
      Telefono:""
  });

return (
  <div className="div-form">
    <div>
      <p>Puesto a Aplicar: {nombre}</p>
    </div>
    <div className="form-register">
      <form>
        <div className="field">
          <label className="label">Nombre</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Example: Juan "
              name="Nombre"
              value={values.Nombre}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Apellido</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Example: Khalifa "
              name="Apellido"
              value={values.Apellido}
              onChange={handleChange}
            />
          </div>
          
        </div>
        <div className="field">
          <label className="label">DPI</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Example: 9999 "
              name="DPI"
              value={values.DPI}
              onChange={handleChange}
            />
          </div>
         
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Example: Khalifa@xxx.com "
              name="Correo"
              value={values.Correo}
              onChange={handleChange}
            />
          </div>
        
        </div>

        <div className="field">
          <label className="label">Direccion</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Example: Calle 12 "
              name="Direccion"
              value={values.Direccion}
              onChange={handleChange}
            />
          </div>
        
        </div>
        <div className="field">
          <label className="label">Telefono</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Example: 3040 "
              name="Telefono"
              value={values.Telefono}
              onChange={handleChange}
            />
          </div>
        
        </div>
        <div>
        <input type="file" multiple onChange={saveFile} />
        </div>
        <button className="btn-primary" onClick={handleFormSubmit,uploadFile}>
          APLICAR
        </button><br/>
        <Link to="/">
          <button className="btn btn-success">Regresar</button>
        </Link>
      </form>
    </div>
  </div>
  );
}

export default FormularioAplicante;
