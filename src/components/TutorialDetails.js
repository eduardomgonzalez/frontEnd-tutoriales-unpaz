import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles/TutorialDetails.scss";

class TutorialDetails extends Component {
  render() {
    const { tutorials } = this.props;

    return (
      <div className="tutorials-content">
        <div className="tab-content" id="nav-tabContent">
          {tutorials.map((tutorial) => (
            <div
              className="tab-pane fade show animate__animated animate__zoomIn"
              id={`list-${tutorial.id}`}
              role="tabpanel"
              aria-labelledby={`list-${tutorial.id}-list`}
              key={tutorial.id}
            >
              {/* CARD */}
              <div className="row ">
                <div className="col" key={tutorial.id}>
                  <div className="card">
                    <div className="card-header d-flex justify-content-between">
                      <h5>{tutorial.titulo}</h5>
                      <Link
                        className="btn btn-warning"
                        to={`/edit/${tutorial.id}`}
                      >
                        Editar
                      </Link>
                    </div>
                    <div className="card-body">
                      <p>
                        <strong>Descripción:</strong> {tutorial.descripcion}
                      </p>
                      <p>
                        {" "}
                        <strong>Estado:</strong>{" "}
                        {/* Si true "Publicado" sino "Pendiente" */}
                        {tutorial.publicado ? (
                          <strong>
                            <span className="edit-published">Publicado</span>
                          </strong>
                        ) : (
                          <strong>
                            <span className="edit-pending">Pendiente</span>
                          </strong>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* END CARD */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TutorialDetails;
