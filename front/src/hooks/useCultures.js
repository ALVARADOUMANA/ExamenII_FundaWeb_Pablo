import { useState, useEffect } from 'react';
import { showToast } from '../components/ToastNotification';
import {
    obtenerCultures,
    obtenerCulturePorId,
    eliminarCulture
} from '../hooks/useApi';

const useCultures = () => {
    const [cultures, setCultures] = useState([]);
    const [cultureSeleccionada, setCultureSeleccionada] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'delete'
    
    useEffect(() => {
        fetchCultures();
    }, []);
    
    const fetchCultures = async () => {
        try {
            setLoading(true);
            const response = await obtenerCultures();
            setCultures(response.data);
            setError(null);
        } catch (err) {
            const errorMsg = 'No se pudieron cargar los datos de cultures';
            setError(errorMsg);
            showNotification(errorMsg, 'error');
        } finally {
            setLoading(false);
        }
    };
    
    const fetchCultureDetalle = async (id) => {
        try {
            const response = await obtenerCulturePorId(id);
            setCultureSeleccionada(response.data);
            return response.data;
        } catch (err) {
            showNotification('Error al obtener detalles de la culture', 'error');
            return null;
        }
    };
    
    const deleteCulture = async (id) => {
        try {
            await eliminarCulture(id);
            showNotification('Culture eliminada exitosamente', 'success');
            await fetchCultures();
            return true;
        } catch (err) {
            showNotification(`Error: ${err.message || 'Ha ocurrido un error al eliminar'}`, 'error');
            return false;
        }
    };
    
    const handleOpenModal = async (mode, culture = null) => {
        setModalMode(mode);
        
        if (culture) {
            if (mode === 'view' || mode === 'delete') {
                // Para vista o eliminar, usamos los datos que ya tenemos
                setCultureSeleccionada(culture);
            } else {
                // Para edición, obtenemos los datos completos
                await fetchCultureDetalle(culture.cultureId);
            }
        }
        
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCultureSeleccionada(null);
    };
    
    const showNotification = (message, type) => {
        // Usar el sistema de toast personalizado
        switch (type) {
            case 'success':
                showToast.success(message);
                break;
            case 'error':
                showToast.error(message);
                break;
            case 'warning':
                showToast.warning(message);
                break;
            default:
                showToast.info(message);
        }
    };
    
    return {
        cultures,
        cultureSeleccionada,
        loading,
        error,
        showModal,
        modalMode,
        fetchCultureDetalle,
        deleteCulture,
        setCultureSeleccionada,
        handleOpenModal,
        handleCloseModal,
        showNotification,
        fetchCultures
    };
};

export default useCultures;