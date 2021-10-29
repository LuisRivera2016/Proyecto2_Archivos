//import AuthContext from '../components/Context/GlobalState.js';
//import { Link } from 'react-router-dom';
//import Navbar from '../components/Navbar/NavbarComponent.js'
//import CardPuesto from '../components/Puestos/CardPuesto.js'
//import { useContext } from 'react';
import {Link,Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'; 
import AuthContext from '../Context/UsuarioData.js';
import { useEffect, useState, useRef } from 'react';
import  Axios   from 'axios';
function Home() {
    const [data, setData] = useState([]);
    const carousel = useRef(null);
    const [puestos, setPuestos] = useState([]);
    const [puestoF, setPuestoF] = useState("");
    const [filtro, setFiltro] = useState(false);

  

  //   useEffect(()=>{
  //     Axios.get("http://localhost:3001/Admin/getPuestos",{
  //     }).then((puestos)=>{
  //         setPuestos(puestos.data);
  //     }).catch((err)=>{
  //         setPuestos([]);
  //     });
  // },[])

    

    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    };


    useEffect(() => {
        console.log('envio: '+puestoF);
          Axios.get("http://localhost:3001/Admin/getPuestos",{
            Nombre: puestoF  
          }).then((puestos)=>{
            setPuestos(puestos.data);
          }).catch((err)=>{
            setPuestos([]);
        });
        
    }, [filtro])

    const handleRightClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    };

    const verificarImagen = (Imagen)=>{
      if(Imagen){
        return Imagen;
      }else{
        return `https://res.cloudinary.com/alex4191/image/upload/v1635407688/totonet/free_job_alert_20192_kos7gs.jpg`;
      }
    }

    if (!puestos || !puestos.length) return null;
    //const {user} = useContext(AuthContext)
    return (
        <div className="container-app">
            <div className="nav-container">
                {/* <Navbar/> */}
            </div>
        <div className="main-component">
          <div className="controls-carousel">
            <input className="input" type="text" placeholder="Busca los puestos disponibles aqui: Ej.Contador Publico " name="username" 
            onChange={(e) => {
              setPuestoF(e.target.value);
            }} />
            <button onClick={
                (e)=>{
                  e.preventDefault();
                  setFiltro(true);
                }
            }>Search</button>
            
          </div>
          <div className="filters-carousel">
            <div className="radios-carousel">
              <div>
                <input className="radio-btn" type="radio" id="huey" name="drone" value="huey"/>
                <label for="huey">Q 0 a 2000</label>
              </div>

              <div>
                <input className="radio-btn" type="radio" id="dewey" name="drone" value="dewey"/>
                <label for="dewey">Q 2000 a Q 5000</label>
              </div>

                <div>
                  <input className="radio-btn" type="radio" id="louie" name="drone" value="louie"/>
                  <label for="louie">Q5000 o mas </label>
                </div>

            </div>
          </div>
            <div className="container-carousel">
      <div className="carousel" ref={carousel}>
        {puestos.map((item) => {
          const { id_Puesto,Nombre, Salario, Imagen, NombreDep} = item;
          return (
            <div className="item" key={id_Puesto}>
              <div className="image">
                <img src={verificarImagen(Imagen)} alt="Imagen Puesto" />
              </div>
              <div className="info">
                <span className="name">U$ {NombreDep}</span>
                <span className="name">{Nombre}</span>
                <span className="oldPrice">U$ {Salario}</span>
                <span><button className="price">Aplicar</button> </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <button onClick={handleLeftClick}>
          <img src="/static/images/216151_right_chevron_icon.png" alt="Scroll Left" />
        </button>
        <button onClick={handleRightClick}>
          <img src="/static/images/216151_right_chevron_icon.png" alt="Scroll Right" />
        </button>
      </div>
            
            </div>        
        </div>
        <div>
        <Link to="/Login">
          <button className="btn btn-success" >Login</button>
        </Link>
        </div>
        </div>
    )
}

export default Home
