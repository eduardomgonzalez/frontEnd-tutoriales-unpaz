import React, { Component } from "react";
import "./styles/CreateTutorial.scss";
import axios from "axios";
import Swal from "sweetalert2";
import Error from "../components/Error";

class CreateTutorial extends Component {
  state = {
    titulo: "",
    descripcion: "",
    publicado: false,
    error: false,
  };

  addTutorial = async (e) => {
    e.preventDefault();

    const { titulo, descripcion } = this.state;

    // Validar que los campos no esten vacíos. Sino muestra mensaje error
    if (titulo.trim() === "" || descripcion.trim() === "") {
      this.setState({ error: true });
      return;
    }

    await Swal.fire({
      title: "Estás seguro?",
      text: "Agregará un tutorial",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Agregar!",
      cancelButtonText: "Cancelar",
      // Button styles
      buttonsStyling: false,
      customClass: {
        confirmButton: "confirm-btn",
        cancelButton: "cancel-btn",
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: "Agregado!",
          text: "Acaba de agregar el tutorial",
          icon: "success",
          // Button styles
          buttonsStyling: false,
          customClass: {
            confirmButton: "confirm-btn",
            cancelButton: "cancel-btn",
          },
        });
        this.getTutorial();
      }
    });
  };

  getTutorial = async () => {
    const newTutorial = {
      titulo: this.state.titulo,
      descripcion: this.state.descripcion,
      publicado: this.state.publicado,
    };

    await axios.post(
      "https://api-unpaz-tutoriales.herokuapp.com/api/tutoriales",
      newTutorial
    );

    setTimeout(() => {
      window.location.href = "/";
    }, 1100);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { titulo, descripcion, error } = this.state;

    return (
      <div className="col-md-6 offset-md-3 create-tutorial animate__animated animate__zoomIn">
        {/* Error */}
        {error ? <Error /> : null}

        <div className="card card-body">
          <h4>Crea un Tutorial</h4>
          <form onSubmit={this.addTutorial}>
            {/* Note Title */}
            <div className="form-group">
              <input
                type="text"
                name="titulo"
                className="form-control"
                placeholder="Título"
                value={titulo}
                onChange={this.handleChange}
              />
            </div>
            {/* Note Content */}
            <div className="form-group">
              <textarea
                name="descripcion"
                className="form-control"
                placeholder="Descripción"
                value={descripcion}
                onChange={this.handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Agregar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateTutorial;
