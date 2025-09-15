/**
 * ====================================================================================
 * 🔐 ARCHIVO DE LOGIN - PASTELERÍA MIL SABORES
 * ====================================================================================
 * 
 * Este archivo maneja toda la lógica de la página de login, incluyendo validaciones
 * de campos, manejo de formularios y funcionalidad de autenticación simulada.
 * 
 * 🎯 PROPÓSITO:
 * - Gestionar validaciones de campos de login
 * - Manejar el proceso de autenticación simulada
 * - Proporcionar feedback visual al usuario
 * - Configurar eventos de interfaz de usuario
 * - Integrar con sistema de componentes
 * 
 * 📋 FUNCIONALIDADES PRINCIPALES:
 * - Validación de email con formato correcto
 * - Validación de contraseña con longitud mínima
 * - Feedback visual inmediato (campos rojos/verdes)
 * - Toggle de visibilidad de contraseña
 * - Autenticación simulada con SweetAlert
 * - Integración con sistema de componentes
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 1. Carga y configura event listeners
 * 2. Valida campos en tiempo real (onblur)
 * 3. Valida formulario completo al enviar
 * 4. Muestra feedback apropiado según validación
 * 5. Simula proceso de login con SweetAlert
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Validaciones robustas con feedback visual
 * - Autenticación simulada (botón dummy)
 * - Integración con SweetAlert2
 * - Manejo de eventos onblur para validación inmediata
 * - Toggle de visibilidad de contraseña
 * - Integración con sistema de componentes
 * 
 * 📄 ARCHIVOS RELACIONADOS:
 * - login.html: Página de login con formulario
 * - js/common.js: Funciones de validación compartidas
 * - js/components.js: Sistema de componentes y navegación
 * 
 * 🔄 NOTA IMPORTANTE:
 * Este es un sistema de login SIMULADO (botón dummy) que incluye todas las
 * validaciones necesarias pero no realiza autenticación real. Es ideal para
 * demostraciones y proyectos académicos.
 */

// ====================================================================================
// 📋 SECCIÓN 1: FUNCIONES DE VALIDACIÓN
// ====================================================================================

/**
 * ====================================================================================
 * 📧 VALIDACIÓN DE CAMPO DE EMAIL EN LOGIN
 * ====================================================================================
 * 
 * Esta función valida el campo de email en el formulario de login, verificando
 * que no esté vacío y que tenga un formato válido.
 * 
 * 🎯 PROPÓSITO:
 * - Validar campo de email en tiempo real
 * - Verificar que no esté vacío
 * - Verificar formato válido de email
 * - Proporcionar feedback visual inmediato
 * 
 * 🔄 FLUJO DE VALIDACIÓN:
 * 
 * PASO 1: OBTENCIÓN DE DATOS
 * - Obtiene el campo de email por ID
 * - Elimina espacios en blanco del valor
 * 
 * PASO 2: VALIDACIÓN DE CAMPO VACÍO
 * - Si está vacío → Muestra error y retorna false
 * 
 * PASO 3: VALIDACIÓN DE FORMATO
 * - Usa validateEmail() para verificar formato
 * - Si es inválido → Muestra error y retorna false
 * 
 * PASO 4: EMAIL VÁLIDO
 * - Si pasa todas las validaciones → Muestra éxito y retorna true
 * 
 * 📋 VALOR DE RETORNO:
 * - true: Email válido
 * - false: Email inválido o vacío
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Validación en tiempo real
 * - Feedback visual inmediato
 * - Mensajes de error específicos
 * - Integración con sistema de validación visual
 * 
 * 📄 USADO EN:
 * - Event listener onblur del campo email
 * - Validación del formulario completo
 * 
 * @returns {boolean} - true si es válido, false si no
 */
function validarEmailLogin() {
    // ====================================================================================
    // PASO 1: OBTENCIÓN DE DATOS DEL CAMPO
    // ====================================================================================
    const email = document.getElementById('email');
    const valor = email.value.trim();
    
    // ====================================================================================
    // PASO 2: VALIDACIÓN DE CAMPO VACÍO
    // ====================================================================================
    if (valor === '') {
        mostrarError(email, 'El email es obligatorio');
        return false;
    } 
    // ====================================================================================
    // PASO 3: VALIDACIÓN DE FORMATO DE EMAIL
    // ====================================================================================
    else if (!validateEmail(valor)) {
        mostrarError(email, 'Ingresa un email válido');
        return false;
    } 
    // ====================================================================================
    // PASO 4: EMAIL VÁLIDO → ÉXITO
    // ====================================================================================
    else {
        mostrarExito(email);
        return true;
    }
}

