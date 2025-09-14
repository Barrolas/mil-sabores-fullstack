// ========================================
// LOGIN - Pastelería Mil Sabores
// Funciones específicas para la página de login
// ========================================

// ========================================
// LOGIN CON VALIDACIONES (BOTÓN DUMMY)
// ========================================

// ========================================
// FUNCIONES DE VALIDACIÓN
// ========================================

/**
 * Valida el campo de email
 */
function validarEmailLogin() {
    const email = document.getElementById('email');
    const valor = email.value.trim();
    
    if (valor === '') {
        mostrarError(email, 'El email es obligatorio');
        return false;
    } else if (!validateEmail(valor)) {
        mostrarError(email, 'Ingresa un email válido');
        return false;
    } else {
        mostrarExito(email);
        return true;
    }
}

/**
 * Valida el campo de contraseña
 */
function validarPasswordLogin() {
    const password = document.getElementById('password');
    const valor = password.value;
    
    if (valor === '') {
        mostrarError(password, 'La contraseña es obligatoria');
        return false;
    } else if (valor.length < 6) {
        mostrarError(password, 'La contraseña debe tener al menos 6 caracteres');
        return false;
    } else {
        mostrarExito(password);
        return true;
    }
}

/**
 * Valida el formulario completo
 */
function validarFormularioLogin() {
    const emailValido = validarEmailLogin();
    const passwordValida = validarPasswordLogin();
    
    return emailValido && passwordValida;
}

// ========================================
// FUNCIONES DE LOGIN
// ========================================

/**
 * Maneja el proceso completo de login
 */
function handleLogin() {
    if (validarFormularioLogin()) {
        // Simular login exitoso (botón dummy con validaciones)
        Swal.fire({
            title: '¡Login Simulado!',
            text: 'Este es un botón de demostración. No hay autenticación real.',
            icon: 'info',
            confirmButtonText: 'Entendido',
            timer: 3000,
            timerProgressBar: true
        });
    } else {
        Swal.fire({
            title: 'Formulario Incompleto',
            text: 'Por favor completa todos los campos obligatorios y corrige los errores marcados.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    }
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
        // Event listeners para validaciones onblur
        document.getElementById('email').addEventListener('blur', validarEmailLogin);
        document.getElementById('password').addEventListener('blur', validarPasswordLogin);
        
        // Configurar eventos de autenticación
        setupPasswordToggles();
        setupDateInputs();
        
        // Configurar evento del formulario de login (botón dummy con validaciones)
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleLogin();
            });
        }
    }
});
