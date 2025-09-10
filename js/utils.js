// Pastelería Mil Sabores - JavaScript Global

// Variables globales
let cart = [];
let products = [];
let users = [];

// ========================================
// FUNCIONES DE LOGIN
// ========================================

// Función para toggle de contraseña
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
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

// Función para mostrar alertas
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer');
    if (alertContainer) {
        alertContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }
}

// Función para validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar formulario de login
function validateLoginForm() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    let isValid = true;

    // Limpiar errores anteriores
    document.getElementById('email').classList.remove('is-invalid');
    document.getElementById('password').classList.remove('is-invalid');
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    // Validar email
    if (!email) {
        document.getElementById('email').classList.add('is-invalid');
        document.getElementById('emailError').textContent = 'El correo electrónico es requerido';
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('email').classList.add('is-invalid');
        document.getElementById('emailError').textContent = 'Ingrese un correo electrónico válido';
        isValid = false;
    }

    // Validar contraseña
    if (!password) {
        document.getElementById('password').classList.add('is-invalid');
        document.getElementById('passwordError').textContent = 'La contraseña es requerida';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('password').classList.add('is-invalid');
        document.getElementById('passwordError').textContent = 'La contraseña debe tener al menos 6 caracteres';
        isValid = false;
    }

    return isValid;
}

// Función para simular login (usuarios de prueba)
function handleLogin(event) {
    event.preventDefault();
    
    if (!validateLoginForm()) {
        return;
    }

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;

    // Usuarios de prueba
    const testUsers = [
        { email: 'admin@duoc.cl', password: 'admin123', role: 'admin', name: 'Administrador' },
        { email: 'cliente@duoc.cl', password: 'cliente123', role: 'cliente', name: 'Cliente' },
        { email: 'senior@duoc.cl', password: 'senior123', role: 'senior', name: 'Usuario Senior' }
    ];

    // Buscar usuario
    const user = testUsers.find(u => u.email === email && u.password === password);

    if (user) {
        // Guardar en localStorage si "Recordarme" está marcado
        if (rememberMe) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.setItem('user', JSON.stringify(user));
        }

        showAlert(`¡Bienvenido ${user.name}!`, 'success');
        
        // Redirigir después de 1.5 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showAlert('Credenciales incorrectas. Verifique su email y contraseña.', 'danger');
    }
}

// Función para manejar "Olvidé mi contraseña"
function handleForgotPassword(event) {
    event.preventDefault();
    showAlert('Funcionalidad de recuperación de contraseña próximamente disponible.', 'info');
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Solo ejecutar en la página de login
    if (document.getElementById('loginForm')) {
        // Event listener para toggle de contraseña
        const togglePasswordBtn = document.getElementById('togglePassword');
        if (togglePasswordBtn) {
            togglePasswordBtn.addEventListener('click', togglePassword);
        }

        // Event listener para el formulario de login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }

        // Event listener para "Olvidé mi contraseña"
        const forgotPasswordLink = document.getElementById('forgotPasswordLink');
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', handleForgotPassword);
        }

        // Verificar si ya hay un usuario logueado
        const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            showAlert(`Ya tienes una sesión activa como ${user.name}`, 'info');
        }
    }
});