/**
 * ====================================================================================
 * 🔐 VALIDACIÓN DE CAMPO DE CONTRASEÑA EN LOGIN
 * ====================================================================================
 * 
 * Esta función valida el campo de contraseña en el formulario de login, verificando
 * que no esté vacío y que tenga la longitud mínima requerida.
 * 
 * 🎯 PROPÓSITO:
 * - Validar campo de contraseña en tiempo real
 * - Verificar que no esté vacío
 * - Verificar longitud mínima (6 caracteres)
 * - Proporcionar feedback visual inmediato
 * 
 * 🔄 FLUJO DE VALIDACIÓN:
 * 
 * PASO 1: OBTENCIÓN DE DATOS
 * - Obtiene el campo de contraseña por ID
 * - Obtiene el valor sin procesar
 * 
 * PASO 2: VALIDACIÓN DE CAMPO VACÍO
 * - Si está vacío → Muestra error y retorna false
 * 
 * PASO 3: VALIDACIÓN DE LONGITUD
 * - Si tiene menos de 6 caracteres → Muestra error y retorna false
 * 
 * PASO 4: CONTRASEÑA VÁLIDA
 * - Si pasa todas las validaciones → Muestra éxito y retorna true
 * 
 * 📋 VALOR DE RETORNO:
 * - true: Contraseña válida
 * - false: Contraseña inválida o vacía
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Validación en tiempo real
 * - Feedback visual inmediato
 * - Mensajes de error específicos
 * - Integración con sistema de validación visual
 * 
 * 📄 USADO EN:
 * - Event listener onblur del campo contraseña
 * - Validación del formulario completo
 * 
 * @returns {boolean} - true si es válido, false si no
 */
function validarPasswordLogin() {
    // ====================================================================================
    // PASO 1: OBTENCIÓN DE DATOS DEL CAMPO
    // ====================================================================================
    const password = document.getElementById('password');
    const valor = password.value;
    
    // ====================================================================================
    // PASO 2: VALIDACIÓN DE CAMPO VACÍO
    // ====================================================================================
    if (valor === '') {
        mostrarError(password, 'La contraseña es obligatoria');
        return false;
    } 
    // ====================================================================================
    // PASO 3: VALIDACIÓN DE LONGITUD MÍNIMA
    // ====================================================================================
    else if (valor.length < 6) {
        mostrarError(password, 'La contraseña debe tener al menos 6 caracteres');
        return false;
    } 
    // ====================================================================================
    // PASO 4: CONTRASEÑA VÁLIDA → ÉXITO
    // ====================================================================================
    else {
        mostrarExito(password);
        return true;
    }
}

/**
 * ====================================================================================
 * 📋 VALIDACIÓN DEL FORMULARIO COMPLETO DE LOGIN
 * ====================================================================================
 * 
 * Esta función valida todos los campos del formulario de login y retorna
 * un resultado consolidado de la validación.
 * 
 * 🎯 PROPÓSITO:
 * - Validar todos los campos del formulario
 * - Consolidar resultados de validación
 * - Proporcionar resultado único para el formulario
 * - Facilitar manejo de envío del formulario
 * 
 * 🔄 FLUJO DE VALIDACIÓN:
 * 
 * PASO 1: VALIDACIÓN DE EMAIL
 * - Ejecuta validarEmailLogin()
 * - Obtiene resultado de validación
 * 
 * PASO 2: VALIDACIÓN DE CONTRASEÑA
 * - Ejecuta validarPasswordLogin()
 * - Obtiene resultado de validación
 * 
 * PASO 3: RESULTADO CONSOLIDADO
 * - Retorna true solo si ambos campos son válidos
 * - Retorna false si cualquier campo es inválido
 * 
 * 📋 VALOR DE RETORNO:
 * - true: Todos los campos son válidos
 * - false: Al menos un campo es inválido
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Validación completa del formulario
 * - Resultado consolidado
 * - Integración con proceso de login
 * - Facilita manejo de envío
 * 
 * 📄 USADO EN:
 * - Proceso de login (handleLogin)
 * - Validación antes de envío del formulario
 * 
 * @returns {boolean} - true si todos los campos son válidos
 */
