import React, { useState, useEffect } from 'react';
import { User, Edit2, DollarSign, X, AlertCircle } from 'react-feather';
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button,
    Form, FormGroup, Label, Input, InputGroup, InputGroupText,
    Card, CardBody, Badge, Alert
} from 'reactstrap';

const EmpleadoModal = ({
    isOpen,
    onClose,
    mode,
    empleado,
    onSubmit,
    formatSalario,
    colors = {
        primary: '#3a5a40', // Verde musgo
        secondary: '#588157', // Verde musgo más claro
        success: '#386641', // Verde para éxito
        danger: '#bc4749', // Rojo para alertas/eliminar
        warning: '#dda15e', // Ámbar para editar
        light: '#f4f4f4', // Fondo claro
        dark: '#283618', // Verde oscuro
        white: '#ffffff',
        gray: '#6c757d'
    }
}) => {
    const [formData, setFormData] = useState({
        nombre: '',
        salario: 0
    });

    useEffect(() => {
        if (empleado && (mode === 'view' || mode === 'edit' || mode === 'delete')) {
            setFormData({
                nombre: empleado.nombre,
                salario: empleado.salario
            });
        } else if (mode === 'create') {
            setFormData({
                nombre: '',
                salario: 0
            });
        }
    }, [empleado, mode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'salario' ? parseFloat(value) || 0 : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const getModalTitle = () => {
        switch (mode) {
            case 'view': return 'Detalles del Empleado';
            case 'create': return 'Crear Nuevo Empleado';
            case 'edit': return 'Editar Empleado';
            case 'delete': return 'Eliminar Empleado';
            default: return '';
        }
    };

    // Configuración de colores del modal según el modo
    const getModalConfig = () => {
        switch (mode) {
            case 'view':
                return {
                    headerBg: '#f8f9fa',
                    headerColor: colors.dark,
                    closeColor: colors.gray
                };
            case 'create':
                return {
                    headerBg: colors.primary,
                    headerColor: colors.white,
                    closeColor: colors.white
                };
            case 'edit':
                return {
                    headerBg: colors.warning,
                    headerColor: colors.white,
                    closeColor: colors.white
                };
            case 'delete':
                return {
                    headerBg: colors.danger,
                    headerColor: colors.white,
                    closeColor: colors.white
                };
            default:
                return {
                    headerBg: '#f8f9fa',
                    headerColor: colors.dark,
                    closeColor: colors.gray
                };
        }
    };

    const modalConfig = getModalConfig();

    const renderModalContent = () => {
        switch (mode) {
            case 'view':
                return empleado ? (
                    <>
                        <ModalBody>
                            <div className="text-center mb-4">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle p-3 mb-3"
                                    style={{ backgroundColor: '#e9f5db' }}
                                >
                                    <User size={48} style={{ color: colors.primary }} />
                                </div>
                                <h4 className="mb-0">{empleado.nombre}</h4>
                            </div>

                            <Card className="border mb-3" style={{ backgroundColor: colors.light }}>
                                <CardBody className="p-3">
                                    <small className="text-muted d-block mb-1">ID del Empleado</small>
                                    <div className="d-flex align-items-center">
                                        <Badge
                                            pill
                                            className="bg-white border border-secondary"
                                            style={{ fontSize: '1em', color: '#556B2F' }} // Verde musgo
                                        >
                                            {empleado.empleadoId}
                                        </Badge>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card className="border">
                                <CardBody className="p-3">
                                    <small className="text-muted d-block mb-1">Salario</small>
                                    <div className="d-flex align-items-center">
                                        <DollarSign size={20} className="me-2" style={{ color: colors.success }} />
                                        <h4 className="mb-0 fw-bold">{(empleado.salario)}</h4>
                                    </div>
                                </CardBody>
                            </Card>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                block
                                onClick={onClose}
                                style={{ backgroundColor: colors.primary, borderColor: colors.primary }}
                            >
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </>
                ) : null;

            case 'edit':
            case 'create':
                return (
                    <Form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label for="nombre" className="fw-medium">Nombre</Label>
                                <Input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese el nombre del empleado"
                                    required
                                    className="border"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="salario" className="fw-medium">Salario</Label>
                                <InputGroup>
                                    <InputGroupText style={{ backgroundColor: colors.light }}>
                                        <DollarSign size={16} />
                                    </InputGroupText>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        id="salario"
                                        name="salario"
                                        value={formData.salario}
                                        onChange={handleInputChange}
                                        placeholder="Ingrese el salario"
                                        required
                                        min="0"
                                        className="border"
                                    />
                                </InputGroup>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type="button"
                                color="bg-secondary"
                                outline
                                onClick={onClose}
                                className="me-2 fw-medium"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                color={mode === 'create' ? 'primary' : 'warning'}
                                style={{
                                    backgroundColor: mode === 'create' ? colors.primary : colors.warning,
                                    borderColor: mode === 'create' ? colors.primary : colors.warning
                                }}
                                className="fw-medium"
                            >
                                {mode === 'create' ? 'Crear' : 'Guardar Cambios'}
                            </Button>
                        </ModalFooter>
                    </Form>
                );

            case 'delete':
                return empleado ? (
                    <>
                        <ModalBody>
                            <Alert
                                color="danger"
                                style={{
                                    backgroundColor: '#f8d7d8',
                                    borderColor: colors.danger,
                                    color: '#721c24'
                                }}
                            >
                                <div className="d-flex">
                                    <AlertCircle size={24} className="me-3" style={{ color: colors.danger }} />
                                    <div>
                                        <h5 className="fw-bold mb-1">¿Está seguro?</h5>
                                        <p className="mb-0">
                                            Esta acción no se puede deshacer. Se eliminará permanentemente a <strong>{empleado.nombre}</strong>.
                                        </p>
                                    </div>
                                </div>
                            </Alert>

                            <div className="mt-3 p-3 border rounded">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">ID:</span>
                                    <span className="fw-medium">{empleado.empleadoId}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Nombre:</span>
                                    <span className="fw-medium">{empleado.nombre}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">Salario:</span>
                                    <span className="fw-medium">{formatSalario(empleado.salario)}</span>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="bg-secondary"
                                outline
                                onClick={onClose}
                                className="me-2 fw-medium"
                            >
                                Cancelar
                            </Button>
                            <Button
                                color="danger"
                                onClick={handleSubmit}
                                style={{ backgroundColor: colors.danger, borderColor: colors.danger }}
                                className="fw-medium"
                            >
                                Confirmar Eliminación
                            </Button>
                        </ModalFooter>
                    </>
                ) : null;

            default:
                return null;
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            toggle={onClose}
            centered
            size={mode === 'view' ? 'sm' : 'md'}
        >
            <ModalHeader
                toggle={onClose}
                style={{
                    backgroundColor: modalConfig.headerBg,
                    color: modalConfig.headerColor,
                    borderBottom: '1px solid rgba(0,0,0,0.1)'
                }}
                close={
                    <Button
                        className="btn-close"
                        onClick={onClose}
                        style={{ color: modalConfig.closeColor }}
                    />
                }
            >
                {getModalTitle()}
            </ModalHeader>
            {renderModalContent()}
        </Modal>
    );
};

export default EmpleadoModal;