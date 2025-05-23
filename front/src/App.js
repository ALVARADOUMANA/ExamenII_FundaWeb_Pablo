// src/App.js 
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MyNavbar from './components/Navbar';
import BreadcrumbContent from './components/BreadcrumbContent';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';  
import NuevaCulture from './pages/NuevaCulture';
import TablaCultures from './pages/TablaCultures';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import { Container } from 'reactstrap';
import { isAuthenticated } from './hooks/useAuth';

const App = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  // Función para comunicar el estado del sidebar
  const handleSidebarToggle = (isExpanded) => {
    setSidebarExpanded(isExpanded);
  };

  // Componente para rutas públicas (login, signup)
  const PublicRoute = ({ children }) => {
    const authenticated = isAuthenticated();
    
    if (authenticated) {
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  // Layout para páginas autenticadas
  const AuthenticatedLayout = ({ children }) => (
    <div className="d-flex">
      <Sidebar onToggle={handleSidebarToggle} />
      <div className="content-wrapper" style={{ 
        marginLeft: sidebarExpanded ? '250px' : '70px', 
        width: `calc(100% - ${sidebarExpanded ? '250px' : '70px'})`,
        transition: 'margin-left 0.3s, width 0.3s',
        minHeight: '100vh' 
      }}>
        <MyNavbar />
        <Container fluid className="p-4">
          <BreadcrumbContent />
          {children}
        </Container>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } 
        />

        {/* Rutas protegidas */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <HomePage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/crear_culture" 
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <NuevaCulture />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/tabla_cultures" 
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <TablaCultures />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />

        {/* Ruta por defecto - redirigir según el estado de autenticación */}
        <Route 
          path="*" 
          element={
            isAuthenticated() ? 
              <Navigate to="/" replace /> : 
              <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;