function validarFormularioLogin() {
    // ====================================================================================
    // PASO 1: VALIDACIÓN DE EMAIL
    // ====================================================================================
    const emailValido = validarEmailLogin();
    
    // ====================================================================================
    // PASO 2: VALIDACIÓN DE CONTRASEÑA
    // ====================================================================================
    const passwordValida = validarPasswordLogin();
    
    // ====================================================================================
    // PASO 3: RESULTADO CONSOLIDADO
    // ====================================================================================
    return emailValido && passwordValida;
}

// ====================================================================================
// 📋 SECCIÓN 2: FUNCIONES DE LOGIN
// ====================================================================================

/**
 * ====================================================================================
 * 🔐 MANEJO DEL PROCESO COMPLETO DE LOGIN
 * ====================================================================================
 * 
 * Esta función es el corazón del sistema de login. Maneja todo el proceso de
 * autenticación, incluyendo validación del formulario y feedback al usuario.
 * 
 * 🎯 PROPÓSITO:
 * - Manejar el proceso completo de login
 * - Validar formulario antes de procesar
 * - Proporcionar feedback apropiado al usuario
 * - Simular proceso de autenticación
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 
 * PASO 1: VALIDACIÓN DEL FORMULARIO
 * - Ejecuta validarFormularioLogin()
 * - Verifica que todos los campos sean válidos
 * 
 * PASO 2: PROCESO DE LOGIN EXITOSO
 * - Si el formulario es válido → Simula login exitoso
 * - Muestra SweetAlert con mensaje de éxito
 * - Incluye timer automático de 3 segundos
 * 
 * PASO 3: MANEJO DE ERRORES
 * - Si el formulario es inválido → Muestra error
 * - Indica que debe completar campos obligatorios
 * - Muestra campos con errores visuales
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Validación completa antes de procesar
 * - Feedback visual con SweetAlert2
 * - Timer automático para cierre
 * - Mensajes claros y específicos
 * - Integración con sistema de validación
 * 
 * 📄 USADO EN:
 * - Event listener del formulario de login
 * - Botón de envío del formulario
 * 
 * 🔄 NOTA IMPORTANTE:
 * Este es un sistema de login SIMULADO que incluye todas las validaciones
 * necesarias pero no realiza autenticación real. Es ideal para demostraciones.
 */
