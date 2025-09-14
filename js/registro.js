// ========================================
// REGISTRO - Pastelería Mil Sabores
// Funciones específicas para la página de registro
// ========================================

// Validaciones individuales
function validarNombre() {
    const nombre = document.getElementById('nombre');
    const valor = nombre.value.trim();
    
    if (valor === '') {
        mostrarError(nombre, 'El nombre es obligatorio');
        return false;
    } else if (valor.length < 2) {
        mostrarError(nombre, 'El nombre debe tener al menos 2 caracteres');
        return false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
        mostrarError(nombre, 'El nombre solo puede contener letras');
        return false;
    } else {
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
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners para validaciones onblur
    document.getElementById('nombre').addEventListener('blur', validarNombre);
    document.getElementById('apellido').addEventListener('blur', validarApellido);
    document.getElementById('email').addEventListener('blur', validarEmail);
    document.getElementById('fechaNacimiento').addEventListener('blur', validarFechaNacimiento);
    document.getElementById('password').addEventListener('blur', validarPassword);
    document.getElementById('confirmPassword').addEventListener('blur', validarConfirmPassword);
    document.getElementById('codigoDescuento').addEventListener('blur', validarCodigo);
    
    // Event listener para el formulario
    document.getElementById('registroForm').addEventListener('submit', function(e) {
        e.preventDefault();
        procesarRegistro();
    });
    
    // Convertir código de descuento a mayúsculas mientras escribe
    document.getElementById('codigoDescuento').addEventListener('input', function() {
        this.value = this.value.toUpperCase();
    });
    
    // Event listener para el botón de validar código
    document.getElementById('validarCodigo').addEventListener('click', function() {
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
        passwordToggle.addEventListener('click', function() {
            togglePassword('password', 'eyeIcon');
        });
    }
    
    if (confirmPasswordToggle) {
        confirmPasswordToggle.addEventListener('click', function() {
            togglePassword('confirmPassword', 'confirmEyeIcon');
        });
    }
}