// hooks/useEmpleados.js
import { useState, useEffect } from 'react';
import {
    obtenerEmpleados,
    obtenerEmpleadosPorId,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
} from '../hooks/useApi';

const useEmpleados = () => {
    const [empleados, setEmpleados] = useState([]);
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        fetchEmpleados();
    }, []);

    const fetchEmpleados = async () => {
        try {
            setLoading(true);
            const response = await obtenerEmpleados();
            setEmpleados(response.data);
            setError(null);
        } catch (err) {
            setError('No se pudieron cargar los datos de empleados');
        } finally {
            setLoading(false);
        }
    };

    const fetchEmpleadoDetalle = async (id) => {
        try {
            const response = await obtenerEmpleadosPorId(id);
            setEmpleadoSeleccionado(response.data);
            return response.data;
        } catch (err) {
            showNotification('Error al obtener detalles del empleado', 'error');
            return null;
        }
    };

    const createEmpleado = async (data) => {
        try {
            await crearEmpleado(data);
            showNotification('Empleado creado exitosamente', 'success');
            await fetchEmpleados();
            return true;
        } catch (err) {
            showNotification(`Error: ${err.message || 'Ha ocurrido un error al crear'}`, 'error');
            return false;
        }
    };

    const updateEmpleado = async (data) => {
        try {

            await actualizarEmpleado(data);
            showNotification('Empleado actualizado exitosamente', 'success');
            await fetchEmpleados();
            return true;
        } catch (err) {
            showNotification(`Error: ${err.message || 'Ha ocurrido un error al actualizar'}`, 'error');
            return false;
        }
    };

    const deleteEmpleado = async (id) => {
        try {
            await eliminarEmpleado(id);
            showNotification('Empleado eliminado exitosamente', 'success');
            await fetchEmpleados();
            return true;
        } catch (err) {
            showNotification(`Error: ${err.message || 'Ha ocurrido un error al eliminar'}`, 'error');
            return false;
        }
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    const formatSalario = (salario) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0
        }).format(salario);
    };

    return {
        empleados,
        empleadoSeleccionado,
        loading,
        error,
        notification,
        fetchEmpleados,
        fetchEmpleadoDetalle,
        createEmpleado,
        updateEmpleado,
        deleteEmpleado,
        setEmpleadoSeleccionado,
        formatSalario,
        showNotification
    };
};

export default useEmpleados;