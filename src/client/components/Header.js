import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

export default function Header() {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">
        <h2>Home Library</h2>
      </NavbarBrand>
    </Navbar>
  );
}
