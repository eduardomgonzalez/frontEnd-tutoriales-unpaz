import React, { Component } from "react";
import "./styles/TutorialList.scss";
import TutorialItems from "./TutorialItems";
import TutorialDetails from "./TutorialDetails";
import "animate.css";

class TutorialList extends Component {
  state = {
    stateDetails: true,
  };

  handleClick = () => {
    this.setState({ stateDetails: false });
  };

  render() {
    const { stateDetails } = this.state;
    const {
      tutorials,
      handleClickDelete,
      search,
      handleChangeSearch2,
    } = this.props;
    return (
      <div className="row tutorials-container">
        {/* Lista de Tutoriales */}
        <TutorialItems
          tutorials={tutorials}
          handleClickDelete={handleClickDelete}
          search={search}
          handleChangeSearch2={handleChangeSearch2}
          handleClick={this.handleClick}
        />

        {/* Detalle de Tutoriales */}

        {stateDetails && (
          <div className="tutorials-title">
            <h1>Seleccione un Tutorial</h1>
          </div>
        )}

        <TutorialDetails tutorials={tutorials} />
      </div>
    );
  }
}

export default TutorialList;
