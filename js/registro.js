// Registro de Usuarios - Pastelería Mil Sabores
// Funcionalidades implementadas:
// - Alertas simples para beneficios de descuento
// - Validación de formulario de registro
// - Almacenamiento de usuarios en localStorage

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del formulario
    const registroForm = document.getElementById('registroForm');
    const alertContainer = document.getElementById('alertContainer');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const validarCodigoBtn = document.getElementById('validarCodigo');
    
    // Variables para almacenar beneficios (simplificadas)
    let beneficios = {};

    // Inicializar funcionalidades
    init();

    function init() {
        // Event listeners
        registroForm.addEventListener('submit', handleSubmit);
        togglePasswordBtn.addEventListener('click', togglePassword);
        validarCodigoBtn.addEventListener('click', validarCodigo);
        
        // Validaciones en tiempo real
        document.getElementById('nombre').addEventListener('blur', validarNombre);
        document.getElementById('apellido').addEventListener('blur', validarApellido);
        document.getElementById('fechaNacimiento').addEventListener('change', validarEdad);
        document.getElementById('email').addEventListener('blur', validarEmailDuoc);
        document.getElementById('password').addEventListener('blur', validarPassword);
        document.getElementById('confirmPassword').addEventListener('blur', validarConfirmPassword);
        
        // Configurar fecha máxima (hoy)
        const fechaMaxima = new Date().toISOString().split('T')[0];
        document.getElementById('fechaNacimiento').setAttribute('max', fechaMaxima);
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
        
        // Limpiar validaciones anteriores
        limpiarValidaciones();
        
        // Validar nombre
        if (!validarNombre()) esValido = false;
        
        // Validar apellido
        if (!validarApellido()) esValido = false;
        
        // Validar email
        if (!validarEmail()) esValido = false;
        
        // Validar fecha de nacimiento
        if (!validarFechaNacimiento()) esValido = false;
        
        // Validar contraseña
        if (!validarPassword()) esValido = false;
        
        // Validar confirmación de contraseña
        if (!validarConfirmPassword()) esValido = false;
        
        // Validar términos y condiciones
        if (!validarTerminos()) esValido = false;
        
        return esValido;
    }

    // Validaciones individuales usando funciones de auth.js
    function validarNombre() {
        const nombre = document.getElementById('nombre');
        const valor = nombre.value.trim();
        const validation = validateName(valor, 'nombre');
        
        if (!validation.valid) {
            mostrarError(nombre, validation.message);
            return false;
        }
        
        mostrarExito(nombre);
        return true;
    }

    function validarApellido() {
        const apellido = document.getElementById('apellido');
        const valor = apellido.value.trim();
        const validation = validateName(valor, 'apellido');
        
        if (!validation.valid) {
            mostrarError(apellido, validation.message);
            return false;
        }
        
        mostrarExito(apellido);
        return true;
    }

    function validarEmail() {
        const email = document.getElementById('email');
        const valor = email.value.trim();
        
        if (!valor) {
            mostrarError(email, 'El correo electrónico es requerido');
            return false;
        }
        
        if (!validateEmail(valor)) {
            mostrarError(email, 'Ingrese un correo electrónico válido');
            return false;
        }
        
        mostrarExito(email);
        return true;
    }

    function validarFechaNacimiento() {
        const fechaNacimiento = document.getElementById('fechaNacimiento');
        const valor = fechaNacimiento.value;
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
        const validation = validatePassword(valor);
        
        if (!validation.valid) {
            mostrarError(password, validation.message);
            return false;
        }
        
        mostrarExito(password);
        return true;
    }

    function validarConfirmPassword() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword');
        const valor = confirmPassword.value;
        const validation = validateConfirmPassword(password, valor);
        
        if (!validation.valid) {
            mostrarError(confirmPassword, validation.message);
            return false;
        }
        
        mostrarExito(confirmPassword);
        return true;
    }

    function validarTerminos() {
        const terminos = document.getElementById('terminos');
        
        if (!terminos.checked) {
            mostrarError(terminos, 'Debe aceptar los términos y condiciones');
            return false;
        }
        
        mostrarExito(terminos);
        return true;
    }

    // Validaciones específicas para beneficios (simplificadas con alerts)
    function validarEdad() {
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        if (fechaNacimiento) {
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

    function validarEmailDuoc() {
        const email = document.getElementById('email').value;
        if (email && email.endsWith('@duoc.cl')) {
            mostrarTortaGratis();
        }
    }

    function validarCodigo() {
        const codigo = document.getElementById('codigoDescuento').value.trim().toUpperCase();
        
        if (codigo === 'FELICES50') {
            mostrarDescuentoCodigo();
            document.getElementById('codigoDescuento').classList.add('is-valid');
        } else if (codigo && codigo !== 'FELICES50') {
            mostrarCodigoInvalido();
            document.getElementById('codigoDescuento').classList.add('is-invalid');
        } else {
            document.getElementById('codigoDescuento').classList.remove('is-valid', 'is-invalid');
        }
    }

    // Toggle de contraseña
    function togglePassword() {
        const password = document.getElementById('password');
        const eyeIcon = document.getElementById('eyeIcon');
        
        if (password.type === 'password') {
            password.type = 'text';
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        } else {
            password.type = 'password';
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
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
            beneficios = {};
            
        }, 1500);
    }

    // Utilidades
    function mostrarError(campo, mensaje) {
        campo.classList.remove('is-valid');
        campo.classList.add('is-invalid');
        
        const errorElement = document.getElementById(campo.id + 'Error');
        if (errorElement) {
            errorElement.textContent = mensaje;
        }
    }

    function mostrarExito(campo) {
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
        
        const errorElement = document.getElementById(campo.id + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    function limpiarValidaciones() {
        const campos = registroForm.querySelectorAll('.form-control, .form-check-input');
        campos.forEach(campo => {
            campo.classList.remove('is-valid', 'is-invalid');
        });
        
        const errores = registroForm.querySelectorAll('.invalid-feedback');
        errores.forEach(error => {
            error.textContent = '';
        });
    }

    function mostrarAlerta(tipo, mensaje) {
        const alerta = document.createElement('div');
        alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
        alerta.innerHTML = `
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        alertContainer.innerHTML = '';
        alertContainer.appendChild(alerta);
        
        // Auto-dismiss después de 5 segundos
        setTimeout(() => {
            if (alerta.parentNode) {
                alerta.remove();
            }
        }, 5000);
    }
});
