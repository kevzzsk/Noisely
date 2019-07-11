import React, { Component } from "react";
import "./AppBar.css";
import { Consumer } from "../context";
import { Link } from "react-router-dom";

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

  refreshPage = (dispatch, e) => {
    console.log("REFRESH PAGE");
    dispatch({
      type: "REFRESH_PAGE",
      payload: []
    });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <Link to="/" className="text-decoration-none">
              <nav
                className="navbar navbar-dark bg-dark mb-5"
                onClick={this.refreshPage.bind(this, dispatch)}
              >
                <span className="navbar-brand mb-0 h1 mx-auto" id="navbar">
                  Noisely
                </span>
              </nav>
            </Link>
          );
        }}
      </Consumer>
    );
  }
}
