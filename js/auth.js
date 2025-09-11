// Autenticación - Pastelería Mil Sabores
// Funciones comunes de autenticación reutilizables

// ========================================
// FUNCIONES DE VALIDACIÓN COMUNES
// ========================================

// Función para validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar contraseña
function validatePassword(password) {
    if (password.length < 8) {
        return { valid: false, message: 'La contraseña debe tener al menos 8 caracteres' };
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return { valid: false, message: 'La contraseña debe incluir mayúsculas, minúsculas y números' };
    }
    
    return { valid: true, message: '' };
}

// Función para validar confirmación de contraseña
function validateConfirmPassword(password, confirmPassword) {
    if (confirmPassword !== password) {
        return { valid: false, message: 'Las contraseñas no coinciden' };
    }
    return { valid: true, message: '' };
}

// ========================================
// FUNCIONES DE INTERFAZ COMUNES
// ========================================

// Función para toggle de contraseña
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

// Función para mostrar alertas
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
// FUNCIONES DE VALIDACIÓN DE FORMULARIOS
// ========================================

// Función para mostrar error en campo
function mostrarError(campo, mensaje) {
    campo.classList.remove('is-valid');
    campo.classList.add('is-invalid');
    
    const errorElement = document.getElementById(campo.id + 'Error');
    if (errorElement) {
        errorElement.textContent = mensaje;
    }
}

// Función para mostrar éxito en campo
function mostrarExito(campo) {
    campo.classList.remove('is-invalid');
    campo.classList.add('is-valid');
    
    const errorElement = document.getElementById(campo.id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Función para limpiar validaciones
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
// FUNCIONES DE SESIÓN
// ========================================

// Función para guardar sesión de usuario
function saveUserSession(email, userData = {}) {
    sessionStorage.setItem('userLoggedIn', 'true');
    sessionStorage.setItem('userEmail', email);
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

// Función para verificar si el usuario está logueado
function isUserLoggedIn() {
    return sessionStorage.getItem('userLoggedIn') === 'true';
}

// Función para obtener datos del usuario
function getUserData() {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

// Función para cerrar sesión
function logout() {
    sessionStorage.removeItem('userLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userData');
}

// ========================================
// FUNCIONES DE VALIDACIÓN ESPECÍFICAS
// ========================================

// Función para validar nombre/apellido
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

// Función para validar fecha de nacimiento
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
// FUNCIONES DE BENEFICIOS ESPECIALES
// ========================================

// Función para mostrar descuento por edad (mayores de 50)
function mostrarDescuentoEdad() {
    Swal.fire({
        title: '¡Felicidades!',
        text: 'Por ser mayor de 50 años tienes un 50% de descuento en todos nuestros productos.',
        icon: 'success',
        confirmButtonText: 'Entendido'
    });
}

// Función para mostrar descuento por cumpleaños
function mostrarDescuentoCumpleanos() {
    Swal.fire({
        title: '¡Feliz cumpleaños!',
        text: 'Tienes un 15% de descuento especial por tu cumpleaños.',
        icon: 'success',
        confirmButtonText: 'Entendido'
    });
}

// Función para mostrar beneficio de torta gratis para usuarios @duoc.cl
function mostrarTortaGratis() {
    Swal.fire({
        title: '¡Excelente!',
        text: 'Por ser estudiante de Duoc UC recibirás una torta gratis en tu cumpleaños.',
        icon: 'success',
        confirmButtonText: 'Entendido'
    });
}

// Función para mostrar descuento por código válido
function mostrarDescuentoCodigo() {
    Swal.fire({
        title: '¡Código válido!',
        text: 'Tienes un 10% de descuento de por vida con el código FELICES50.',
        icon: 'success',
        confirmButtonText: 'Entendido'
    });
}

// Función para mostrar código inválido
function mostrarCodigoInvalido() {
    Swal.fire({
        title: 'Código inválido',
        text: 'Código de descuento inválido. Intenta con "FELICES50" para obtener un 10% de descuento.',
        icon: 'error',
        confirmButtonText: 'Entendido'
    });
}

// ========================================
// FUNCIONES DE INICIALIZACIÓN
// ========================================

// Función para configurar fecha máxima en inputs de fecha
function setupDateInputs() {
    const fechaMaxima = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.setAttribute('max', fechaMaxima);
    });
}

// Función para configurar eventos comunes de toggle de contraseña
function setupPasswordToggles() {
    // Toggle para contraseña principal
    const togglePasswordBtn = document.getElementById('togglePassword');
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => togglePassword('password', 'eyeIcon'));
    }
    
    // Toggle para confirmación de contraseña
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
    if (toggleConfirmPasswordBtn) {
        toggleConfirmPasswordBtn.addEventListener('click', () => togglePassword('confirmPassword', 'eyeIconConfirm'));
    }
}
