/**
 * ====================================================================================
 * 📋 ARCHIVO COMÚN - PASTELERÍA MIL SABORES
 * ====================================================================================
 * 
 * Este archivo contiene funciones compartidas entre login.js y registro.js,
 * centralizando la lógica común de validación y utilidades de interfaz.
 * 
 * 🎯 PROPÓSITO:
 * - Centralizar funciones de validación comunes
 * - Evitar duplicación de código entre login y registro
 * - Mantener consistencia en validaciones
 * - Facilitar mantenimiento y actualizaciones
 * 
 * 📋 FUNCIONES INCLUIDAS:
 * - validateEmailField(): Validación de campos de email con feedback visual
 * - validatePassword(): Validación de contraseñas con criterios de seguridad
 * - validateConfirmPassword(): Validación de confirmación de contraseña
 * - validateBirthDate(): Validación de fecha de nacimiento y cálculo de edad
 * - limpiarValidaciones(): Limpieza de estados de validación en formularios
 * 
 * 🔄 FLUJO DE USO:
 * 1. Las funciones son llamadas desde login.js y registro.js
 * 2. Proporcionan validación con feedback visual inmediato
 * 3. Retornan resultados estructurados para manejo de errores
 * 4. Mantienen consistencia en toda la aplicación
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Validaciones robustas con múltiples criterios
 * - Feedback visual inmediato (campos rojos/verdes)
 * - Mensajes de error descriptivos y útiles
 * - Cálculo automático de edad para beneficios
 * - Limpieza automática de estados de validación
 * 
 * 📄 ARCHIVOS QUE USAN ESTAS FUNCIONES:
 * - js/login.js: Validaciones de email y contraseña
 * - js/registro.js: Validaciones completas de registro
 */

// ====================================================================================
// 📋 SECCIÓN 1: VALIDACIONES COMUNES
// ====================================================================================


/**
 * ====================================================================================
 * 📧 VALIDACIÓN DE CAMPO DE EMAIL CON FEEDBACK VISUAL
 * ====================================================================================
 * 
 * Esta función valida un campo de email específico y proporciona feedback visual
 * inmediato al usuario, mostrando errores o éxito según corresponda.
 * 
 * 🎯 PROPÓSITO:
 * - Validar formato de email en tiempo real
 * - Proporcionar feedback visual inmediato (campos rojos/verdes)
 * - Manejar campos obligatorios y opcionales
 * - Centralizar lógica de validación de email
 * 
 * 🔄 FLUJO DE VALIDACIÓN:
 * 
 * PASO 1: OBTENCIÓN DE DATOS
 * - Busca el elemento por ID en el DOM
 * - Obtiene el valor del campo y elimina espacios en blanco
 * 
 * PASO 2: VALIDACIÓN DE CAMPO VACÍO
 * - Si está vacío y es obligatorio → Muestra error
 * - Si está vacío y es opcional → Muestra éxito (válido)
 * 
 * PASO 3: VALIDACIÓN DE FORMATO
 * - Usa validateEmail() para verificar formato correcto
 * - Si es inválido → Muestra error con mensaje descriptivo
 * - Si es válido → Muestra éxito
 * 
 * 📋 PARÁMETROS:
 * - fieldId: ID del campo de email en el HTML
 * - required: Si el campo es obligatorio (default: true)
 * 
 * 📋 VALOR DE RETORNO:
 * - true: Email válido o campo opcional vacío
 * - false: Email inválido o campo obligatorio vacío
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Feedback visual inmediato (mostrarError/mostrarExito)
 * - Manejo de campos obligatorios y opcionales
 * - Mensajes de error descriptivos y útiles
 * - Validación robusta de formato de email
 * - Integración con sistema de validación visual
 * 
 * 📄 USADO EN:
 * - js/login.js: Validación de email de login
 * - js/registro.js: Validación de email de registro
 * 
 * @param {string} fieldId - ID del campo de email
 * @param {boolean} required - Si el campo es obligatorio
 * @returns {boolean} - true si es válido
 */
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


