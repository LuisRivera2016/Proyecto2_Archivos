import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import AuthContext from "../Context/UsuarioData.js";
import Swal from "sweetalert2";

function Requisitos() {
  let { idPuesto, dpi } = useParams();
  const { user } = useContext(AuthContext);
  const [requisitos, setRequisitos] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/Usuario/getRequisitos/${dpi}`, {})
      .then((usuarios) => {
        setRequisitos(usuarios.data);
      })
      .catch((err) => {
        setRequisitos([]);
      });
  }, []);

  function recorrerF(forms) {
    let cadena = "";
    forms.map((index) => {
      cadena += index.Formato + "\n";
    });
    return cadena;
  }

  function recorrerD(dat) {
    let cadena = "";
    cadena += "Tamano(MB) " + dat.Tamano + "\n";
    cadena += "Formato " + dat.Formato + "\n";

    console.log(cadena);
    return cadena;
  }

  //OBTENER FORMATOS ACEPTADOS PARA EL DOCUMENTO
  function obtenerFormatos(requisito) {
    Axios.get(
      `http://localhost:3001/Usuario/getFormatos/${requisito}/${idPuesto}`,
      {}
    )
      .then((usuarios) => {
        console.log(usuarios.data);
        Swal.fire("Formatos", `${recorrerF(usuarios.data)}`, "info");
      })
      .catch((err) => {
        alert("No se pudieron cargar los Formatos");
      });
  }

  //VER DATOS DE DOCUMENTO SUBIDO
  function obtenerDatosDocumento(requisito) {
    Axios.get(
      `http://localhost:3001/Usuario/getDatosDoc/${requisito}/${dpi}`,
      {}
    )
      .then((usuarios) => {
        console.log(usuarios.data);
        recorrerD(usuarios.data);
        Swal.fire("Datos: ", `${recorrerD(usuarios.data)}`, "info");
      })
      .catch((err) => {
        alert("No se pudieron cargar los Datos del Doc.");
      });
  }

  //VER DOCUMENTO SUBIDO
  const seleccionarDocumento = (documento) => {
    obtenerArchivo(documento);
  };

  const obtenerArchivo = async (doc) => {
    Axios.get(`http://localhost:3001/getDocumento2/${doc}/${dpi}`, {
      responseType: "blob",
    })
      .then((response) => {
        const file = new Blob([response.data], {
          //type: "application/pdf"
        });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //APROBAR DOCUMENTO
  function aprobarDoc(doc) {
    Axios.put("http://localhost:3001/Usuario/aprobarDoc", {
      requisito: doc,
      dpi: dpi
    })
      .then((e) => {
        alert("Se Aprobo el Documento");
      })
      .catch((err) => {
        alert("No se pudo Aprobar el Documento");
      });
  }
  //DESAPROBAR DOCUMENTO
  function desaprobarDoc(doc) {
    Swal.fire({
        title: `Motivo de Desaprobacion:`,
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
      }).then((resultado) => {
        if (resultado.value) {
          let motivo = resultado.value;
          desaprobar(doc,motivo);
        }
      });
  }

  function desaprobar(doc,motivo) {
    Axios.put("http://localhost:3001/Usuario/desaprobarDoc", {
        requisito: doc,
        dpi: dpi,
        motivo: motivo
      })
        .then((e) => {
          alert("Se Desaprobo el Documento");
        })
        .catch((err) => {
          alert("No se pudo Desaprobar el Documento");
        });
  }

  return (
    <div>
      <p>
        IDpuesto: {idPuesto} DPI: {dpi}
      </p>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Requisito</th>
            <th>Tamano(MB)</th>
            <th>Obligatorio</th>
            <th>Ver Formatos Aceptados</th>
            <th>Datos Documento Subido</th>
            <th>Ver Documento</th>
            <th>Aproba/Desaprobar</th>
          </tr>
        </thead>
        <tbody>
          {" "}
          {requisitos.map((index) => {
            return (
              <tr>
                <td>{index.Requisito}</td>
                <td>{index.Tamano}</td>
                <td>{index.Obligatorio}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      obtenerFormatos(index.Requisito);
                    }}
                  >
                    Ver Formatos
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      obtenerDatosDocumento(index.Requisito);
                    }}
                  >
                    Ver Datos del Documento
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      seleccionarDocumento(index.Requisito);
                    }}
                  >
                    Ver Documento Subido
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      aprobarDoc(index.Requisito);
                    }}
                  >
                    Aprobar
                  </button>
                  {"  "}
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      desaprobarDoc(index.Requisito);
                    }}
                  >
                    Desaprobar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <br />
      <Link to="/Revisor">
        <button className="btn btn-success">Regresar</button>
      </Link>
      <br />
      <br />
    </div>
  );
}

export default Requisitos;
