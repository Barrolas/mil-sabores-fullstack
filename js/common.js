// ========================================
// COMMON - Pastelería Mil Sabores
// Funciones compartidas entre login y registro
// ========================================

// ========================================
// VALIDACIONES COMUNES
// ========================================

/**
 * Valida el formato de un email
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido, false si no
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida campo de email con feedback visual
 * @param {string} fieldId - ID del campo de email
 * @param {boolean} required - Si el campo es obligatorio
 * @returns {boolean} - true si es válido
 */
function validateEmailField(fieldId, required = true) {
    const email = document.getElementById(fieldId);
    const valor = email.value.trim();
    
    if (!valor) {
        if (required) {
            mostrarError(email, 'El correo electrónico es obligatorio');
            return false;
        } else {
            mostrarExito(email);
            return true;
        }
    }
    
    if (!validateEmail(valor)) {
        mostrarError(email, 'Ingrese un correo electrónico válido (ejemplo: usuario@correo.com)');
        return false;
    }
    
    mostrarExito(email);
    return true;
}

/**
 * Valida un nombre o apellido
 * @param {string} name - Nombre a validar
 * @param {string} fieldName - Nombre del campo para mensajes
 * @returns {object} {valid: boolean, message: string}
 */
function validateName(name, fieldName = 'nombre') {
    const valor = name.trim();
    
    if (valor.length < 2) {
        return { valid: false, message: `El ${fieldName} debe tener al menos 2 caracteres` };
    }
    
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
        return { valid: false, message: `El ${fieldName} solo puede contener letras` };
    }
    
    return { valid: true, message: '' };
}

/**
 * Valida una contraseña
 * @param {string} password - Contraseña a validar
 * @returns {object} {valid: boolean, message: string}
 */
function validatePassword(password) {
    if (password.length < 8) {
        return { valid: false, message: 'La contraseña debe tener al menos 8 caracteres' };
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return { valid: false, message: 'La contraseña debe incluir mayúsculas, minúsculas y números' };
    }
    
    return { valid: true, message: '' };
}

/**
 * Valida la confirmación de contraseña
 * @param {string} password - Contraseña original
 * @param {string} confirmPassword - Confirmación de contraseña
 * @returns {object} {valid: boolean, message: string}
 */
function validateConfirmPassword(password, confirmPassword) {
    if (confirmPassword !== password) {
        return { valid: false, message: 'Las contraseñas no coinciden' };
    }
    return { valid: true, message: '' };
}

/**
 * Valida una fecha de nacimiento
 * @param {string} fechaNacimiento - Fecha en formato YYYY-MM-DD
 * @returns {object} {valid: boolean, message: string, edad?: number}
 */
function validateBirthDate(fechaNacimiento) {
    if (!fechaNacimiento) {
        return { valid: false, message: 'La fecha de nacimiento es requerida' };
    }
    
    const fecha = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
        edad--;
    }
    
    if (edad < 13) {
        return { valid: false, message: 'Debe ser mayor de 13 años para registrarse' };
    }
    
    if (edad > 120) {
        return { valid: false, message: 'Ingrese una fecha de nacimiento válida' };
    }
    
    return { valid: true, message: '', edad: edad };
}

// ========================================
// UTILIDADES DE INTERFAZ COMUNES
// ========================================

/**
 * Alterna la visibilidad de la contraseña
 * @param {string} passwordId - ID del campo de contraseña
 * @param {string} eyeIconId - ID del icono del ojo
 */
function togglePassword(passwordId, eyeIconId) {
    const passwordInput = document.getElementById(passwordId);
    const eyeIcon = document.getElementById(eyeIconId);
    
    if (passwordInput && eyeIcon) {
        const tipo = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', tipo);
        
        // Cambia el icono
        if (tipo === 'text') {
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        } else {
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
        }
    }
}

/**
 * Muestra error en un campo del formulario
 * @param {HTMLElement} campo - Campo del formulario
 * @param {string} mensaje - Mensaje de error
 */
