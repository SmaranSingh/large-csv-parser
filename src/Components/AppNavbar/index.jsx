import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import React from "react";

const AppNavbar = props => (
  <Navbar expand="lg" sticky="top" bg="light-grey">
    <Link to="/">
      <Navbar.Brand>Games List</Navbar.Brand>
    </Link>
  </Navbar>
);

export default AppNavbar;
