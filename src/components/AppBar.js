import React, { Component } from "react";
import "./AppBar.css";
import { Consumer } from "../context";

export default class AppBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  refreshPage = (dispatch,e) => {
    console.log("REFRESH PAGE");
    dispatch({
      type:"REFRESH_PAGE",
      payload: []
    })
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <nav
              className="navbar navbar-dark bg-dark mb-5"
              onClick={this.refreshPage.bind(this,dispatch)}
            >
              <span className="navbar-brand mb-0 h1 mx-auto" id="navbar">
                Noisely
              </span>
            </nav>
          );
        }}
      </Consumer>
    );
  }
}
