import { Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState,useContext} from 'react';
import Axios from "axios";
import Carrusel from "./Carrusel.js";
import AuthContext from '../Context/UsuarioData.js';

function Home() {
  const {user} = useContext(AuthContext);
  console.log('Usuario '+user.id_Tipo);
  const [puestos, setPuestos] = useState([]);
  const [puestos2, setPuestos2] = useState([]);
  

    useEffect(()=>{
      Axios.get("http://localhost:3001/Admin/getPuestos",{
      }).then((puestos)=>{
          setPuestos(puestos.data);
          setPuestos2(puestos.data);
      }).catch((err)=>{
          setPuestos2([]);
          setPuestos([]);
      });
      },[]);


      const updatePuestos = async (busqueda) =>{
        const filtroP = puestos.filter(index =>{
          return index.Nombre.toLowerCase().includes(busqueda.toLowerCase())
        })
        setPuestos2(filtroP);
      }


      function redirection (tipo,entrada){
        switch (tipo) {
            case 1:
                return `/Admin` 
                break;
            case 4:
                return `/Revisor`
                break;
            case 5:
              console.log('Entrada: '+entrada);
              if(entrada === 0){
                return `/Usuario`
              }else{
                return `/Usuario2`
              }
              break;
            default:
                return `/Login`
                break;
        }
    }

 
  //const {user} = useContext(AuthContext)
  return (
      
    <div className="container-app">
      {console.log('Render')}
      <div className="nav-container">{/* <Navbar/> */}
      <div>
        <Link  to={redirection(user.id_Tipo,user.Entrada)}>
          <button className="btn btn-primary">
          Ir a Menu</button>
        </Link>
      </div>
      <div>
        <Link to="/Login">
          <button className="btn btn-success">Login</button>
        </Link>
        </div>
      </div>
      <div className="main-component">
        <div className="controls-carousel">
          <form>
            <input
              className="input"
              type="text"
              placeholder="Busca los puestos disponibles aqui: Ej.Contador Publico "
              name="username"
              onChange={(e) => {
                updatePuestos(e.target.value)
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                //filtrado();
              }}
            >
              Search
            </button>
          </form>
        </div>
        <div className="filters-carousel">
          <div className="radios-carousel">
            <div>
              <input
                className="radio-btn"
                type="radio"
                id="huey"
                name="drone"
                value="huey"
              />
              <label for="huey">Q 0 a 2000</label>
            </div>

            <div>
              <input
                className="radio-btn"
                type="radio"
                id="dewey"
                name="drone"
                value="dewey"
              />
              <label for="dewey">Q 2000 a Q 5000</label>
            </div>

            <div>
              <input
                className="radio-btn"
                type="radio"
                id="louie"
                name="drone"
                value="louie"
              />
              <label for="louie">Q5000 o mas </label>
            </div>
          </div>
        </div>
      </div>
      <Carrusel listaPuestos={puestos2}/>
     
    </div>
  );
}

export default Home;
