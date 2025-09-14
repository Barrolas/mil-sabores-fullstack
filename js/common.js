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
// MANEJO DE SESIONES COMUNES
// ========================================

/**
 * Guarda la sesión del usuario en sessionStorage
 * @param {string} email - Email del usuario
 * @param {object} userData - Datos adicionales del usuario
 */
function saveUserSession(email, userData = {}) {
    sessionStorage.setItem('userLoggedIn', 'true');
    sessionStorage.setItem('userEmail', email);
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

/**
 * Verifica si el usuario está logueado
 * @returns {boolean} true si está logueado, false si no
 */
function isUserLoggedIn() {
    return sessionStorage.getItem('userLoggedIn') === 'true';
}

/**
 * Obtiene los datos del usuario de la sesión
 * @returns {object|null} Datos del usuario o null si no hay sesión
 */
function getUserData() {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

/**
 * Cierra la sesión del usuario
 */
function logout() {
    sessionStorage.removeItem('userLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userData');
}

// ========================================
// BENEFICIOS ESPECIALES COMUNES
// ========================================

/**
 * Muestra descuento por edad (mayores de 50)
 */
function mostrarDescuentoEdad() {
    Swal.fire({
        title: '¡Felicidades!',
        text: 'Por ser mayor de 50 años tienes un 50% de descuento en todos nuestros productos.',
        icon: 'success',
        confirmButtonText: 'Entendido'
    });
}

/**
 * Muestra beneficio de torta gratis para usuarios @duoc.cl
 * REQUERIMIENTO: Tortas gratis para estudiantes de Duoc en su cumpleaños
 */
function mostrarTortaGratis() {
    Swal.fire({
        title: '¡Beneficio especial!',
        text: 'Al registrarte con correo @duoc.cl, recibirás tortas gratis en tu cumpleaños.',
        icon: 'success',
        confirmButtonText: 'Entendido'
    });
}

/**
 * Muestra descuento por código válido
 * REQUERIMIENTO: Descuento 10% para código "FELICES50"
 */
function mostrarDescuentoCodigo() {
    Swal.fire({
        title: '¡Código válido!',
        text: 'Tienes un descuento del 10% de por vida con el código: FELICES50',
        icon: 'success',
        confirmButtonText: 'Entendido'
    });
}

/**
 * Muestra código inválido
 */
function mostrarCodigoInvalido() {
    Swal.fire({
        title: 'Código inválido',
        text: 'Código de descuento inválido. Intenta con "FELICES50" para obtener un 10% de descuento.',
        icon: 'error',
        confirmButtonText: 'Entendido'
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
function mostrarAlerta(tipo, mensaje) {
    Swal.fire({
        title: tipo === 'success' ? '¡Éxito!' : tipo === 'error' ? 'Error' : 'Información',
        text: mensaje,
        icon: tipo === 'success' ? 'success' : tipo === 'error' ? 'error' : 'info',
        confirmButtonText: 'Entendido'
    });
}

console.log('✅ common.js cargado correctamente - Funciones compartidas disponibles');