function mostrarError(campo, mensaje) {
    campo.classList.remove('is-valid');
    campo.classList.add('is-invalid');
    
    const errorElement = document.getElementById(campo.id + 'Error');
    if (errorElement) {
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
    }
    
    // Agregar atributo aria-invalid para accesibilidad
    campo.setAttribute('aria-invalid', 'true');
    campo.setAttribute('aria-describedby', campo.id + 'Error');
}

/**
 * Muestra éxito en un campo del formulario
 * @param {HTMLElement} campo - Campo del formulario
 */
function mostrarExito(campo) {
    campo.classList.remove('is-invalid');
    campo.classList.add('is-valid');
    
    const errorElement = document.getElementById(campo.id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    // Remover atributo aria-invalid para accesibilidad
    campo.removeAttribute('aria-invalid');
    campo.removeAttribute('aria-describedby');
}

/**
 * Limpia todas las validaciones de un formulario
 * @param {string} formId - ID del formulario
 */
function limpiarValidaciones(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const campos = form.querySelectorAll('.form-control, .form-check-input');
    campos.forEach(campo => {
        campo.classList.remove('is-valid', 'is-invalid');
        campo.removeAttribute('aria-invalid');
        campo.removeAttribute('aria-describedby');
    });
    
    const errores = form.querySelectorAll('.invalid-feedback');
    errores.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}

/**
 * Configura los inputs de fecha con fecha máxima
 */
function setupDateInputs() {
    const fechaMaxima = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.setAttribute('max', fechaMaxima);
    });
}

/**
 * Muestra alertas en la página
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de alerta (info, success, warning, danger)
 * @param {string} containerId - ID del contenedor de alertas
 */
function showAlert(message, type = 'info', containerId = 'alertContainer') {
    const alertContainer = document.getElementById(containerId);
    if (alertContainer) {
        alertContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }
}



// ========================================
// BENEFICIOS ESPECIALES COMUNES
// ========================================

/**
 * Muestra beneficio de descuento por edad (50+ años)
 */
function mostrarDescuentoEdad() {
    Swal.fire({
        title: '🎉 ¡Descuento Especial!',
        text: 'Por ser mayor de 50 años, recibes un 50% de descuento en todos nuestros productos.',
        icon: 'success',
        confirmButtonText: '¡Genial!',
        timer: 5000,
        timerProgressBar: true
    });
}

/**
 * Muestra beneficio de torta gratis para estudiantes Duoc
 */
function mostrarTortaGratis() {
    Swal.fire({
        title: '🎂 ¡Torta Gratis!',
        text: 'Como estudiante de Duoc, recibes una torta gratis en tu cumpleaños.',
        icon: 'success',
        confirmButtonText: '¡Excelente!',
        timer: 5000,
        timerProgressBar: true
    });
}

/**
 * Muestra beneficio de descuento por código FELICES50
 */
function mostrarDescuentoCodigo() {
    Swal.fire({
        title: '🎊 ¡Código Válido!',
        text: 'Con el código FELICES50 recibes un 10% de descuento de por vida.',
        icon: 'success',
        confirmButtonText: '¡Perfecto!',
        timer: 5000,
        timerProgressBar: true
    });
}

/**
 * Muestra mensaje de código inválido
 */
function mostrarCodigoInvalido() {
    Swal.fire({
        title: '❌ Código Inválido',
        text: 'El código ingresado no es válido. Intenta con FELICES50.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        timer: 3000,
        timerProgressBar: true
    });
}

// ========================================
// UTILIDADES ADICIONALES
// ========================================

/**
 * Muestra alerta con SweetAlert2
 * @param {string} tipo - Tipo de alerta (success, error, info, warning)
 * @param {string} mensaje - Mensaje a mostrar
 */

console.log('✅ common.js cargado correctamente - Funciones compartidas disponibles');
