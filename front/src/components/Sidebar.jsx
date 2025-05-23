//front\src\components\Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { 
  Nav, 
  NavItem, 
  NavLink, 
  Button,
} from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Menu,
  FileText,
  BookOpen,
  ChevronLeft
} from 'react-feather';

const Sidebar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  
  // Comunica el estado del sidebar al componente padre
  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [isOpen, onToggle]);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: '/', icon: <Home size={18} />, label: 'Home' },
    { path: '/crear_culture', icon: <FileText size={18} />, label: 'Create Culture' },
    { path: '/tabla_cultures', icon: <BookOpen  size={18} />, label: 'Table Culture' }
  ];

  return (
    <div className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`} 
         style={{ 
           backgroundColor: '#1E3A23', 
           height: '100vh',
           position: 'fixed',
           left: 0,
           top: 0,
           width: isOpen ? '250px' : '80px', // Aumentado de 70px a 80px
           transition: 'width 0.3s',
           zIndex: 1030,
           boxShadow: '2px 0 5px rgba(0,0,0,0.2)'
         }}>
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center px-3 py-3 text-white">
        {isOpen ? (
          <Link to="/" className="text-decoration-none text-white d-flex align-items-center">
            <img 
              src="/UNA.svg"
              alt="Logo" 
              style={{ height: '30px', marginRight: '10px' }} 
            />
            <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>Prog. Web</span>
          </Link>
        ) : (
          <Link to="/" className="text-decoration-none text-white mx-auto">
            <img 
              src="/UNA.svg"
              alt="Logo" 
              style={{ height: '30px' }} 
            />
          </Link>
        )}
        <Button 
          color="link" 
          className="text-white p-0 border-0" 
          onClick={toggleSidebar}
          style={{ 
            backgroundColor: 'transparent',
            marginRight: isOpen ? '0' : '8px', // Añadimos margen derecho cuando está colapsado
            width: '24px',
            height: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      
      <hr className="bg-white opacity-25 my-2" />
      
      {/* Navigation */}
      <Nav vertical className="pt-2">
        {navItems.map((item) => (
          <NavItem key={item.path}>
            <NavLink 
              tag={Link} 
              to={item.path}
              className={`text-white ${location.pathname === item.path ? 'active' : ''}`}
              style={{ 
                backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent',
                borderLeft: location.pathname === item.path ? '4px solid white' : 'none',
                paddingLeft: location.pathname === item.path ? '10px' : '16px',
                paddingRight: isOpen ? '24px' : '16px', // Aumentado padding derecho
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isOpen ? 'flex-start' : 'center' // Centrar iconos cuando está colapsado
              }}
            >
              <div className={`d-flex align-items-center ${!isOpen ? 'justify-content-center w-100' : ''}`}>
                <span className={isOpen ? 'me-3' : ''}>{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </div>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      
      {/* Footer */}
      {isOpen && (
        <div className="position-absolute bottom-0 start-0 w-100 text-center text-white-50 py-3 small">
          <hr className="bg-white opacity-25" />
          Programación Web © 2025
        </div>
      )}
    </div>
  );
};

export default Sidebar;