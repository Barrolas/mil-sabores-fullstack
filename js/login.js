// ========================================
// LOGIN - Pastelería Mil Sabores
// Funciones específicas para la página de login
// ========================================

// ========================================
// VALIDACIONES DE LOGIN
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
 * Valida el formulario completo de login
 * @returns {boolean} true si es válido, false si no
 */
function validateLoginForm() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let isValid = true;

    // Limpiar validaciones anteriores
    email.classList.remove('is-invalid', 'is-valid');
    password.classList.remove('is-invalid', 'is-valid');

    // Validar email
    if (!email.value.trim()) {
        email.classList.add('is-invalid');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.add('is-valid');
    }

    // Validar contraseña (criterio más simple para login)
    if (!password.value.trim()) {
        password.classList.add('is-invalid');
        isValid = false;
    } else if (password.value.length < 6) {
        password.classList.add('is-invalid');
        isValid = false;
    } else {
        password.classList.add('is-valid');
    }

    return isValid;
}

// ========================================
// MANEJO DE SESIONES
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
// FUNCIONES DE LOGIN
// ========================================

/**
 * Maneja el proceso completo de login
 */
function handleLogin() {
    if (!validateLoginForm()) {
        showAlert('Por favor, completa todos los campos correctamente.', 'danger');
        return;
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simular proceso de login - REQUERIMIENTO: mostrar "usuario logueado"
    Swal.fire({
        title: '¡Éxito!',
        text: 'Usuario logueado',
        icon: 'success',
        confirmButtonText: 'Continuar',
        timer: 2000,
        timerProgressBar: true
    }).then(() => {
        // Guardar sesión
        saveUserSession(email);
        // Redirigir
        window.location.href = 'index.html';
    });
}

/**
 * Maneja la funcionalidad de "¿Olvidé mi contraseña?"
 */
function handleForgotPassword() {
    const email = document.getElementById('email').value;
    
    if (!email || !validateEmail(email)) {
        showAlert('Por favor, ingresa un email válido primero.', 'warning');
        return;
    }

    showAlert(`Se ha enviado un enlace de recuperación a ${email}`, 'info');
}

// ========================================
// UTILIDADES DE INTERFAZ PARA LOGIN
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
    }
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
    }
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
    });
    
    const errores = form.querySelectorAll('.invalid-feedback');
    errores.forEach(error => {
        error.textContent = '';
    });
}

// ========================================
// INICIALIZACIÓN DE LOGIN
// ========================================

/**
 * Configura los eventos de toggle de contraseña
 */
function setupPasswordToggles() {
    // Toggle para contraseña principal
    const togglePasswordBtn = document.getElementById('togglePassword');
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => togglePassword('password', 'eyeIcon'));
    }
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

// Inicializar cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Solo inicializar si estamos en la página de login
    if (document.getElementById('loginForm')) {
        // Configurar eventos de autenticación
        setupPasswordToggles();
        setupDateInputs();
        
        // Configurar evento del formulario de login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleLogin();
            });
        }
        
        // Configurar evento de "Olvidé mi contraseña"
        const forgotPasswordLink = document.getElementById('forgotPasswordLink');
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', function(e) {
                e.preventDefault();
                handleForgotPassword();
            });
        }
    }
});
