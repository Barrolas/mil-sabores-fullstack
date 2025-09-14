// ========================================
// REGISTRO - Pastelería Mil Sabores
// Funciones específicas para la página de registro
// ========================================

// ========================================
// VALIDACIONES ESPECÍFICAS DE REGISTRO
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
// BENEFICIOS ESPECIALES
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
// UTILIDADES DE INTERFAZ
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

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del formulario
    const registroForm = document.getElementById('registroForm');
    const alertContainer = document.getElementById('alertContainer');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
    const validarCodigoBtn = document.getElementById('validarCodigo');
    
    // Variables para almacenar descuentos
    let descuentos = {};

    // Inicializar funcionalidades
    init();

    function init() {
        // Event listeners
        registroForm.addEventListener('submit', handleSubmit);
        togglePasswordBtn.addEventListener('click', () => togglePassword('password', 'eyeIcon'));
        toggleConfirmPasswordBtn.addEventListener('click', () => togglePassword('confirmPassword', 'confirmEyeIcon'));
        // Validación del código solo con botón (no automática)
        validarCodigoBtn.addEventListener('click', validarCodigo);
        
        // Validaciones en tiempo real (onblur - cuando el usuario sale del campo)
        // Esto evita validaciones molestas mientras el usuario está escribiendo
        document.getElementById('nombre').addEventListener('blur', validarNombre);
        document.getElementById('apellido').addEventListener('blur', validarApellido);
        document.getElementById('fechaNacimiento').addEventListener('blur', validarFechaNacimiento);
        document.getElementById('fechaNacimiento').addEventListener('change', validarEdad);
        document.getElementById('email').addEventListener('blur', validarEmail);
        document.getElementById('email').addEventListener('blur', validarEmailDuoc);
        document.getElementById('password').addEventListener('blur', validarPassword);
        document.getElementById('confirmPassword').addEventListener('blur', validarConfirmPassword);
        // Convertir a mayúsculas mientras escribe (sin validar)
        // Esto hace que el usuario vea inmediatamente el código en mayúsculas
        document.getElementById('codigoDescuento').addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
        
        // Configurar fecha máxima (hoy)
        setupDateInputs();
    }


    // Manejar envío del formulario
    function handleSubmit(e) {
        e.preventDefault();
        
        if (validarFormulario()) {
            procesarRegistro();
        }
    }

    // Validar formulario completo
    function validarFormulario() {
        let esValido = true;
        let camposConError = [];
        
        // Limpiar validaciones anteriores
        limpiarValidaciones();
        
        // Validar campos obligatorios (todos excepto código de descuento)
        if (!validarNombre()) {
            esValido = false;
            camposConError.push('Nombre');
        }
        
        if (!validarApellido()) {
            esValido = false;
            camposConError.push('Apellido');
        }
        
        if (!validarEmail()) {
            esValido = false;
            camposConError.push('Correo electrónico');
        }
        
        if (!validarFechaNacimiento()) {
            esValido = false;
            camposConError.push('Fecha de nacimiento');
        }
        
        if (!validarPassword()) {
            esValido = false;
            camposConError.push('Contraseña');
        }
        
        if (!validarConfirmPassword()) {
            esValido = false;
            camposConError.push('Confirmar contraseña');
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

    // Validaciones individuales usando funciones de auth.js
    function validarNombre() {
        const nombre = document.getElementById('nombre');
        const valor = nombre.value.trim();
        
        if (!valor) {
            mostrarError(nombre, 'El nombre es obligatorio');
            return false;
        }
        
        if (valor.length < 2) {
            mostrarError(nombre, 'El nombre debe tener al menos 2 caracteres');
            return false;
        }
        
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
            mostrarError(nombre, 'El nombre solo puede contener letras y espacios');
            return false;
        }
        
        mostrarExito(nombre);
        return true;
    }

    function validarApellido() {
        const apellido = document.getElementById('apellido');
        const valor = apellido.value.trim();
        
        if (!valor) {
            mostrarError(apellido, 'El apellido es obligatorio');
            return false;
        }
        
        if (valor.length < 2) {
            mostrarError(apellido, 'El apellido debe tener al menos 2 caracteres');
            return false;
        }
        
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
            mostrarError(apellido, 'El apellido solo puede contener letras y espacios');
            return false;
        }
        
        mostrarExito(apellido);
        return true;
    }

    function validarEmail() {
        const email = document.getElementById('email');
        const valor = email.value.trim();
        
        if (!valor) {
            mostrarError(email, 'El correo electrónico es obligatorio');
            return false;
        }
        
        if (!validateEmail(valor)) {
            mostrarError(email, 'Ingrese un correo electrónico válido (ejemplo: usuario@correo.com)');
            return false;
        }
        
        mostrarExito(email);
        return true;
    }

    function validarFechaNacimiento() {
        const fechaNacimiento = document.getElementById('fechaNacimiento');
        const valor = fechaNacimiento.value;
        
        if (!valor) {
            mostrarError(fechaNacimiento, 'La fecha de nacimiento es obligatoria');
            return false;
        }
        
        const validation = validateBirthDate(valor);
        
        if (!validation.valid) {
            mostrarError(fechaNacimiento, validation.message);
            return false;
        }
        
        mostrarExito(fechaNacimiento);
        return true;
    }

    function validarPassword() {
        const password = document.getElementById('password');
        const valor = password.value;
        
        if (!valor) {
            mostrarError(password, 'La contraseña es obligatoria');
            return false;
        }
        
        if (valor.length < 8) {
            mostrarError(password, 'La contraseña debe tener al menos 8 caracteres');
            return false;
        }
        
        if (!/(?=.*[a-z])/.test(valor)) {
            mostrarError(password, 'La contraseña debe contener al menos una letra minúscula');
            return false;
        }
        
        if (!/(?=.*[A-Z])/.test(valor)) {
            mostrarError(password, 'La contraseña debe contener al menos una letra mayúscula');
            return false;
        }
        
        if (!/(?=.*\d)/.test(valor)) {
            mostrarError(password, 'La contraseña debe contener al menos un número');
            return false;
        }
        
        mostrarExito(password);
        return true;
    }

    function validarConfirmPassword() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword');
        const valor = confirmPassword.value;
        
        if (!valor) {
            mostrarError(confirmPassword, 'La confirmación de contraseña es obligatoria');
            return false;
        }
        
        if (valor !== password) {
            mostrarError(confirmPassword, 'Las contraseñas no coinciden');
            return false;
        }
        
        mostrarExito(confirmPassword);
        return true;
    }


    // Validaciones específicas para descuentos (simplificadas con alerts)
    function validarEdad() {
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        if (fechaNacimiento) {
            // Validar que la fecha sea válida primero
            const validation = validateBirthDate(fechaNacimiento);
            if (validation.valid) {
            // El input type="date" ya devuelve formato yyyy-mm-dd
            const fecha = new Date(fechaNacimiento);
            const hoy = new Date();
            let edad = hoy.getFullYear() - fecha.getFullYear();
            const mes = hoy.getMonth() - fecha.getMonth();
            
            if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
                edad--;
            }
            
            if (edad >= 50) {
                mostrarDescuentoEdad();
                }
            }
        }
    }

    function validarEmailDuoc() {
        const email = document.getElementById('email').value;
        if (email && email.endsWith('@duoc.cl')) {
            // Solo mostrar el descuento si el email es válido
            if (validateEmail(email)) {
            mostrarTortaGratis();
            }
        }
    }

    function validarCodigo() {
        const codigoInput = document.getElementById('codigoDescuento');
        let codigo = codigoInput.value.trim().toUpperCase();
        
        // Convertir automáticamente a mayúsculas
        codigoInput.value = codigo;
        
        if (codigo === 'FELICES50') {
            mostrarDescuentoCodigo();
            codigoInput.classList.add('is-valid');
            codigoInput.classList.remove('is-invalid');
        } else if (codigo && codigo !== 'FELICES50') {
            mostrarCodigoInvalido();
            codigoInput.classList.add('is-invalid');
            codigoInput.classList.remove('is-valid');
        } else {
            // Campo vacío - limpiar validaciones
            codigoInput.classList.remove('is-valid', 'is-invalid');
        }
    }


    // Procesar registro
    function procesarRegistro() {
        const btnRegistro = document.getElementById('registroBtn');
        const datosFormulario = new FormData(registroForm);
        
        // Mostrar loading
        btnRegistro.classList.add('btn-loading');
        btnRegistro.disabled = true;
        
        // Simular procesamiento
        setTimeout(() => {
            // El input type="date" ya devuelve formato yyyy-mm-dd
            const fechaNacimiento = datosFormulario.get('fechaNacimiento');
            
            // Crear objeto de usuario
            const usuario = {
                id: Date.now(),
                nombre: datosFormulario.get('nombre'),
                apellido: datosFormulario.get('apellido'),
                email: datosFormulario.get('email'),
                fechaNacimiento: fechaNacimiento,
                password: datosFormulario.get('password'),
                fechaRegistro: new Date().toISOString()
            };
            
            // Guardar en localStorage
            let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
            usuarios.push(usuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            
            // Mostrar mensaje de éxito con SweetAlert2
            Swal.fire({
                title: '¡Registro Exitoso!',
                text: 'Bienvenido a Mil Sabores. Tu cuenta ha sido creada correctamente.',
                icon: 'success',
                confirmButtonText: 'Continuar',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then((result) => {
                // Redirigir a login después de cerrar el alert
                window.location.href = 'login.html';
            });
            
            // Redirigir automáticamente después de 3 segundos si no se hace clic
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
            
            // Resetear formulario
            registroForm.reset();
            descuentos = {};
            
        }, 1500);
    }

    // Utilidades específicas de registro
    function limpiarValidaciones() {
        limpiarValidaciones('registroForm');
    }

    function mostrarAlerta(tipo, mensaje) {
        Swal.fire({
            title: tipo === 'success' ? '¡Éxito!' : tipo === 'error' ? 'Error' : 'Información',
            text: mensaje,
            icon: tipo === 'success' ? 'success' : tipo === 'error' ? 'error' : 'info',
            confirmButtonText: 'Entendido'
        });
    }
});
