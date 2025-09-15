
function validarEmailLogin() {
    // ====================================================================================
    // PASO 1: OBTENCIÓN DE DATOS DEL CAMPO
    // ====================================================================================
    const email = document.getElementById('email');
    const valor = email.value.trim();
    
    // ====================================================================================
    // PASO 2: VALIDACIÓN DE CAMPO VACÍO
    // ====================================================================================
    if (valor === '') {
        mostrarError(email, 'El email es obligatorio');
        return false;
    } 
    // ====================================================================================
    // PASO 3: VALIDACIÓN DE FORMATO DE EMAIL
    // ====================================================================================
    else if (!validateEmail(valor)) {
        mostrarError(email, 'Ingresa un email válido');
        return false;
    } 
    // ====================================================================================
    // PASO 4: EMAIL VÁLIDO → ÉXITO
    // ====================================================================================
    else {
        mostrarExito(email);
        return true;
    }
}

function validarPasswordLogin() {
    // ====================================================================================
    // PASO 1: OBTENCIÓN DE DATOS DEL CAMPO
    // ====================================================================================
    const password = document.getElementById('password');
    const valor = password.value;
    
    // ====================================================================================
    // PASO 2: VALIDACIÓN DE CAMPO VACÍO
    // ====================================================================================
    if (valor === '') {
        mostrarError(password, 'La contraseña es obligatoria');
        return false;
    } 
    // ====================================================================================
    // PASO 3: VALIDACIÓN DE LONGITUD MÍNIMA
    // ====================================================================================
    else if (valor.length < 6) {
        mostrarError(password, 'La contraseña debe tener al menos 6 caracteres');
        return false;
    } 
    // ====================================================================================
    // PASO 4: CONTRASEÑA VÁLIDA → ÉXITO
    // ====================================================================================
    else {
        mostrarExito(password);
        return true;
    }
}

function validarFormularioLogin() {
    // ====================================================================================
    // PASO 1: VALIDACIÓN DE EMAIL
    // ====================================================================================
    const emailValido = validarEmailLogin();
    
    // ====================================================================================
    // PASO 2: VALIDACIÓN DE CONTRASEÑA
    // ====================================================================================
    const passwordValida = validarPasswordLogin();
    
    // ====================================================================================
    // PASO 3: RESULTADO CONSOLIDADO
    // ====================================================================================
    return emailValido && passwordValida;
}

function handleLogin() {
    // ====================================================================================
    // PASO 1: VALIDACIÓN DEL FORMULARIO
    // ====================================================================================
    if (validarFormularioLogin()) {
        // ====================================================================================
        // PASO 2: PROCESO DE LOGIN EXITOSO (SIMULADO)
        // ====================================================================================
        Swal.fire({
            title: '¡Login Simulado!',
            text: 'Este es un botón de demostración. No hay autenticación real.',
            icon: 'info',
            confirmButtonText: 'Entendido',
            timer: 3000,
            timerProgressBar: true
        });
    } else {
        // ====================================================================================
        // PASO 3: MANEJO DE ERRORES DE VALIDACIÓN
        // ====================================================================================
        Swal.fire({
            title: 'Formulario Incompleto',
            text: 'Por favor completa todos los campos obligatorios y corrige los errores marcados.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    }
}


function setupPasswordToggles() {
    // ====================================================================================
    // PASO 1: BÚSQUEDA Y CONFIGURACIÓN DEL BOTÓN DE TOGGLE
    // ====================================================================================
    const togglePasswordBtn = document.getElementById('togglePassword');
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => togglePassword('password', 'eyeIcon'));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // ====================================================================================
    // PASO 1: VERIFICACIÓN DE PÁGINA DE LOGIN
    // ====================================================================================
    if (document.getElementById('loginForm')) {
        // ====================================================================================
        // PASO 2: CONFIGURACIÓN DE VALIDACIONES ONBLUR
        // ====================================================================================
        document.getElementById('email').addEventListener('blur', validarEmailLogin);
        document.getElementById('password').addEventListener('blur', validarPasswordLogin);
        
        // ====================================================================================
        // PASO 3: CONFIGURACIÓN DE EVENTOS DE INTERFAZ
        // ====================================================================================
        setupPasswordToggles();
        
        // ====================================================================================
        // PASO 4: CONFIGURACIÓN DEL FORMULARIO DE LOGIN
        // ====================================================================================
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleLogin();
            });
        }
    }
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function mostrarError(campo, mensaje) {
    campo.classList.remove('is-valid');
    campo.classList.add('is-invalid');
    
    const errorElement = document.getElementById(campo.id + 'Error');
    if (errorElement) {
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
    }
}

function mostrarExito(campo) {
    campo.classList.remove('is-invalid');
    campo.classList.add('is-valid');
    
    const errorElement = document.getElementById(campo.id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

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


console.log('✅ login.js cargado correctamente - Sistema de login disponible');
