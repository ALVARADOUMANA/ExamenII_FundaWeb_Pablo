import React, { useState, useEffect } from 'react';
import { 
  Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, 
  FormGroup, Label, Input, FormFeedback, Alert, Spinner, Badge, Card, CardBody
} from 'reactstrap';
import { 
  Save, X, Trash2, AlertCircle, FileText, Edit3, Clock, Database, Award
} from 'react-feather';
import { actualizarCulture } from '../hooks/useApi';
import { showToast } from '../components/ToastNotification';

const CultureModal = ({ isOpen, onClose, mode, culture, onDelete, colors }) => {
  const [formData, setFormData] = useState({ cultureId: '', name: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Estilos personalizados para modernizar
  const mossGreen = '#556B2F'; // Color verde musgo para los iconos
  const iconSize = 24; // Incrementado para mayor visibilidad
  const labelStyle = {
    fontSize: '0.9rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: '#6c757d'
  };
  const valueStyle = {
    fontSize: '1.2rem', // Texto más grande
    fontWeight: 500
  };
  const headerStyle = {
    backgroundColor: mossGreen,
    color: 'white',
    borderBottom: 'none'
  };
  const buttonStyle = {
    borderRadius: '8px',
    padding: '10px 20px',
    fontWeight: 500,
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '120px'
  };

  useEffect(() => {
    if (culture) {
      setFormData({
        cultureId: culture.cultureId || '',
        name: culture.name || ''
      });
    } else {
      setFormData({ cultureId: '', name: '' });
    }
    setErrors({});
  }, [culture, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'El nombre es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      await actualizarCulture(formData);
      showToast.success('Culture actualizada exitosamente');
      onClose();
      // Refrescar la lista después de la actualización
      window.location.reload();
    } catch (err) {
      showToast.error(`Error: ${err.message || 'Ha ocurrido un error al actualizar'}`);
    } finally {
      setLoading(false);
    }
  };

  const renderModalContent = () => {
    switch (mode) {
      case 'view':
        return (
          <>
            <ModalBody className="py-4">
              <Card className="border-0 shadow-sm mb-4">
                <CardBody>
                  <div className="d-flex align-items-center mb-4">
                    <Database size={iconSize} className="me-3" style={{color: mossGreen}} />
                    <div>
                      <h6 style={labelStyle}>ID de Culture</h6>
                      <p style={valueStyle} className="mb-0">{formData.cultureId}</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-center mb-4">
                    <Award size={iconSize} className="me-3" style={{color: mossGreen}} />
                    <div>
                      <h6 style={labelStyle}>Nombre</h6>
                      <p style={valueStyle} className="mb-0">{formData.name}</p>
                    </div>
                  </div>
                  
                  {culture && culture.modifiedDate && (
                    <div className="d-flex align-items-center">
                      <Clock size={iconSize} className="me-3" style={{color: mossGreen}} />
                      <div>
                        <h6 style={labelStyle}>Última Modificación</h6>
                        <p style={valueStyle} className="mb-0">
                          {new Date(culture.modifiedDate).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter className="border-0 pt-0">
              <Button 
                color="secondary" 
                onClick={onClose} 
                style={{...buttonStyle, backgroundColor: '#f8f9fa', color: '#333'}}
              >
                <X size={iconSize - 4} className="me-2" />
                <span>Cerrar</span>
              </Button>
            </ModalFooter>
          </>
        );
        
      case 'edit':
        return (
          <>
            <ModalBody className="py-4">
              <Form>
                <FormGroup className="mb-4">
                  <div className="d-flex align-items-center mb-2">
                    <Database size={20} className="me-2" style={{color: mossGreen}} />
                    <Label for="cultureId" style={labelStyle}>ID de Culture</Label>
                  </div>
                  <Input
                    type="text"
                    name="cultureId"
                    id="cultureId"
                    value={formData.cultureId}
                    disabled
                    className="bg-light form-control-lg"
                    style={{borderRadius: '8px'}}
                  />
                </FormGroup>
                <FormGroup>
                  <div className="d-flex align-items-center mb-2">
                    <Award size={20} className="me-2" style={{color: mossGreen}} />
                    <Label for="name" style={labelStyle}>Nombre</Label>
                  </div>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Ingrese el nombre"
                    value={formData.name}
                    onChange={handleChange}
                    invalid={!!errors.name}
                    className="form-control-lg"
                    style={{borderRadius: '8px'}}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter className="border-0 pt-0">
              <Button 
                color="secondary" 
                onClick={onClose} 
                disabled={loading}
                style={{...buttonStyle, backgroundColor: '#f8f9fa', color: '#333'}}
              >
                <X size={iconSize - 4} className="me-2" />
                <span>Cancelar</span>
              </Button>
              <Button 
                color="primary" 
                onClick={handleUpdate}
                disabled={loading}
                style={{
                  ...buttonStyle, 
                  backgroundColor: colors?.primary || '#4361ee', 
                  borderColor: colors?.primary || '#4361ee'
                }}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <Save size={iconSize - 4} className="me-2" />
                    <span>Guardar</span>
                  </>
                )}
              </Button>
            </ModalFooter>
          </>
        );
        
      case 'delete':
        return (
          <>
            <ModalBody className="py-4">
              <Alert 
                color="danger" 
                className="d-flex align-items-start p-4"
                style={{borderRadius: '10px'}}
              >
                <AlertCircle size={iconSize} className="me-3" />
                <div>
                  <h5 className="alert-heading mb-2 fw-bold">Confirmar eliminación</h5>
                  <p className="mb-0 fs-5">
                    ¿Está seguro que desea eliminar esta culture? Esta acción no se puede deshacer.
                  </p>
                </div>
              </Alert>
              
              <Card className="border-0 shadow-sm mt-4">
                <CardBody>
                  <div className="d-flex align-items-center mb-3">
                    <Database size={iconSize - 2} className="me-3 text-danger" />
                    <div>
                      <h6 style={labelStyle}>ID de Culture</h6>
                      <p style={valueStyle} className="mb-0">{formData.cultureId}</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <Award size={iconSize - 2} className="me-3 text-danger" />
                    <div>
                      <h6 style={labelStyle}>Nombre</h6>
                      <p style={valueStyle} className="mb-0">{formData.name}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter className="border-0 pt-0">
              <Button 
                color="secondary" 
                onClick={onClose}
                style={{...buttonStyle, backgroundColor: '#f8f9fa', color: '#333'}}
              >
                <X size={iconSize - 4} className="me-2" />
                <span>Cancelar</span>
              </Button>
              <Button 
                color="danger" 
                onClick={onDelete}
                style={{
                  ...buttonStyle, 
                  backgroundColor: colors?.danger || '#ef4444', 
                  borderColor: colors?.danger || '#ef4444'
                }}
              >
                <Trash2 size={iconSize - 4} className="me-2" />
                <span>Eliminar</span>
              </Button>
            </ModalFooter>
          </>
        );
        
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'view':
        return (
          <div className="d-flex align-items-center">
            <FileText size={iconSize} className="me-2" />
            <span>Detalles de Culture</span>
          </div>
        );
      case 'edit':
        return (
          <div className="d-flex align-items-center">
            <Edit3 size={iconSize} className="me-2" />
            <span>Editar Culture</span>
          </div>
        );
      case 'delete':
        return (
          <div className="d-flex align-items-center">
            <Trash2 size={iconSize} className="me-2" />
            <span>Eliminar Culture</span>
          </div>
        );
      default:
        return 'Culture';
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      toggle={onClose} 
      size="lg" // Más grande que el original 
      contentClassName="border-0 shadow"
      modalClassName="modal-modern"
    >
      <ModalHeader 
        toggle={onClose} 
        style={{
          ...headerStyle,
          paddingTop: '16px',
          paddingBottom: '16px'
        }}
      >
        {getModalTitle()}
      </ModalHeader>
      {renderModalContent()}
    </Modal>
  );
};

export default CultureModal;