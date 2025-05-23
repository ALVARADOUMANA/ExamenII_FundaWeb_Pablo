import React, { useState } from 'react';
import { User, Edit2, Trash2, DollarSign, Search, Plus, AlertCircle, Check } from 'react-feather';
import { 
  Container, Row, Col, Card, CardHeader, CardBody, Button, 
  Table, Alert, Spinner, Badge
} from 'reactstrap';
import EmpleadoModal from '../components/EmpleadoModal';
import useEmpleados from '../hooks/useEmpleados';

// Definimos los colores personalizados
const COLORS = {
  primary: '#3a5a40', // Verde musgo
  secondary: '#588157', // Verde musgo más claro
  success: '#386641', // Verde para éxito
  danger: '#bc4749', // Rojo para alertas/eliminar
  warning: '#dda15e', // Ámbar para editar
  light: '#f4f4f4', // Fondo claro
  dark: '#283618', // Verde oscuro
  white: '#ffffff',
  gray: '#6c757d'
};
//

const TablaEmpleados = () => {
  const {
    empleados,
    empleadoSeleccionado,
    loading,
    error,
    notification,
    fetchEmpleadoDetalle,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
    setEmpleadoSeleccionado,
    formatSalario
  } = useEmpleados();

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'create', 'delete'

  const handleOpenModal = async (mode, empleado = null) => {
    setModalMode(mode);
    
    if (mode === 'create') {
      setEmpleadoSeleccionado(null);
    } else if (empleado) {
      await fetchEmpleadoDetalle(empleado.empleadoId);
    }
    
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmpleadoSeleccionado(null);
  };

  const handleSubmit = async (formData) => {
    let success = false;
    
    switch (modalMode) {
      case 'create':
        success = await createEmpleado(formData);
        break;
      case 'edit':
        success = await updateEmpleado({
          empleadoId: empleadoSeleccionado.empleadoId,
          ...formData
        });
        break;
      case 'delete':
        success = await deleteEmpleado(empleadoSeleccionado.empleadoId);
        break;
      default:
        break;
    }
    
    if (success) {
      handleCloseModal();
    }
  };

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4 align-items-center">
        <Col>
          <div className="d-flex align-items-center">
            <User size={24} className="me-2" style={{ color: COLORS.primary }} />
            <h1 className="mb-0 fs-2 fw-bold" style={{ color: COLORS.dark }}>
              Administración de Empleados
            </h1>
          </div>
        </Col>
        <Col xs="auto">
          <Button
            color="primary"
            className="d-flex align-items-center"
            style={{ backgroundColor: COLORS.primary, borderColor: COLORS.primary }}
            onClick={() => handleOpenModal('create')}
          >
            <Plus size={18} className="me-1" />
            Nuevo Empleado
          </Button>
        </Col>
      </Row>
      
      {/* Notification */}
      {notification.show && (
        <Alert
          color={notification.type === 'success' ? 'success' : 'danger'}
          style={{ 
            backgroundColor: notification.type === 'success' ? '#d8f3dc' : '#fae0e0',
            color: notification.type === 'success' ? COLORS.success : COLORS.danger,
            border: `1px solid ${notification.type === 'success' ? COLORS.success : COLORS.danger}`
          }}
          className="d-flex align-items-center"
        >
          {notification.type === 'success' ? (
            <Check size={20} className="me-2" />
          ) : (
            <AlertCircle size={20} className="me-2" />
          )}
          <div>{notification.message}</div>
        </Alert>
      )}
      
      {/* Card container */}
      <Card className="shadow-sm border-0">
        <CardHeader className="bg-white border-bottom" style={{ borderColor: '#e6e6e6' }}>
          <h5 className="mb-0" style={{ color: COLORS.dark }}>
            Lista de Empleados
          </h5>
        </CardHeader>
        <CardBody className="p-0">
          {/* Table */}
          <div className="table-responsive">
            <Table hover bordered={false} className="mb-0">
              <thead style={{ backgroundColor: COLORS.light }}>
                <tr>
                  <th className="border-0" width="10%">ID</th>
                  <th className="border-0" width="50%">Nombre</th>
                  <th className="border-0" width="20%">Salario</th>
                  <th className="border-0 text-end" width="20%">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      <Spinner size="sm" color="primary" style={{ color: COLORS.primary }} className="me-2" />
                      Cargando empleados...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      <Alert color="danger" className="mb-0 d-inline-flex py-1 px-3 align-items-center">
                        <AlertCircle size={16} className="me-2" />
                        {error}
                      </Alert>
                    </td>
                  </tr>
                ) : empleados.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted">
                      No hay empleados registrados
                    </td>
                  </tr>
                ) : (
                  empleados.map((empleado) => (
                    <tr key={empleado.empleadoId}>
                      <td className="align-middle">
                        <Badge 
                          pill 
                          className="bg-light text-dark border" 
                          style={{ fontSize: '0.85em' }}
                        >
                          {empleado.empleadoId}
                        </Badge>
                      </td>
                      <td className="align-middle fw-medium">
                        {empleado.nombre}
                      </td>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <DollarSign size={16} className="me-1" style={{ color: COLORS.success }} />
                          <span className="fw-medium">{(empleado.salario)}</span>
                        </div>
                      </td>
                      <td className="align-middle text-end">
                        <div className="d-flex justify-content-end gap-1">
                          <Button
                            color="light"
                            size="sm"
                            outline
                            className="btn-icon rounded-circle"
                            onClick={() => handleOpenModal('view', empleado)}
                            title="Ver detalles"
                          >
                            <Search size={16} style={{ color: COLORS.primary }} />
                          </Button>
                          <Button
                            color="light"
                            size="sm"
                            outline
                            className="btn-icon rounded-circle"
                            onClick={() => handleOpenModal('edit', empleado)}
                            title="Editar empleado"
                          >
                            <Edit2 size={16} style={{ color: COLORS.warning }} />
                          </Button>
                          <Button
                            color="light"
                            size="sm"
                            outline
                            className="btn-icon rounded-circle"
                            onClick={() => handleOpenModal('delete', empleado)}
                            title="Eliminar empleado"
                          >
                            <Trash2 size={16} style={{ color: COLORS.danger }} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
      
      {/* Modal */}
      <EmpleadoModal
        isOpen={showModal}
        onClose={handleCloseModal}
        mode={modalMode}
        empleado={empleadoSeleccionado}
        onSubmit={handleSubmit}
        formatSalario={formatSalario}
        colors={COLORS}
      />
    </Container>
  );
};

export default TablaEmpleados;