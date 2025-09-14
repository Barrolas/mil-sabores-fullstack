// ========================================
// REGISTRO - Pastelería Mil Sabores
// Funciones específicas para la página de registro
// ========================================

// ========================================
// VALIDACIONES ESPECÍFICAS DE REGISTRO
// ========================================
// Nota: Funciones de validación ahora están en js/common.js

// ========================================
// BENEFICIOS ESPECIALES
// ========================================
// Nota: Funciones de beneficios ahora están en js/common.js

// ========================================
// UTILIDADES DE INTERFAZ
// ========================================
// Nota: Funciones de interfaz ahora están en js/common.js

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
        limpiarValidaciones('registroForm');
        
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
        console.log('validarEmailDuoc called with email:', email);
        
        if (email && email.endsWith('@duoc.cl')) {
            console.log('Email ends with @duoc.cl');
            // Solo mostrar el descuento si el email es válido
            if (validateEmail(email)) {
                console.log('Email is valid, showing torta gratis');
            mostrarTortaGratis();
            } else {
                console.log('Email format is invalid');
            }
        } else {
            console.log('Email does not end with @duoc.cl');
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
    // Nota: limpiarValidaciones() y mostrarAlerta() ahora están en js/common.js
});
