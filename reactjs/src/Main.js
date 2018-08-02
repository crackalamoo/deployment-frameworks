import React, { Component } from "react";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";
// This is the main file

class Main extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="content">
            <Route path="/home" component={Home}} />
            <Route path="/stuff" component={Stuff}/>
            <Route path="/contact" component={Contact}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
