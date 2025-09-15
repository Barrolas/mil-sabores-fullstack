
function validateEmailField(fieldId, required = true) {
    // ====================================================================================
    // PASO 1: OBTENCIÓN DE DATOS DEL CAMPO
    // ====================================================================================
    const email = document.getElementById(fieldId);
    const valor = email.value.trim();
    
    // ====================================================================================
    // PASO 2: VALIDACIÓN DE CAMPO VACÍO
    // ====================================================================================
    if (!valor) {
        if (required) {
            // Campo obligatorio vacío → Error
            mostrarError(email, 'El correo electrónico es obligatorio');
            return false;
        } else {
            // Campo opcional vacío → Válido
            mostrarExito(email);
            return true;
        }
    }
    
    // ====================================================================================
    // PASO 3: VALIDACIÓN DE FORMATO DE EMAIL
    // ====================================================================================
    if (!validateEmail(valor)) {
        // Formato inválido → Error con mensaje descriptivo
        mostrarError(email, 'Ingrese un correo electrónico válido (ejemplo: usuario@correo.com)');
        return false;
    }
    
    // ====================================================================================
    // PASO 4: EMAIL VÁLIDO → ÉXITO
    // ====================================================================================
    mostrarExito(email);
    return true;
}


function validatePassword(password) {
    // ====================================================================================
    // PASO 1: VALIDACIÓN DE LONGITUD MÍNIMA
    // ====================================================================================
    if (password.length < 8) {
        return { 
            valid: false, 
            message: 'La contraseña debe tener al menos 8 caracteres' 
        };
    }
    
    // ====================================================================================
    // PASO 2: VALIDACIÓN DE COMPLEJIDAD (MAYÚSCULAS, MINÚSCULAS Y NÚMEROS)
    // ====================================================================================
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return { 
            valid: false, 
            message: 'La contraseña debe incluir mayúsculas, minúsculas y números' 
        };
    }
    
    // ====================================================================================
    // PASO 3: CONTRASEÑA VÁLIDA → ÉXITO
    // ====================================================================================
    return { valid: true, message: '' };
}

function validateConfirmPassword(password, confirmPassword) {
    // ====================================================================================
    // PASO 1: COMPARACIÓN DIRECTA DE CONTRASEÑAS
    // ====================================================================================
    if (confirmPassword !== password) {
        return { 
            valid: false, 
            message: 'Las contraseñas no coinciden' 
        };
    }
    
    // ====================================================================================
    // PASO 2: CONFIRMACIÓN VÁLIDA → ÉXITO
    // ====================================================================================
    return { valid: true, message: '' };
}

function validateBirthDate(fechaNacimiento) {
    // ====================================================================================
    // PASO 1: VALIDACIÓN DE CAMPO VACÍO
    // ====================================================================================
    if (!fechaNacimiento) {
        return { 
            valid: false, 
            message: 'La fecha de nacimiento es requerida' 
        };
    }
    
    // ====================================================================================
    // PASO 2: CÁLCULO DE EDAD PRECISO
    // ====================================================================================
    const fecha = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();
    
    // Ajustar edad si el cumpleaños aún no ha llegado este año
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
        edad--;
    }
    
    // ====================================================================================
    // PASO 3: VALIDACIÓN DE EDAD MÍNIMA (13 AÑOS)
    // ====================================================================================
    if (edad < 13) {
        return { 
            valid: false, 
            message: 'Debe ser mayor de 13 años para registrarse' 
        };
    }
    
    // ====================================================================================
    // PASO 4: VALIDACIÓN DE EDAD MÁXIMA (120 AÑOS)
    // ====================================================================================
    if (edad > 120) {
        return { 
            valid: false, 
            message: 'Ingrese una fecha de nacimiento válida' 
        };
    }
    
    // ====================================================================================
    // PASO 5: FECHA VÁLIDA → ÉXITO CON EDAD CALCULADA
    // ====================================================================================
    return { 
        valid: true, 
        message: '', 
        edad: edad 
    };
}

function limpiarValidaciones(formId) {
    // ====================================================================================
    // PASO 1: OBTENCIÓN DEL FORMULARIO
    // ====================================================================================
    const form = document.getElementById(formId);
    if (!form) return;
    
    // ====================================================================================
    // PASO 2: LIMPIEZA DE CAMPOS DE ENTRADA
    // ====================================================================================
    const campos = form.querySelectorAll('.form-control, .form-check-input');
    campos.forEach(campo => {
        campo.classList.remove('is-valid', 'is-invalid');
    });
    
    // ====================================================================================
    // PASO 3: LIMPIEZA DE MENSAJES DE ERROR
    // ====================================================================================
    const errores = form.querySelectorAll('.invalid-feedback');
    errores.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}

console.log('✅ common.js cargado correctamente - Funciones de validación disponibles');