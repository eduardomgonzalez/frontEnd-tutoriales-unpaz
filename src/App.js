import React from "react";
import "./App.scss";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import Tutorials from "./pages/Tutorials";
import CreateTutorial from "./pages/CreateTutorial";
import EditTutorial from "./pages/EditTutorial";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/" exact component={Tutorials} />
        <Route path="/create" exact component={CreateTutorial} />
        <Route path="/edit/:id" exact component={EditTutorial} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