function handleLogin() {
    // ====================================================================================
    // PASO 1: VALIDACIÓN DEL FORMULARIO
    // ====================================================================================
    if (validarFormularioLogin()) {
        // ====================================================================================
        // PASO 2: PROCESO DE LOGIN EXITOSO (SIMULADO)
        // ====================================================================================
        Swal.fire({
            title: '¡Login Simulado!',
            text: 'Este es un botón de demostración. No hay autenticación real.',
            icon: 'info',
            confirmButtonText: 'Entendido',
            timer: 3000,
            timerProgressBar: true
        });
    } else {
        // ====================================================================================
        // PASO 3: MANEJO DE ERRORES DE VALIDACIÓN
        // ====================================================================================
        Swal.fire({
            title: 'Formulario Incompleto',
            text: 'Por favor completa todos los campos obligatorios y corrige los errores marcados.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    }
}


// ====================================================================================
// 📋 SECCIÓN 3: UTILIDADES DE INTERFAZ Y CONFIGURACIÓN
// ====================================================================================

/**
 * ====================================================================================
 * 🔧 CONFIGURACIÓN DE TOGGLES DE CONTRASEÑA
 * ====================================================================================
 * 
 * Esta función configura los event listeners para los botones de toggle de
 * visibilidad de contraseña en el formulario de login.
 * 
 * 🎯 PROPÓSITO:
 * - Configurar toggle de visibilidad de contraseña
 * - Mejorar experiencia de usuario
 * - Facilitar verificación de contraseña ingresada
 * 
 * 🔄 FLUJO DE CONFIGURACIÓN:
 * 
 * PASO 1: BÚSQUEDA DEL BOTÓN
 * - Busca el botón de toggle por ID
 * - Si no existe → Termina la función
 * 
 * PASO 2: CONFIGURACIÓN DEL EVENT LISTENER
 * - Agrega event listener para click
 * - Llama a togglePassword() con parámetros apropiados
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Configuración segura con verificación de existencia
 * - Integración con función togglePassword()
 * - Mejora de experiencia de usuario
 * 
 * 📄 USADO EN:
 * - Inicialización de la página de login
 * - Configuración de eventos de interfaz
 */
function setupPasswordToggles() {
    // ====================================================================================
    // PASO 1: BÚSQUEDA Y CONFIGURACIÓN DEL BOTÓN DE TOGGLE
    // ====================================================================================
    const togglePasswordBtn = document.getElementById('togglePassword');
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => togglePassword('password', 'eyeIcon'));
    }
}

// ====================================================================================
// 📋 SECCIÓN 4: INICIALIZACIÓN Y EVENT LISTENERS
// ====================================================================================

/**
 * ====================================================================================
 * 🚀 INICIALIZACIÓN PRINCIPAL DE LA PÁGINA DE LOGIN
 * ====================================================================================
 * 
 * Este event listener se ejecuta cuando el DOM está completamente cargado y
 * configura todos los eventos necesarios para el funcionamiento del login.
 * 
 * 🎯 PROPÓSITO:
 * - Configurar todos los event listeners necesarios
 * - Inicializar validaciones en tiempo real
 * - Configurar eventos de interfaz de usuario
 * - Manejar envío del formulario de login
 * 
 * 🔄 FLUJO DE INICIALIZACIÓN:
 * 
 * PASO 1: VERIFICACIÓN DE PÁGINA
 * - Verifica que estamos en la página de login
 * - Solo inicializa si existe el formulario de login
 * 
 * PASO 2: CONFIGURACIÓN DE VALIDACIONES ONBLUR
 * - Configura validación de email al salir del campo
 * - Configura validación de contraseña al salir del campo
 * 
 * PASO 3: CONFIGURACIÓN DE EVENTOS DE INTERFAZ
 * - Configura toggles de contraseña
 * - Configura inputs de fecha (si existen)
 * 
 * PASO 4: CONFIGURACIÓN DEL FORMULARIO
 * - Configura event listener de envío del formulario
 * - Previene envío por defecto y maneja con handleLogin()
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Inicialización condicional (solo en página de login)
 * - Configuración completa de eventos
 * - Integración con sistema de validación
 * - Manejo seguro de elementos no encontrados
 * 
 * 📄 ARCHIVOS RELACIONADOS:
 * - login.html: Página de login con formulario
 * - js/common.js: Funciones de validación compartidas
 * - js/components.js: Sistema de componentes
 */
document.addEventListener('DOMContentLoaded', function() {
    // ====================================================================================
    // PASO 1: VERIFICACIÓN DE PÁGINA DE LOGIN
    // ====================================================================================
    if (document.getElementById('loginForm')) {
        // ====================================================================================
        // PASO 2: CONFIGURACIÓN DE VALIDACIONES ONBLUR
        // ====================================================================================
        document.getElementById('email').addEventListener('blur', validarEmailLogin);
        document.getElementById('password').addEventListener('blur', validarPasswordLogin);
        
        // ====================================================================================
        // PASO 3: CONFIGURACIÓN DE EVENTOS DE INTERFAZ
        // ====================================================================================
        setupPasswordToggles();
        setupDateInputs();
        
        // ====================================================================================
        // PASO 4: CONFIGURACIÓN DEL FORMULARIO DE LOGIN
        // ====================================================================================
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleLogin();
            });
        }
    }
});

// ====================================================================================
// 📋 SECCIÓN 5: FUNCIONES ESPECÍFICAS DE LOGIN
// ====================================================================================

