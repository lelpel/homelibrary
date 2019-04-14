import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

export default function Header() {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">
        <h1>Home Library</h1>
      </NavbarBrand>
    </Navbar>
  );
}
