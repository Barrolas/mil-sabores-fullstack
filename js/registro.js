// Registro de Usuarios - Pastelería Mil Sabores
// Funcionalidades implementadas:
// - Descuento 50% para usuarios mayores de 50 años
// - Descuento 10% con código "FELICES50"
// - Tortas gratis para estudiantes Duoc en su cumpleaños

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del formulario
    const registroForm = document.getElementById('registroForm');
    const alertContainer = document.getElementById('alertContainer');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const validarCodigoBtn = document.getElementById('validarCodigo');
    
    // Variables para almacenar beneficios
    let beneficios = {
        descuento50: false,
        descuento10: false,
        tortaGratis: false
    };

    // Inicializar funcionalidades
    init();

    function init() {
        // Event listeners
        registroForm.addEventListener('submit', handleSubmit);
        togglePasswordBtn.addEventListener('click', togglePassword);
        validarCodigoBtn.addEventListener('click', validarCodigo);
        
        // Validaciones en tiempo real
        document.getElementById('fechaNacimiento').addEventListener('change', validarEdad);
        document.getElementById('email').addEventListener('blur', validarEmailDuoc);
        document.getElementById('password').addEventListener('input', validarPassword);
        document.getElementById('confirmPassword').addEventListener('input', validarConfirmPassword);
        
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

    // Validaciones individuales
    function validarNombre() {
        const nombre = document.getElementById('nombre');
        const valor = nombre.value.trim();
        
        if (valor.length < 2) {
            mostrarError(nombre, 'El nombre debe tener al menos 2 caracteres');
            return false;
        }
        
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
            mostrarError(nombre, 'El nombre solo puede contener letras');
            return false;
        }
        
        mostrarExito(nombre);
        return true;
    }

    function validarApellido() {
        const apellido = document.getElementById('apellido');
        const valor = apellido.value.trim();
        
        if (valor.length < 2) {
            mostrarError(apellido, 'El apellido debe tener al menos 2 caracteres');
            return false;
        }
        
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
            mostrarError(apellido, 'El apellido solo puede contener letras');
            return false;
        }
        
        mostrarExito(apellido);
        return true;
    }

    function validarEmail() {
        const email = document.getElementById('email');
        const valor = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!valor) {
            mostrarError(email, 'El correo electrónico es requerido');
            return false;
        }
        
        if (!emailRegex.test(valor)) {
            mostrarError(email, 'Ingrese un correo electrónico válido');
            return false;
        }
        
        mostrarExito(email);
        return true;
    }

    function validarFechaNacimiento() {
        const fechaNacimiento = document.getElementById('fechaNacimiento');
        const valor = fechaNacimiento.value;
        
        if (!valor) {
            mostrarError(fechaNacimiento, 'La fecha de nacimiento es requerida');
            return false;
        }
        
        const fecha = new Date(valor);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fecha.getFullYear();
        const mes = hoy.getMonth() - fecha.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
            edad--;
        }
        
        if (edad < 13) {
            mostrarError(fechaNacimiento, 'Debe ser mayor de 13 años para registrarse');
            return false;
        }
        
        if (edad > 120) {
            mostrarError(fechaNacimiento, 'Ingrese una fecha de nacimiento válida');
            return false;
        }
        
        mostrarExito(fechaNacimiento);
        return true;
    }

    function validarPassword() {
        const password = document.getElementById('password');
        const valor = password.value;
        
        if (valor.length < 8) {
            mostrarError(password, 'La contraseña debe tener al menos 8 caracteres');
            return false;
        }
        
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(valor)) {
            mostrarError(password, 'La contraseña debe incluir mayúsculas, minúsculas y números');
            return false;
        }
        
        mostrarExito(password);
        return true;
    }

    function validarConfirmPassword() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword');
        const valor = confirmPassword.value;
        
        if (valor !== password) {
            mostrarError(confirmPassword, 'Las contraseñas no coinciden');
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

    // Validaciones específicas para beneficios
    function validarEdad() {
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        if (fechaNacimiento) {
            const fecha = new Date(fechaNacimiento);
            const hoy = new Date();
            const edad = hoy.getFullYear() - fecha.getFullYear();
            const mes = hoy.getMonth() - fecha.getMonth();
            
            if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
                edad--;
            }
            
            if (edad >= 50) {
                beneficios.descuento50 = true;
                mostrarAlerta('success', '¡Felicitaciones! Eres elegible para un 50% de descuento en todos los productos.');
            } else {
                beneficios.descuento50 = false;
            }
        }
    }

    function validarEmailDuoc() {
        const email = document.getElementById('email').value;
        if (email && email.endsWith('@duoc.cl')) {
            beneficios.tortaGratis = true;
            mostrarAlerta('info', '¡Excelente! Como estudiante de Duoc, recibirás una torta gratis en tu cumpleaños.');
        } else {
            beneficios.tortaGratis = false;
        }
    }

    function validarCodigo() {
        const codigo = document.getElementById('codigoDescuento').value.trim().toUpperCase();
        
        if (codigo === 'FELICES50') {
            beneficios.descuento10 = true;
            mostrarAlerta('success', '¡Código válido! Recibirás un 10% de descuento de por vida.');
            document.getElementById('codigoDescuento').classList.add('is-valid');
        } else if (codigo && codigo !== 'FELICES50') {
            mostrarAlerta('danger', 'Código de descuento inválido. Intenta con "FELICES50".');
            document.getElementById('codigoDescuento').classList.add('is-invalid');
        } else {
            beneficios.descuento10 = false;
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
            // Crear objeto de usuario
            const usuario = {
                id: Date.now(),
                nombre: datosFormulario.get('nombre'),
                apellido: datosFormulario.get('apellido'),
                email: datosFormulario.get('email'),
                fechaNacimiento: datosFormulario.get('fechaNacimiento'),
                password: datosFormulario.get('password'),
                beneficios: beneficios,
                fechaRegistro: new Date().toISOString()
            };
            
            // Guardar en localStorage
            let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
            usuarios.push(usuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            
            // Mostrar mensaje de éxito
            mostrarAlerta('success', '¡Registro exitoso! Bienvenido a Mil Sabores.');
            
            // Resetear formulario
            registroForm.reset();
            beneficios = { descuento50: false, descuento10: false, tortaGratis: false };
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            
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
