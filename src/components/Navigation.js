import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles/Navigation.scss";
import Logo from "../assets/img/logo.png";

class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex animate__animated animate__slideInDown">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="Logo" className="navbar-logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active ">
                <Link className="nav-link" to="/">
                  Tutoriales
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  Agregar Tutorial
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