/**
 * ====================================================================================
 * 🔐 VALIDACIÓN DE CONTRASEÑA CON CRITERIOS DE SEGURIDAD
 * ====================================================================================
 * 
 * Esta función valida una contraseña aplicando criterios de seguridad estándar
 * para asegurar que cumpla con los requisitos mínimos de fortaleza.
 * 
 * 🎯 PROPÓSITO:
 * - Validar contraseñas con criterios de seguridad
 * - Asegurar contraseñas robustas y seguras
 * - Proporcionar mensajes de error específicos
 * - Centralizar lógica de validación de contraseñas
 * 
 * 🔄 FLUJO DE VALIDACIÓN:
 * 
 * PASO 1: VALIDACIÓN DE LONGITUD
 * - Verifica que la contraseña tenga al menos 8 caracteres
 * - Si es muy corta → Retorna error con mensaje específico
 * 
 * PASO 2: VALIDACIÓN DE COMPLEJIDAD
 * - Verifica que contenga al menos una letra minúscula
 * - Verifica que contenga al menos una letra mayúscula
 * - Verifica que contenga al menos un número
 * - Si falta alguno → Retorna error con mensaje específico
 * 
 * PASO 3: CONTRASEÑA VÁLIDA
 * - Si pasa todas las validaciones → Retorna éxito
 * 
 * 📋 PARÁMETROS:
 * - password: Contraseña a validar (string)
 * 
 * 📋 VALOR DE RETORNO:
 * - {valid: boolean, message: string}
 * - valid: true si es válida, false si es inválida
 * - message: Mensaje de error específico o string vacío si es válida
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Criterios de seguridad estándar
 * - Mensajes de error específicos y útiles
 * - Validación robusta con regex
 * - Retorno estructurado para manejo de errores
 * - Integración con sistema de validación
 * 
 * 📄 USADO EN:
 * - js/login.js: Validación de contraseña de login
 * - js/registro.js: Validación de contraseña de registro
 * 
 * @param {string} password - Contraseña a validar
 * @returns {object} {valid: boolean, message: string}
 */
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

/**
 * ====================================================================================
 * 🔐 VALIDACIÓN DE CONFIRMACIÓN DE CONTRASEÑA
 * ====================================================================================
 * 
 * Esta función valida que la confirmación de contraseña coincida exactamente
 * con la contraseña original, asegurando que el usuario haya ingresado
 * correctamente su contraseña dos veces.
 * 
 * 🎯 PROPÓSITO:
 * - Verificar que ambas contraseñas sean idénticas
 * - Prevenir errores de tipeo en contraseñas
 * - Asegurar que el usuario confirme su contraseña correctamente
 * - Centralizar lógica de validación de confirmación
 * 
 * 🔄 FLUJO DE VALIDACIÓN:
 * 
 * PASO 1: COMPARACIÓN DIRECTA
 * - Compara la contraseña original con la confirmación
 * - Si no coinciden → Retorna error con mensaje específico
 * 
 * PASO 2: CONFIRMACIÓN VÁLIDA
 * - Si coinciden exactamente → Retorna éxito
 * 
 * 📋 PARÁMETROS:
 * - password: Contraseña original (string)
 * - confirmPassword: Confirmación de contraseña (string)
 * 
 * 📋 VALOR DE RETORNO:
 * - {valid: boolean, message: string}
 * - valid: true si coinciden, false si no coinciden
 * - message: Mensaje de error específico o string vacío si es válida
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Comparación exacta de strings
 * - Mensaje de error claro y específico
 * - Retorno estructurado para manejo de errores
 * - Validación simple pero efectiva
 * - Integración con sistema de validación
 * 
 * 📄 USADO EN:
 * - js/registro.js: Validación de confirmación de contraseña en registro
 * 
 * @param {string} password - Contraseña original
 * @param {string} confirmPassword - Confirmación de contraseña
 * @returns {object} {valid: boolean, message: string}
 */
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

/**
 * ====================================================================================
 * 📅 VALIDACIÓN DE FECHA DE NACIMIENTO Y CÁLCULO DE EDAD
 * ====================================================================================
 * 
 * Esta función valida una fecha de nacimiento y calcula la edad del usuario,
 * aplicando restricciones de edad mínima y máxima para el registro.
 * 
 * 🎯 PROPÓSITO:
 * - Validar fechas de nacimiento en formato estándar
 * - Calcular edad exacta del usuario
 * - Aplicar restricciones de edad (mínimo 13 años, máximo 120 años)
 * - Centralizar lógica de validación de fechas
 * 
 * 🔄 FLUJO DE VALIDACIÓN:
 * 
 * PASO 1: VALIDACIÓN DE CAMPO VACÍO
 * - Verifica que la fecha no esté vacía
 * - Si está vacía → Retorna error con mensaje específico
 * 
 * PASO 2: CÁLCULO DE EDAD
 * - Convierte la fecha a objeto Date
 * - Calcula la diferencia de años con la fecha actual
 * - Ajusta la edad si el cumpleaños aún no ha llegado este año
 * 
 * PASO 3: VALIDACIÓN DE EDAD MÍNIMA
 * - Verifica que la edad sea al menos 13 años
 * - Si es menor → Retorna error con mensaje específico
 * 
 * PASO 4: VALIDACIÓN DE EDAD MÁXIMA
 * - Verifica que la edad no exceda 120 años
 * - Si es mayor → Retorna error con mensaje específico
 * 
 * PASO 5: FECHA VÁLIDA
 * - Si pasa todas las validaciones → Retorna éxito con edad calculada
 * 
 * 📋 PARÁMETROS:
 * - fechaNacimiento: Fecha en formato YYYY-MM-DD (string)
 * 
 * 📋 VALOR DE RETORNO:
 * - {valid: boolean, message: string, edad?: number}
 * - valid: true si es válida, false si es inválida
 * - message: Mensaje de error específico o string vacío si es válida
 * - edad: Edad calculada (solo si es válida)
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Cálculo preciso de edad considerando meses y días
 * - Restricciones de edad realistas (13-120 años)
 * - Mensajes de error específicos y útiles
 * - Retorno estructurado con edad calculada
 * - Integración con sistema de validación
 * 
 * 📄 USADO EN:
 * - js/registro.js: Validación de fecha de nacimiento en registro
 * 
 * @param {string} fechaNacimiento - Fecha en formato YYYY-MM-DD
 * @returns {object} {valid: boolean, message: string, edad?: number}
 */
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

