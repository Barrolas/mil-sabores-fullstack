    function validarNombre() {
    // ====================================================================================
    // PASO 1: OBTENCIÓN DE DATOS DEL CAMPO
    // ====================================================================================
        const nombre = document.getElementById('nombre');
        const valor = nombre.value.trim();
        
    // ====================================================================================
    // PASO 2: VALIDACIÓN DE CAMPO VACÍO
    // ====================================================================================
    if (valor === '') {
        mostrarError(nombre, 'El nombre es obligatorio');
        return false;
    }
    // ====================================================================================
    // PASO 3: VALIDACIÓN DE LONGITUD MÍNIMA
    // ====================================================================================
    else if (valor.length < 2) {
            mostrarError(nombre, 'El nombre debe tener al menos 2 caracteres');
            return false;
        }
    // ====================================================================================
    // PASO 4: VALIDACIÓN DE CARACTERES PERMITIDOS
    // ====================================================================================
    else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
            mostrarError(nombre, 'El nombre solo puede contener letras');
            return false;
        }
    // ====================================================================================
    // PASO 5: NOMBRE VÁLIDO → ÉXITO
    // ====================================================================================
    else {
        mostrarExito(nombre);
        return true;
    }
    }

    function validarApellido() {
        const apellido = document.getElementById('apellido');
        const valor = apellido.value.trim();
        
    if (valor === '') {
        mostrarError(apellido, 'El apellido es obligatorio');
        return false;
    } else if (valor.length < 2) {
            mostrarError(apellido, 'El apellido debe tener al menos 2 caracteres');
            return false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
            mostrarError(apellido, 'El apellido solo puede contener letras');
            return false;
    } else {
        mostrarExito(apellido);
        return true;
    }
    }

    function validarEmail() {
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
        // Validar si es email Duoc para mostrar beneficio
        validarEmailDuoc();
        return true;
    }
    }

    function validarFechaNacimiento() {
        const fechaNacimiento = document.getElementById('fechaNacimiento');
        const valor = fechaNacimiento.value;
        
    if (valor === '') {
        mostrarError(fechaNacimiento, 'La fecha de nacimiento es obligatoria');
            return false;
    } else {
        const fecha = new Date(valor);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fecha.getFullYear();

        if (edad < 18) {
            mostrarError(fechaNacimiento, 'Debes ser mayor de 18 años');
            return false;
        } else if (edad > 100) {
            mostrarError(fechaNacimiento, 'Ingresa una fecha válida');
            return false;
        } else {
            mostrarExito(fechaNacimiento);
            // Mostrar beneficio por edad si es mayor de 50
            if (edad >= 50) {
                mostrarDescuentoEdad();
            }
            return true;
        }
    }
    }

    function validarPassword() {
        const password = document.getElementById('password');
        const valor = password.value;
        
    if (valor === '') {
        mostrarError(password, 'La contraseña es obligatoria');
        return false;
    } else if (valor.length < 8) {
            mostrarError(password, 'La contraseña debe tener al menos 8 caracteres');
            return false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(valor)) {
        mostrarError(password, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número');
            return false;
    } else {
        mostrarExito(password);
        return true;
    }
    }

    function validarConfirmPassword() {
        const confirmPassword = document.getElementById('confirmPassword');
    const password = document.getElementById('password');
        const valor = confirmPassword.value;
        
    if (valor === '') {
        mostrarError(confirmPassword, 'Confirma tu contraseña');
        return false;
    } else if (valor !== password.value) {
            mostrarError(confirmPassword, 'Las contraseñas no coinciden');
            return false;
    } else {
        mostrarExito(confirmPassword);
        return true;
    }
}


function validarEmailDuoc() {
    const email = document.getElementById('email');
    const valor = email.value.trim();

    if (valor.endsWith('@duoc.cl')) {
        mostrarTortaGratis();
        return true;
    }
    return false;
    }

    function validarCodigo() {
    const codigo = document.getElementById('codigoDescuento');
    const valor = codigo.value.trim();
        
    if (valor === '') {
        return true; // Campo opcional
    } else if (valor === 'FELICES50') {
            mostrarDescuentoCodigo();
        return true;
    } else {
            mostrarCodigoInvalido();
        return false;
    }
}

// Función principal de validación
function validarFormulario() {
    const nombreValido = validarNombre();
    const apellidoValido = validarApellido();
    const emailValido = validarEmail();
    const fechaValida = validarFechaNacimiento();
    const passwordValida = validarPassword();
    const confirmPasswordValida = validarConfirmPassword();
    const codigoValido = validarCodigo();

    return nombreValido && apellidoValido && emailValido && fechaValida &&
        passwordValida && confirmPasswordValida && codigoValido;
}

// Función para procesar el registro
    function procesarRegistro() {
    if (validarFormulario()) {
        // Simular registro exitoso
            Swal.fire({
                title: '¡Registro Exitoso!',
            text: 'Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.',
                icon: 'success',
                confirmButtonText: 'Continuar',
                timer: 3000,
            timerProgressBar: true
        }).then(() => {
            // Redirigir al login
                window.location.href = 'login.html';
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

// Configurar event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Event listeners para validaciones onblur
    document.getElementById('nombre').addEventListener('blur', validarNombre);
    document.getElementById('apellido').addEventListener('blur', validarApellido);
    document.getElementById('email').addEventListener('blur', validarEmail);
    document.getElementById('fechaNacimiento').addEventListener('blur', validarFechaNacimiento);
    document.getElementById('password').addEventListener('blur', validarPassword);
    document.getElementById('confirmPassword').addEventListener('blur', validarConfirmPassword);
    document.getElementById('codigoDescuento').addEventListener('blur', validarCodigo);

    // Event listener para el formulario
    document.getElementById('registroForm').addEventListener('submit', function (e) {
        e.preventDefault();
        procesarRegistro();
    });

    // Convertir código de descuento a mayúsculas mientras escribe
    document.getElementById('codigoDescuento').addEventListener('input', function () {
        this.value = this.value.toUpperCase();
    });

    // Event listener para el botón de validar código
    document.getElementById('validarCodigo').addEventListener('click', function () {
        validarCodigo();
    });

    // Configurar inputs de fecha
    setupDateInputs();

    // Configurar toggles de contraseña
    setupPasswordToggles();
});

// Función para configurar toggles de contraseña
function setupPasswordToggles() {
    const passwordToggle = document.getElementById('togglePassword');
    const confirmPasswordToggle = document.getElementById('toggleConfirmPassword');

    if (passwordToggle) {
        passwordToggle.addEventListener('click', function () {
            togglePassword('password', 'eyeIcon');
        });
    }

    if (confirmPasswordToggle) {
        confirmPasswordToggle.addEventListener('click', function () {
            togglePassword('confirmPassword', 'confirmEyeIcon');
        });
    }
}

// ========================================
// FUNCIONES ESPECÍFICAS DE REGISTRO
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
}

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
 * Configura los inputs de fecha con fecha máxima
 */
function setupDateInputs() {
    const fechaMaxima = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.setAttribute('max', fechaMaxima);
    });
}


// ========================================
// FUNCIONES DE BENEFICIOS ESPECIALES
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

console.log('✅ registro.js cargado correctamente - Sistema de registro con beneficios disponible');