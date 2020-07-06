import React, { Component } from "react";
import "./styles/Tutorials.scss";
import axios from "axios";
import Swal from "sweetalert2";
import TutorialList from "../components/TutorialList";

class Tutorials extends Component {
  state = {
    tutorials: [],
    copyTutorials: [],
    search: "",
  };

  componentDidMount() {
    this.getTutorials();
  }

  // Traigo todos los tutoriales de la API
  getTutorials = async () => {
    try {
      const res = await axios.get(
        "https://api-unpaz-tutoriales.herokuapp.com/api/tutoriales"
      );
      // Hago una copia de los tutoriales en el state para poder trabajar con ese array
      // Al original lo uso para filtrar sobre él solamente, ya que si filtro sobre el mismo array
      // en un momento va a tener nada o pocos items dentro
      this.setState({
        tutorials: res.data,
        copyTutorials: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /************************* Filtro desde el FRONTEND *********************/
  /*  handleChangeSearch = async (e) => {
    // Sin el await no funcionaba al 100 %
    await this.setState({ search: e.target.value });
    this.searchFilter();
  };

  searchFilter = () => {
    const newTutorials = [...this.state.tutorials];

    let filterTutorials = newTutorials.filter((item) => {
      return item.titulo
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
    });

    this.setState({ copyTutorials: filterTutorials });
  }; */

  /****************** Filtro CON OTRO ENDPOINT dede el backend con Query Params ************/
  handleChangeSearch2 = async (e) => {
    // Sin el await no funcionaba al 100 %
    await this.setState({ search: e.target.value });
    this.searchFilter2();
  };

  searchFilter2 = async () => {
    const valorABuscar = this.state.search.toLowerCase();

    try {
      const res = await axios.get(
        `https://api-unpaz-tutoriales.herokuapp.com/api/search?titulo=${valorABuscar}`
      );

      // Si trae algo me renderiza los datos. Sino me renderiza todos
      if (res.data.length !== 0) {
        this.setState({ copyTutorials: res.data });
      } else {
        this.setState({ copyTutorials: this.state.tutorials });
      }
    } catch (error) {
      console.log(error);
    }
  };
  /************** FIN FILTRO  ************/

  // Eliminar todos
  handleClickDelete = () => {
    Swal.fire({
      title: "Estás seguro?",
      text: "Eliminará todos los tutoriales",
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
          title: "Eliminados!",
          text: "Acaba de eliminar todos los tutoriales.",
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
  };

  deleteTutorial = async () => {
    try {
      await axios.delete(
        "https://api-unpaz-tutoriales.herokuapp.com/api/tutoriales"
      );
      // Actualizo interfaz
      this.getTutorials();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { search, copyTutorials } = this.state;

    return (
      <div className="tutorials">
        <TutorialList
          tutorials={copyTutorials}
          handleClickDelete={this.handleClickDelete}
          search={search}
          handleChangeSearch2={this.handleChangeSearch2}
        />
      </div>
    );
  }
}

export default Tutorials;
