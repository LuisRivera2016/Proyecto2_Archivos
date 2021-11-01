import { Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState} from 'react';
import Axios from "axios";
import Carrusel from "./Carrusel.js";

function Home() {
  
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


  

 
  //const {user} = useContext(AuthContext)
  return (
    <div className="container-app">
      <div className="nav-container">{/* <Navbar/> */}</div>
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
      <div>
        <Link to="/Login">
          <button className="btn btn-success">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