/**
 * ====================================================================================
 * 📧 VALIDACIÓN DE FORMATO DE EMAIL
 * ====================================================================================
 * 
 * Esta función valida el formato de un email usando una expresión regular estándar.
 * 
 * 🎯 PROPÓSITO:
 * - Validar formato de email con regex
 * - Verificar estructura básica de email
 * - Proporcionar validación robusta
 * 
 * 📋 PARÁMETROS:
 * - email: Email a validar (string)
 * 
 * 📋 VALOR DE RETORNO:
 * - true: Email con formato válido
 * - false: Email con formato inválido
 * 
 * @param {string} email - Email a validar
 * @returns {boolean} - true si es válido, false si no
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * ====================================================================================
 * ❌ MOSTRAR ERROR EN CAMPO DE FORMULARIO
 * ====================================================================================
 * 
 * Esta función muestra un error visual en un campo del formulario, aplicando
 * clases de Bootstrap y mostrando mensaje de error.
 * 
 * 🎯 PROPÓSITO:
 * - Mostrar error visual en campo
 * - Aplicar clases de Bootstrap (is-invalid)
 * - Mostrar mensaje de error específico
 * 
 * 📋 PARÁMETROS:
 * - campo: Elemento del campo del formulario
 * - mensaje: Mensaje de error a mostrar
 * 
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
 * ====================================================================================
 * ✅ MOSTRAR ÉXITO EN CAMPO DE FORMULARIO
 * ====================================================================================
 * 
 * Esta función muestra éxito visual en un campo del formulario, aplicando
 * clases de Bootstrap y ocultando mensajes de error.
 * 
 * 🎯 PROPÓSITO:
 * - Mostrar éxito visual en campo
 * - Aplicar clases de Bootstrap (is-valid)
 * - Ocultar mensajes de error
 * 
 * 📋 PARÁMETROS:
 * - campo: Elemento del campo del formulario
 * 
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
 * ====================================================================================
 * 👁️ TOGGLE DE VISIBILIDAD DE CONTRASEÑA
 * ====================================================================================
 * 
 * Esta función alterna la visibilidad de un campo de contraseña y actualiza
 * el icono del ojo correspondiente.
 * 
 * 🎯 PROPÓSITO:
 * - Alternar visibilidad de contraseña
 * - Cambiar tipo de input entre 'password' y 'text'
 * - Actualizar icono del ojo
 * 
 * 📋 PARÁMETROS:
 * - passwordId: ID del campo de contraseña
 * - eyeIconId: ID del icono del ojo
 * 
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
 * ====================================================================================
 * 📅 CONFIGURACIÓN DE INPUTS DE FECHA
 * ====================================================================================
 * 
 * Esta función configura los inputs de fecha con una fecha máxima (hoy)
 * para prevenir fechas futuras.
 * 
 * 🎯 PROPÓSITO:
 * - Configurar inputs de fecha con fecha máxima
 * - Prevenir fechas futuras
 * - Mejorar validación de fechas
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Fecha máxima automática (hoy)
 * - Configuración de todos los inputs de fecha
 * - Prevención de fechas futuras
 */
function setupDateInputs() {
    const fechaMaxima = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.setAttribute('max', fechaMaxima);
    });
}

/**
 * ====================================================================================
 * 🎯 RESUMEN FINAL DEL ARCHIVO DE LOGIN
 * ====================================================================================
 * 
 * Este archivo implementa un sistema completo de login con validaciones robustas
 * y funcionalidad de autenticación simulada, ideal para proyectos académicos.
 * 
 * 📋 FUNCIONALIDADES PRINCIPALES:
 * - Validación de email con formato correcto
 * - Validación de contraseña con longitud mínima
 * - Feedback visual inmediato (campos rojos/verdes)
 * - Toggle de visibilidad de contraseña
 * - Autenticación simulada con SweetAlert
 * - Integración con sistema de componentes
 * 
 * 📋 FUNCIONES PRINCIPALES:
 * - validarEmailLogin(): Validación de campo de email
 * - validarPasswordLogin(): Validación de campo de contraseña
 * - validarFormularioLogin(): Validación completa del formulario
 * - handleLogin(): Manejo del proceso de login
 * - setupPasswordToggles(): Configuración de toggles de contraseña
 * - validateEmail(): Validación de formato de email
 * - mostrarError(): Mostrar error visual en campo
 * - mostrarExito(): Mostrar éxito visual en campo
 * - togglePassword(): Toggle de visibilidad de contraseña
 * - setupDateInputs(): Configuración de inputs de fecha
 * 
 * ⚡ CARACTERÍSTICAS DEL ARCHIVO:
 * - Validaciones robustas con feedback visual
 * - Autenticación simulada (botón dummy)
 * - Integración con SweetAlert2
 * - Manejo de eventos onblur para validación inmediata
 * - Toggle de visibilidad de contraseña
 * - Integración con sistema de componentes
 * - Inicialización condicional (solo en página de login)
 * 
 * 📄 ARCHIVOS RELACIONADOS:
 * - login.html: Página de login con formulario
 * - js/common.js: Funciones de validación compartidas
 * - js/components.js: Sistema de componentes y navegación
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 1. Carga y configura event listeners
 * 2. Valida campos en tiempo real (onblur)
 * 3. Valida formulario completo al enviar
 * 4. Muestra feedback apropiado según validación
 * 5. Simula proceso de login con SweetAlert
 * 
 * 🔄 NOTA IMPORTANTE:
 * Este es un sistema de login SIMULADO (botón dummy) que incluye todas las
 * validaciones necesarias pero no realiza autenticación real. Es ideal para
 * demostraciones y proyectos académicos.
 */
console.log('✅ login.js cargado correctamente - Sistema de login disponible');
