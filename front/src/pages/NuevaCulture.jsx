import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Globe, Save, X, } from 'react-feather';
import {
  Container, Row, Col, Card, CardHeader, CardBody, Button,
  Form, FormGroup, Label, Input, FormFeedback, Spinner
} from 'reactstrap';
import { ToastNotification } from '../components/ToastNotification';
import useCultureForm from '../hooks/useCultureForm';
import { obtenerCulturePorId } from '../hooks/useApi';

// Definimos los colores personalizados
const COLORS = {
  primary: '#3a5a40',
  secondary: '#588157',
  success: '#386641',
  danger: '#bc4749',
  warning: '#dda15e',
  light: '#f4f4f4',
  dark: '#283618',
  white: '#ffffff',
  gray: '#6c757d'
};

const NuevaCulture = () => {
  const { id } = useParams(); // Para editar una culture existente
  const isEditing = !!id;
  const navigate = useNavigate();

  // Callback de éxito que será ejecutado después de guardar o actualizar
  const handleSuccess = useCallback(() => {
    // Redireccionar a la tabla después de guardar exitosamente
    setTimeout(() => {
      navigate('/tabla_cultures');
    }, 1500); // Retraso de 1.5 segundos para que el usuario vea el toast de éxito
  }, [navigate]);

  const {
    formData,
    loading,
    errors,
    setFormData,
    handleChange,
    createCulture,
    updateCulture,
    resetForm
  } = useCultureForm(null, handleSuccess);

  useEffect(() => {
    const fetchCulture = async () => {
      if (isEditing) {
        try {
          const response = await obtenerCulturePorId(id);
          setFormData(response.data);
        } catch (error) {
          // Error handling would be managed by the toast notification
        }
      }
    };

    fetchCulture();
  }, [id, isEditing, setFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = false;

    if (isEditing) {
      success = await updateCulture();
    } else {
      success = await createCulture();
    }

    // La redirección ahora está controlada por handleSuccess que se ejecuta cuando es exitoso
  };

  const handleReset = () => {
    resetForm();
  };

  return (
    <Container fluid className="py-4">
      {/* Componente de Toast personalizado */}
      <ToastNotification
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        theme="colored"
      />

      {/* Header */}
      <Row className="mb-4 align-items-center">
        <Col>
          <div className="d-flex align-items-center">
            <Globe size={24} className="me-2" style={{ color: COLORS.primary }} />
            <h1 className="mb-0 fs-2 fw-bold" style={{ color: COLORS.dark }}>
              {isEditing ? 'Editar Culture' : 'Nueva Culture'}
            </h1>
          </div>
        </Col>
      </Row>

      {/* Card container */}
      <Card className="shadow-sm border-0">
        <CardHeader className="bg-white border-bottom" style={{ borderColor: '#e6e6e6' }}>
          <h5 className="mb-0" style={{ color: COLORS.dark }}>
            {isEditing ? 'Formulario de Edición' : 'Formulario de Registro'}
          </h5>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="cultureId">ID de Culture</Label>
                  <Input
                    type="text"
                    name="cultureId"
                    id="cultureId"
                    placeholder="Ingrese el ID de Culture"
                    value={formData.cultureId || ''}
                    onChange={handleChange}
                    invalid={!!errors.cultureId}
                    disabled={isEditing} // No permitir editar el ID si estamos editando
                  />
                  <FormFeedback>{errors.cultureId}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Nombre</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Ingrese el nombre"
                    value={formData.name || ''}
                    onChange={handleChange}
                    invalid={!!errors.name}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="modifiedDate">Fecha de creación</Label>
                  <Input
                    type="datetime-local"
                    name="modifiedDate"
                    id="modifiedDate"
                    value={formData.modifiedDate ? formData.modifiedDate.slice(0, 16) : ''}
                    onChange={handleChange}
                    invalid={!!errors.modifiedDate}
                  />
                  <FormFeedback>{errors.modifiedDate}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-4">
              {!isEditing && (
                <Button
                  color="light"
                  outline
                  onClick={handleReset}
                  className="d-flex align-items-center"
                  disabled={loading}
                  style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                >
                  <X size={18} className="me-1" />
                  Limpiar
                </Button>
              )}
              <Button
                type="submit"
                color="primary"
                className="d-flex align-items-center"
                style={{ backgroundColor: COLORS.primary, borderColor: COLORS.primary }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save size={18} className="me-1" />
                    {isEditing ? 'Actualizar' : 'Guardar'}
                  </>
                )}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default NuevaCulture;