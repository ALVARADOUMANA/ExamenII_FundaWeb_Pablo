import React from 'react';
import { 
  Navbar, 
  NavbarBrand, 
  Nav, 
  NavItem, 
  NavLink, 
  Container 
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Info, 
  Settings 
} from 'react-feather';

const MyNavbar = () => {
  return (
    <Navbar 
      dark 
      expand="md" 
      className="py-3" 
      style={{ 
        backgroundColor: '#1E3A23', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
      }}
    >
      <Container fluid="lg" className="d-flex justify-content-between align-items-center">
        <NavbarBrand 
          href="/" 
          className="d-flex align-items-center"
          style={{ 
            fontWeight: 600, 
            letterSpacing: '1px', 
            fontSize: '1.5rem' 
          }}
        >
          <img 
            src="/UNA.svg"
            alt="Logo" 
            style={{ 
              height: '40px', 
              marginRight: '10px' 
            }} 
          />
          Programación Web
        </NavbarBrand>
        <Nav className="order-md-last" navbar>
          <NavItem className="mx-2">
            <NavLink 
              tag={Link} 
              to="/tabla_empleados" 
              className="d-flex align-items-center"
            >
              <Info className="me-2" size={20} />
              Tabla Empleados
            </NavLink>
          </NavItem>
          <NavItem className="mx-2">
            <NavLink 
              tag={Link} 
              to="/" 
              className="d-flex align-items-center"
            >
              <Home className="me-2" size={20} />
              Home
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;