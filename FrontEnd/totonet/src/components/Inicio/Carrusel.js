import React from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Swal from "sweetalert2";

function Carrusel({ listaPuestos }) {
  const carousel = useRef(null);
  const [calificacion, setCalificacion] = useState(5);
  const [puesto, setPuesto] = useState(0);
  const [calificacionP, setCalificacionP] = useState(5);

  function obtenerCalificacion(puesto) {
    console.log(puesto);
    setPuesto(puesto);
    Axios.get(`http://localhost:3001/Usuario/getCalificacion/${puesto}`, {
      id_Puesto: puesto,
    })
      .then((cali) => {
        Swal.fire({
          title: `Calificacion Actual: ${cali.data.calificacion} Estrellas`,
          input: "text",
          showCancelButton: true,
          confirmButtonText: "Calificar",
          cancelButtonText: "Cancelar",
        }).then((resultado) => {
          if (resultado.value) {
            let nombre = resultado.value;
            calificar(puesto,nombre);
          }
        });
      })
      .catch((err) => {
        setCalificacion(5);
      });
  }

  const calificar = (puesto,calificacion) => {
    Axios.post("http://localhost:3001/Usuario/insertCalificacion", {
      Puesto: puesto,
      Calificacion: calificacion,
    })
      .then(() => {
        alert("Puesto Calificado");
      })
      .catch((err) => {
        alert("Puesto no Calificado");
      });
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };

  const verificarImagen = (Imagen) => {
    if (Imagen) {
      return Imagen;
    } else {
      return `https://res.cloudinary.com/alex4191/image/upload/v1635407688/totonet/free_job_alert_20192_kos7gs.jpg`;
    }
  };

  return (
    <div className="container-carousel">
      <div className="carousel" ref={carousel}>
        {listaPuestos.map((item) => {
          const { id_Puesto, Nombre, Salario, Imagen, NombreDep,id_Departamento} = item;
          return (
            <div className="item" key={id_Puesto}>
              <div className="image">
                <img src={verificarImagen(Imagen)} alt="Imagen Puesto" />
              </div>
              <div className="info">
                <span className="name">{NombreDep}</span>
                <span className="name">{Nombre}</span>
                <span className="oldPrice">Q. {Salario}</span>
                <span>
                  <button
                    onClick={(e) => {
                      obtenerCalificacion(id_Puesto);
                    }}
                  >
                    Calificar
                  </button>
                </span>
                <span>
                  <Link className="" to={`/Formulario/${id_Puesto}/${Nombre}/${id_Departamento}`}>
                    Aplicar
                  </Link>
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <button onClick={handleLeftClick}>
          <img
            src="/static/images/216151_right_chevron_icon.png"
            alt="Scroll Left"
          />
        </button>
        <button onClick={handleRightClick}>
          <img
            src="/static/images/216151_right_chevron_icon.png"
            alt="Scroll Right"
          />
        </button>
      </div>
    </div>
  );
}

export default Carrusel;
