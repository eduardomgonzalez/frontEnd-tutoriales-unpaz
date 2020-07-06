import React, { Component } from "react";
import "./styles/TutorialItems.scss";
import SearchTutorial from "./SearchTutorial";
import { DesktopMac } from "@material-ui/icons";

class TutorialItems extends Component {
  render() {
    const {
      tutorials,
      handleClickDelete,
      search,
      handleChangeSearch2,
      handleClick,
    } = this.props;

    return (
      <div>
        {tutorials.length > 0 ? (
          <div className="tutorials-list animate__animated animate__slideInLeft">
            <SearchTutorial
              style={{ fontSize: "10px" }}
              search={search}
              handleChangeSearch2={handleChangeSearch2}
            />
            <div className="title">
              <h4 className="text-light font-weight-bold">Tutoriales</h4>
            </div>
            <div className="list-group" id="list-tab" role="tablist">
              {tutorials.map((tutorial) => (
                <a
                  className="list-group-item list-group-item-action"
                  id={`list-${tutorial.id}-list`}
                  data-toggle="list"
                  href={`#list-${tutorial.id}`}
                  role="tab"
                  aria-controls={tutorial.id}
                  key={tutorial.id}
                  onClick={handleClick}
                >
                  <DesktopMac
                    color="primary"
                    fontSize="default"
                    className="search-icon"
                    style={{ paddingLeft: "5px" }}
                  />

                  {tutorial.titulo}
                </a>
              ))}
            </div>
            <button
              className="btn btn-danger"
              onClick={() => handleClickDelete()}
            >
              Eliminar Todos
            </button>
          </div>
        ) : (
          <h4 className="tutorials-message">No hay tutoriales</h4>
        )}
      </div>
    );
  }
}

export default TutorialItems;