// ====================================================================================
// 📋 SECCIÓN 2: UTILIDADES DE INTERFAZ COMUNES
// ====================================================================================

/**
 * ====================================================================================
 * 🧹 LIMPIEZA DE VALIDACIONES DE FORMULARIO
 * ====================================================================================
 * 
 * Esta función limpia todos los estados de validación visual de un formulario,
 * removiendo clases de Bootstrap y ocultando mensajes de error.
 * 
 * 🎯 PROPÓSITO:
 * - Limpiar estados visuales de validación
 * - Remover clases de Bootstrap (is-valid, is-invalid)
 * - Ocultar mensajes de error
 * - Preparar formulario para nueva validación
 * 
 * 🔄 FLUJO DE LIMPIEZA:
 * 
 * PASO 1: OBTENCIÓN DEL FORMULARIO
 * - Busca el formulario por ID en el DOM
 * - Si no existe → Termina la función
 * 
 * PASO 2: LIMPIEZA DE CAMPOS
 * - Busca todos los campos de entrada (.form-control, .form-check-input)
 * - Remueve clases de validación (is-valid, is-invalid)
 * 
 * PASO 3: LIMPIEZA DE MENSAJES
 * - Busca todos los mensajes de error (.invalid-feedback)
 * - Limpia el contenido de texto
 * - Oculta los mensajes de error
 * 
 * 📋 PARÁMETROS:
 * - formId: ID del formulario a limpiar (string)
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Limpieza completa de estados visuales
 * - Manejo seguro de elementos no encontrados
 * - Compatible con Bootstrap 5
 * - Función utilitaria reutilizable
 * - Integración con sistema de validación
 * 
 * 📄 USADO EN:
 * - js/login.js: Limpieza de formulario de login
 * - js/registro.js: Limpieza de formulario de registro
 * 
 * @param {string} formId - ID del formulario
 */
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

/**
 * ====================================================================================
 * 🎯 RESUMEN FINAL DEL ARCHIVO COMÚN
 * ====================================================================================
 * 
 * Este archivo centraliza funciones de validación y utilidades compartidas
 * entre login.js y registro.js, manteniendo consistencia en toda la aplicación.
 * 
 * 📋 FUNCIONES DISPONIBLES:
 * - validateEmailField(): Validación de email con feedback visual
 * - validatePassword(): Validación de contraseña con criterios de seguridad
 * - validateConfirmPassword(): Validación de confirmación de contraseña
 * - validateBirthDate(): Validación de fecha de nacimiento y cálculo de edad
 * - limpiarValidaciones(): Limpieza de estados de validación en formularios
 * 
 * ⚡ CARACTERÍSTICAS DEL ARCHIVO:
 * - Funciones centralizadas para evitar duplicación
 * - Validaciones robustas con múltiples criterios
 * - Feedback visual inmediato (campos rojos/verdes)
 * - Mensajes de error descriptivos y útiles
 * - Retorno estructurado para manejo de errores
 * - Integración perfecta con Bootstrap 5
 * 
 * 📄 ARCHIVOS QUE USAN ESTAS FUNCIONES:
 * - js/login.js: Validaciones de email y contraseña
 * - js/registro.js: Validaciones completas de registro
 * 
 * 🔄 FLUJO DE USO:
 * 1. Las funciones son llamadas desde login.js y registro.js
 * 2. Proporcionan validación con feedback visual inmediato
 * 3. Retornan resultados estructurados para manejo de errores
 * 4. Mantienen consistencia en toda la aplicación
 */
console.log('✅ common.js cargado correctamente - Funciones de validación disponibles');