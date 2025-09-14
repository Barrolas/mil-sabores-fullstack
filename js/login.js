// ========================================
// LOGIN - Pastelería Mil Sabores
// Funciones específicas para la página de login
// ========================================

// ========================================
// VALIDACIONES DE LOGIN
// ========================================
// Nota: validateEmail() ahora está en js/common.js

/**
 * Valida el formulario completo de login
 * @returns {boolean} true si es válido, false si no
 */
function validateLoginForm() {
    let esValido = true;
    let camposConError = [];
    
    // Limpiar validaciones anteriores
    limpiarValidaciones('loginForm');
    
    // Validar campos obligatorios
    if (!validarEmailLogin()) {
        esValido = false;
        camposConError.push('Correo electrónico');
    }
    
    if (!validarPasswordLogin()) {
        esValido = false;
        camposConError.push('Contraseña');
    }
    
    // Mostrar mensaje de error si hay campos con problemas
    if (!esValido) {
        Swal.fire({
            title: 'Campos Incompletos',
            text: 'Por favor, completa todos los campos obligatorios correctamente.',
            icon: 'error',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#dc3545'
        });
    }
    
    return esValido;
}

/**
 * Valida el campo de email individualmente
 * @returns {boolean} true si es válido, false si no
 */
function validarEmailLogin() {
    return validateEmailField('email', true);
}

/**
 * Valida el campo de contraseña individualmente
 * @returns {boolean} true si es válido, false si no
 */
function validarPasswordLogin() {
    const password = document.getElementById('password');
    const valor = password.value;
    
    if (!valor) {
        mostrarError(password, 'La contraseña es obligatoria');
        return false;
    }
    
    if (valor.length < 6) {
        mostrarError(password, 'La contraseña debe tener al menos 6 caracteres');
        return false;
    }
    
    mostrarExito(password);
    return true;
}

// ========================================
// MANEJO DE SESIONES
// ========================================
// Nota: Funciones de sesión ahora están en js/common.js

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


// ========================================
// UTILIDADES DE INTERFAZ PARA LOGIN
// ========================================
// Nota: Funciones de interfaz ahora están en js/common.js


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

// Nota: setupDateInputs() ahora está en js/common.js

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
        
        // Validaciones en tiempo real (onblur - cuando el usuario sale del campo)
        // Esto evita validaciones molestas mientras el usuario está escribiendo
        document.getElementById('email').addEventListener('blur', validarEmailLogin);
        document.getElementById('password').addEventListener('blur', validarPasswordLogin);
        
    }
});
