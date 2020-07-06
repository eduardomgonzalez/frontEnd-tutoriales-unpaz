import React, { Component } from "react";
import "./styles/EditTutorial.scss";
import axios from "axios";
import Swal from "sweetalert2";
import Error from "../components/Error";

class EditTutorial extends Component {
  state = {
    titulo: "",
    descripcion: "",
    publicado: false,
    update: false,
    delete: false,
    error: false,
  };

  async componentDidMount() {
    this.getTutorial();
  }

  // Traigo el tutorial con el id y lleno los campos en el estado
  // para que me aparezcan todos los campos del tutorial a editar
  getTutorial = async () => {
    try {
      const res = await axios.get(
        `https://api-unpaz-tutoriales.herokuapp.com/api/tutoriales/${this.props.match.params.id}`
      );

      this.setState({
        titulo: res.data.titulo,
        descripcion: res.data.descripcion,
        publicado: res.data.publicado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Genero una objeto con los datos del tutorial
  createTutorial = () => {
    const tutorial = {
      titulo: this.state.titulo,
      descripcion: this.state.descripcion,
      publicado: this.state.publicado,
    };

    return tutorial;
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const { titulo, descripcion } = this.state;

    // Validar que los campos no esten vacíos. Sino muestra mensaje error
    if (titulo.trim() === "" || descripcion.trim() === "") {
      this.setState({ error: true });
      return;
    }

    this.setState({ error: false });

    // Si Actualizo
    if (this.state.update) {
      this.setState({ update: false });
      Swal.fire({
        title: "Estás seguro?",
        text: "Actualizará el tutorial",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Actualizar!",
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
            title: "Actualizado!",
            text: "Acaba de actualizar el tutorial",
            icon: "success",
            // Button styles
            buttonsStyling: false,
            customClass: {
              confirmButton: "confirm-btn",
              cancelButton: "cancel-btn",
            },
          });
          this.updateTutorial();
        }
      });
    }
    // Si elimino
    if (this.state.delete) {
      this.setState({ delete: false });
      Swal.fire({
        title: "Estás seguro?",
        text: "Eliminará el tutorial",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!",
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
            title: "Eliminado!",
            text: "Acaba de eliminar el tutorial",
            icon: "success",
            // Button styles
            buttonsStyling: false,
            customClass: {
              confirmButton: "confirm-btn",
              cancelButton: "cancel-btn",
            },
          });
          this.deleteTutorial();
        }
      });
    }
  };

  // Publicar Tutorial
  handleClickPublish = () => {
    this.setState({
      publicado: !this.state.publicado,
      publish: false,
    });
  };

  // Actualizar Tutorial
  handleClickUpdate = () => {
    this.setState({ update: true, publish: false, delete: false });
  };

  updateTutorial = async () => {
    const tutorial = this.createTutorial();
    await axios.put(
      `https://api-unpaz-tutoriales.herokuapp.com/api/tutoriales/${this.props.match.params.id}`,
      tutorial
    );

    setTimeout(() => {
      window.location.href = "/";
    }, 1100);
  };

  // Eliminar Tutorial
  handleClickDelete = () => {
    this.setState({ delete: true, publish: false, update: false });
  };

  deleteTutorial = async () => {
    await axios.delete(
      `https://api-unpaz-tutoriales.herokuapp.com/api/tutoriales/${this.props.match.params.id}`
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
    const { titulo, descripcion, publicado, error } = this.state;

    return (
      <div className="col-md-6 offset-md-3 edit-tutorial">
        {/* Error */}
        {error ? <Error /> : null}
        <div className="card card-body animate__animated animate__zoomIn">
          <h4>Editar Tutorial</h4>
          <form onSubmit={this.onSubmit}>
            {/* Note Title */}
            <div className="form-group">
              <label htmlFor="">
                <strong>Título</strong>
              </label>
              <input
                type="text"
                name="titulo"
                className="form-control"
                placeholder="Título"
                value={titulo}
                /* required */
                onChange={this.handleChange}
              />
            </div>
            {/* Note Content */}
            <div className="form-group">
              <label htmlFor="">
                <strong>Descripción</strong>
              </label>
              <textarea
                name="descripcion"
                className="form-control"
                placeholder="Descripción"
                value={descripcion}
                /* required */
                onChange={this.handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="">
                <strong>Estado</strong>
              </label>
              {publicado ? (
                <h4 className="edit-published">Publicado</h4>
              ) : (
                <h4 className="edit-pending">Pendiente</h4>
              )}
            </div>

            <div className="buttons">
              <button
                className={publicado ? "btn btn-warning" : "btn btn-success"}
                onClick={() => {
                  this.handleClickPublish();
                }}
              >
                {publicado ? "Pasar a Pendiente" : "Publicar Tutorial"}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.handleClickUpdate();
                }}
              >
                Actualizar Tutorial
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.handleClickDelete();
                }}
              >
                Eliminar Tutorial
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditTutorial;
