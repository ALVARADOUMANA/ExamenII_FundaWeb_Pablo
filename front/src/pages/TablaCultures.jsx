//front\src\pages\TablaCultures.jsx

import React, { useState, useEffect } from 'react';
import { Globe, Eye, Edit2, Trash2, AlertCircle, Search, Calendar, ArrowUp, ArrowDown, Plus } from 'react-feather';
import {
    Container, Row, Col, Card, CardHeader, CardBody, Button,
    Table, Alert, Spinner, Badge, Input, InputGroup, InputGroupText,
    Form, FormGroup, Label, Collapse
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { ToastNotification } from '../components/ToastNotification';
import CultureModal from '../components/CultureModal';
import useCultures from '../hooks/useCultures';

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

const TablaCultures = () => {
    const {
        cultures,
        cultureSeleccionada,
        loading,
        error,
        showModal,
        modalMode,
        deleteCulture,
        handleOpenModal,
        handleCloseModal
    } = useCultures();

    // Estado para filtros y ordenamiento
    const [filteredCultures, setFilteredCultures] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending'
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Efecto para aplicar filtros cuando cambien las dependencias
    useEffect(() => {
        applyFilters();
    }, [cultures, searchTerm, dateFrom, dateTo, sortConfig]);

    // Manejador para ordenar al hacer clic en los encabezados
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Función para aplicar todos los filtros y ordenamiento
    const applyFilters = () => {
        let filteredData = [...cultures];

        // Filtrar por término de búsqueda (ID o nombre)
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredData = filteredData.filter(
                culture =>
                    culture.cultureId.toLowerCase().includes(term) ||
                    culture.name.toLowerCase().includes(term)
            );
        }

        // Filtrar por fecha desde
        if (dateFrom) {
            const fromDate = new Date(dateFrom);
            filteredData = filteredData.filter(
                culture => new Date(culture.modifiedDate) >= fromDate
            );
        }

        // Filtrar por fecha hasta
        if (dateTo) {
            const toDate = new Date(dateTo);
            toDate.setHours(23, 59, 59, 999); // Establecer al final del día
            filteredData = filteredData.filter(
                culture => new Date(culture.modifiedDate) <= toDate
            );
        }

        // Aplicar ordenamiento
        if (sortConfig.key) {
            filteredData.sort((a, b) => {
                let valueA = a[sortConfig.key];
                let valueB = b[sortConfig.key];

                // Manejar caso especial para fechas
                if (sortConfig.key === 'modifiedDate') {
                    valueA = new Date(valueA);
                    valueB = new Date(valueB);
                }

                if (valueA < valueB) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (valueA > valueB) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        setFilteredCultures(filteredData);
    };

    // Renderizado del ícono de ordenamiento
    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) {
            return null;
        }
        return sortConfig.direction === 'ascending' ?
            <ArrowUp size={14} className="ms-1" /> :
            <ArrowDown size={14} className="ms-1" />;
    };

    // Función para formatear la fecha y hora completa
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleDelete = async () => {
        if (cultureSeleccionada) {
            const success = await deleteCulture(cultureSeleccionada.cultureId);
            if (success) {
                handleCloseModal();
            }
        }
    };

    const handleResetFilters = () => {
        setSearchTerm('');
        setDateFrom('');
        setDateTo('');
        setSortConfig({ key: null, direction: 'ascending' });
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
                            Administración de Cultures
                        </h1>
                    </div>
                </Col>
                <Col xs="auto">
                    <Link to="/crear_culture"
                    style={{ textDecoration: 'none' }}
                    >
                        <Button
                            color="primary"
                            className="d-flex align-items-center"
                            style={{ backgroundColor: COLORS.primary, borderColor: COLORS.primary }}
                        >
                            <Plus size={18} className="me-1" />
                            Nueva Culture
                        </Button>
                    </Link>
                </Col>
            </Row>

            {/* Card container */}
            <Card className="shadow-sm border-0 mb-4">
                <CardHeader className="bg-white border-bottom" style={{ borderColor: '#e6e6e6' }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0" style={{ color: COLORS.dark }}>
                            Filtros de búsqueda
                        </h5>
                        <Button
                            color="light"
                            size="sm"
                            outline
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            style={{
                                borderColor: '#4b5320',
                                color: '#4b5320',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#4b5320';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#4b5320';
                            }}
                        >
                            {isFilterOpen ? 'Ocultar' : 'Mostrar'} filtros
                        </Button>
                    </div>
                </CardHeader>

                <Collapse isOpen={isFilterOpen}>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="searchTerm">Buscar por ID o Nombre</Label>
                                        <InputGroup>
                                            <InputGroupText style={{ backgroundColor: COLORS.light }}>
                                                <Search size={16} />
                                            </InputGroupText>
                                            <Input
                                                type="text"
                                                id="searchTerm"
                                                placeholder="Filtrar por ID o nombre..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="dateFrom">Fecha desde</Label>
                                        <InputGroup>
                                            <InputGroupText style={{ backgroundColor: COLORS.light }}>
                                                <Calendar size={16} />
                                            </InputGroupText>
                                            <Input
                                                type="date"
                                                id="dateFrom"
                                                value={dateFrom}
                                                onChange={(e) => setDateFrom(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="dateTo">Fecha hasta</Label>
                                        <InputGroup>
                                            <InputGroupText style={{ backgroundColor: COLORS.light }}>
                                                <Calendar size={16} />
                                            </InputGroupText>
                                            <Input
                                                type="date"
                                                id="dateTo"
                                                value={dateTo}
                                                onChange={(e) => setDateTo(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end">
                                <Button
                                    color="light"
                                    outline
                                    onClick={handleResetFilters}
                                    style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                                    size="sm"
                                    className="me-2"
                                >
                                    Limpiar filtros
                                </Button>
                                <Button
                                    color="primary"
                                    size="sm"
                                    style={{ backgroundColor: COLORS.primary, borderColor: COLORS.primary }}
                                    onClick={applyFilters}
                                >
                                    Aplicar filtros
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Collapse>
            </Card>

            <Card className="shadow-sm border-0">
                <CardHeader className="bg-white border-bottom" style={{ borderColor: '#e6e6e6' }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0" style={{ color: COLORS.dark }}>
                            Lista de Cultures
                        </h5>
                        <span className="text-muted small">
                            {filteredCultures.length} {filteredCultures.length === 1 ? 'registro' : 'registros'}
                        </span>
                    </div>
                </CardHeader>
                <CardBody className="p-0">
                    {/* Table */}
                    <div className="table-responsive">
                        <Table hover bordered={false} className="mb-0">
                            <thead style={{ backgroundColor: COLORS.light }}>
                                <tr>
                                    <th
                                        className="border-0 cursor-pointer"
                                        width="20%"
                                        onClick={() => handleSort('cultureId')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="d-flex align-items-center">
                                            ID {renderSortIcon('cultureId')}
                                        </div>
                                    </th>
                                    <th
                                        className="border-0 cursor-pointer"
                                        width="40%"
                                        onClick={() => handleSort('name')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="d-flex align-items-center">
                                            Nombre {renderSortIcon('name')}
                                        </div>
                                    </th>
                                    <th
                                        className="border-0 cursor-pointer"
                                        width="25%"
                                        onClick={() => handleSort('modifiedDate')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="d-flex align-items-center">
                                            Fecha Modificación {renderSortIcon('modifiedDate')}
                                        </div>
                                    </th>
                                    <th className="border-0 text-end" width="15%">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4">
                                            <Spinner size="sm" color="primary" style={{ color: COLORS.primary }} className="me-2" />
                                            Cargando cultures...
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
                                ) : filteredCultures.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4 text-muted">
                                            No hay cultures que coincidan con los criterios de búsqueda
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCultures.map((culture) => (
                                        <tr key={culture.cultureId}>
                                            <td className="align-middle">
                                                <Badge
                                                    pill
                                                    className="bg-light text-dark border"
                                                    style={{ fontSize: '0.85em' }}
                                                >
                                                    {culture.cultureId}
                                                </Badge>
                                            </td>
                                            <td className="align-middle fw-medium">
                                                {culture.name}
                                            </td>
                                            <td className="align-middle small">
                                                {formatDateTime(culture.modifiedDate)}
                                            </td>
                                            <td className="align-middle text-end">
                                                <div className="d-flex justify-content-end gap-1">
                                                    <Button
                                                        color="light"
                                                        size="sm"
                                                        outline
                                                        className="btn-icon rounded-circle"
                                                        onClick={() => handleOpenModal('view', culture)}
                                                        title="Ver detalles"
                                                    >
                                                        <Eye size={16} style={{ color: COLORS.primary }} />
                                                    </Button>
                                                    <Button
                                                        color="light"
                                                        size="sm"
                                                        outline
                                                        className="btn-icon rounded-circle"
                                                        onClick={() => handleOpenModal('edit', culture)}
                                                        title="Editar culture"
                                                    >
                                                        <Edit2 size={16} style={{ color: COLORS.warning }} />
                                                    </Button>
                                                    <Button
                                                        color="light"
                                                        size="sm"
                                                        outline
                                                        className="btn-icon rounded-circle"
                                                        onClick={() => handleOpenModal('delete', culture)}
                                                        title="Eliminar culture"
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
            <CultureModal
                isOpen={showModal}
                onClose={handleCloseModal}
                mode={modalMode}
                culture={cultureSeleccionada}
                onDelete={handleDelete}
                colors={COLORS}
            />
        </Container>
    );
};

export default TablaCultures;