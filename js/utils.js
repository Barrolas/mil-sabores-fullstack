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

// ========================================
// FUNCIONES DE DESCUENTOS Y BENEFICIOS
// ========================================

// Función para calcular descuentos basados en usuario
function calcularDescuentos(usuario, precioOriginal) {
    let descuentos = [];
    let precioFinal = precioOriginal;
    
    // Descuento por edad (50% para mayores de 50 años)
    if (usuario.beneficios && usuario.beneficios.descuento50) {
        const descuento50 = precioOriginal * 0.5;
        descuentos.push({
            tipo: 'Edad (50+ años)',
            porcentaje: 50,
            monto: descuento50
        });
        precioFinal -= descuento50;
    }
    
    // Descuento por código (10% con FELICES50)
    if (usuario.beneficios && usuario.beneficios.descuento10) {
        const descuento10 = precioOriginal * 0.1;
        descuentos.push({
            tipo: 'Código FELICES50',
            porcentaje: 10,
            monto: descuento10
        });
        precioFinal -= descuento10;
    }
    
    // Descuento por correo Duoc (20% adicional)
    if (usuario.email && usuario.email.endsWith('@duoc.cl')) {
        const descuentoDuoc = precioOriginal * 0.2;
        descuentos.push({
            tipo: 'Estudiante Duoc',
            porcentaje: 20,
            monto: descuentoDuoc
        });
        precioFinal -= descuentoDuoc;
    }
    
    return {
        descuentos: descuentos,
        precioOriginal: precioOriginal,
        precioFinal: Math.max(0, precioFinal),
        ahorroTotal: precioOriginal - Math.max(0, precioFinal)
    };
}

// Función para verificar si es cumpleaños del usuario
function esCumpleanos(usuario) {
    if (!usuario.fechaNacimiento) return false;
    
    const hoy = new Date();
    const fechaNacimiento = new Date(usuario.fechaNacimiento);
    
    return hoy.getMonth() === fechaNacimiento.getMonth() && 
           hoy.getDate() === fechaNacimiento.getDate();
}

// Función para verificar elegibilidad para torta gratis
function esElegibleTortaGratis(usuario) {
    return usuario.email && 
           usuario.email.endsWith('@duoc.cl') && 
           esCumpleanos(usuario);
}

// Función para obtener beneficios del usuario
function obtenerBeneficiosUsuario(usuario) {
    const beneficios = {
        descuento50: false,
        descuento10: false,
        tortaGratis: false,
        descuentoDuoc: false
    };
    
    // Verificar descuento por edad
    if (usuario.fechaNacimiento) {
        const fecha = new Date(usuario.fechaNacimiento);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fecha.getFullYear();
        const mes = hoy.getMonth() - fecha.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
            edad--;
        }
        
        beneficios.descuento50 = edad >= 50;
    }
    
    // Verificar descuento por código
    if (usuario.beneficios && usuario.beneficios.descuento10) {
        beneficios.descuento10 = true;
    }
    
    // Verificar torta gratis por cumpleaños
    beneficios.tortaGratis = esElegibleTortaGratis(usuario);
    
    // Verificar descuento por correo Duoc
    if (usuario.email && usuario.email.endsWith('@duoc.cl')) {
        beneficios.descuentoDuoc = true;
    }
    
    return beneficios;
}

// Función para mostrar beneficios en la interfaz
function mostrarBeneficiosUsuario(usuario) {
    const beneficios = obtenerBeneficiosUsuario(usuario);
    const mensajes = [];
    
    if (beneficios.descuento50) {
        mensajes.push('🎉 Tienes 50% de descuento por ser mayor de 50 años');
    }
    
    if (beneficios.descuento10) {
        mensajes.push('⭐ Tienes 10% de descuento con código FELICES50');
    }
    
    if (beneficios.descuentoDuoc) {
        mensajes.push('🎓 Tienes 20% de descuento por ser estudiante Duoc');
    }
    
    if (beneficios.tortaGratis) {
        mensajes.push('🎂 ¡Feliz cumpleaños! Tienes una torta gratis');
    }
    
    return mensajes;
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

