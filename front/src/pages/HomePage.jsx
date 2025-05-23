import React from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  CardTitle, 
  CardSubtitle,
  Badge
} from 'reactstrap';
import { 
  User, 
  Book, 
  Calendar, 
  MapPin, 
  Clock, 
  Server, 
  Info 
} from 'react-feather';

const HomePage = () => {
  return (
    <Container className="py-5 mt-4">
      <Row className="g-4">
        {/* Curso */}
        <Col md={6}>
          <Card className="h-100 shadow-sm border-0">
            <CardBody>
              <CardTitle tag="h4" className="d-flex align-items-center mb-3">
                <Book className="me-2 text-primary" size={24} />
                Fundamentos de Programación Web
              </CardTitle>
              <div className="d-flex align-items-center mb-2">
                <Server className="me-2 text-muted" size={18} />
                <span>Número de Curso: </span>
                <Badge color="primary" className="ms-2">428O</Badge>
              </div>
              <div className="d-flex align-items-center mb-2">
                <Clock className="me-2 text-muted" size={18} />
                <span>Horas Crédito: </span>
                <Badge color="success" className="ms-2">3</Badge>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Información del Curso */}
        <Col md={6}>
          <Card className="h-100 shadow-sm border-0">
            <CardBody>
              <CardTitle tag="h4" className="d-flex align-items-center mb-3">
                <Info className="me-2 text-primary" size={24} />
                Detalles del Curso
              </CardTitle>
              <div className="d-flex align-items-center mb-2">
                <Calendar className="me-2 text-muted" size={18} />
                <span>Periodo: </span>
                <Badge color="info" className="ms-2">CICLO I 2025</Badge>
              </div>
              <div className="d-flex align-items-center mb-2">
                <MapPin className="me-2 text-muted" size={18} />
                <span>Campus: </span>
                <Badge color="warning" className="ms-2">
                  Sede Interuniversit. Alajuela
                </Badge>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Información del Estudiante */}
        <Col md={6}>
          <Card className="h-100 shadow-sm border-0">
            <CardBody>
              <CardTitle tag="h4" className="d-flex align-items-center mb-3">
                <User className="me-2 text-primary" size={24} />
                Información del Estudiante
              </CardTitle>
              <CardSubtitle className="text-muted mb-2">
                Nombre Completo
              </CardSubtitle>
              <h5>Pablo Alvarado Umaña</h5>
            </CardBody>
          </Card>
        </Col>

        {/* Información Adicional */}
        <Col md={6}>
          <Card className="h-100 shadow-sm border-0">
            <CardBody>
              <CardTitle tag="h4" className="d-flex align-items-center mb-3">
                <Info className="me-2 text-primary" size={24} />
                Información Adicional
              </CardTitle>
              <div className="d-flex align-items-center mb-2">
                <Clock className="me-2 text-muted" size={18} />
                <span>Método Educativo: </span>
                <Badge color="success" className="ms-2">Presencial</Badge>
              </div>
              <div className="d-flex align-items-center mb-2">
                <User className="me-2 text-muted" size={18} />
                <span>Instructor: </span>
                <Badge color="secondary" className="ms-2">
                  Juan Ramos Peñaranda
                </Badge>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;