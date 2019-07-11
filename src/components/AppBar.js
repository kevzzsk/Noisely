import React, { Component } from "react";

import "./AppBar.css";

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

  render() {
    return (
      <nav className='navbar navbar-dark bg-dark mb-5'>
          <span className='navbar-brand mb-0 h1 mx-auto' id="navbar">Noisely</span>
      </nav>
    );
  }
}
