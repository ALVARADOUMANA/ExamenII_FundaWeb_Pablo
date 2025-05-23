import { useState } from 'react'; 
import { showToast } from '../components/ToastNotification'; 
import {
    crearCulture,
    actualizarCulture
} from '../hooks/useApi';  

const useCultureForm = (initialData = null, onSuccess = null) => {
    // Obtener la fecha actual en formato ISO para el valor inicial
    const currentDate = new Date().toISOString();
    
    const [formData, setFormData] = useState(initialData || {
        cultureId: '',
        name: '',
        modifiedDate: currentDate
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
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
        
        if (!formData.cultureId || formData.cultureId.trim() === '') {
            newErrors.cultureId = 'El ID de Culture es requerido';
        }
        
        if (!formData.name || formData.name.trim() === '') {
            newErrors.name = 'El nombre es requerido';
        }
        
        if (!formData.modifiedDate) {
            newErrors.modifiedDate = 'La fecha es requerida';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const createCulture = async () => {
        if (!validateForm()) return false;
        
        try {
            setLoading(true);
            console.log('Creando culture con datos:', formData);
            await crearCulture(formData);
            showToast.success('Culture creada exitosamente');
            
            // Ejecutamos callback si existe, en lugar de redireccionar inmediatamente
            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess();
            }
            
            // No reseteamos el formulario automáticamente si hay un callback
            // para permitir ver los datos guardados antes de la redirección
            if (!onSuccess) {
                resetForm();
            }
            
            return true;
        } catch (err) {
            showToast.error(`Error: ${err.message || 'Ha ocurrido un error al crear'}`);
            return false;
        } finally {
            setLoading(false);
        }
    };
    
    const updateCulture = async () => {
        if (!validateForm()) return false;
        
        try {
            setLoading(true);
            // Actualizar la fecha de modificación antes de enviar
            const updatedData = {
                ...formData,
                modifiedDate: new Date().toISOString()
            };
            await actualizarCulture(updatedData);
            showToast.success('Culture actualizada exitosamente');
            
            // Ejecutamos callback si existe
            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess();
            }
            return true;
        } catch (err) {
            showToast.error(`Error: ${err.message || 'Ha ocurrido un error al actualizar'}`);
            return false;
        } finally {
            setLoading(false);
        }
    };
    
    const resetForm = () => {
        setFormData({
            cultureId: '',
            name: '',
            modifiedDate: new Date().toISOString()
        });
        setErrors({});
    };
    
    return {
        formData,
        loading,
        errors,
        setFormData,
        handleChange,
        createCulture,
        updateCulture,
        resetForm
    }; 
};  

export default useCultureForm;