// ========================================
// LOGIN - Pastelería Mil Sabores
// Funciones específicas para la página de login
// ========================================

// ========================================
// LOGIN SIMPLIFICADO (BOTÓN DUMMY)
// ========================================

// ========================================
// FUNCIONES DE LOGIN
// ========================================

/**
 * Maneja el proceso completo de login
 */
function handleLogin() {
    // Simular login exitoso (botón dummy)
    Swal.fire({
        title: '¡Login Simulado!',
        text: 'Este es un botón de demostración. No hay autenticación real.',
        icon: 'info',
        confirmButtonText: 'Entendido',
        timer: 3000,
        timerProgressBar: true
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
        
        // Configurar evento del formulario de login (botón dummy)
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleLogin();
            });
        }
    }
});
