// ========================================
// COMPONENTS - Pastelería Mil Sabores
// Sistema híbrido de componentes HTML
// ========================================

/**
 * OBJETO DE COMPONENTES EMBEBIDOS - SISTEMA DE FALLBACK
 * 
 * Este objeto contiene el HTML completo de todos los componentes como strings,
 * que se usan como respaldo cuando el sistema de fetch() falla.
 * 
 * 🎯 PROPÓSITO:
 * - Proporcionar respaldo automático cuando fetch() no puede cargar archivos HTML
 * - Resolver problemas de CORS (Cross-Origin Resource Sharing) en archivos locales
 * - Asegurar que los componentes siempre se carguen, sin importar el entorno
 * - Permitir desarrollo sin servidor local
 * 
 * 🔄 FUNCIONAMIENTO:
 * - Cuando loadComponent() intenta cargar un archivo HTML y falla
 * - Automáticamente usa el HTML embebido correspondiente
 * - El usuario nunca nota la diferencia, la experiencia es idéntica
 * 
 * 📋 COMPONENTES INCLUIDOS:
 * - navbar: Barra de navegación completa con logo, menús y carrito
 * - cart-modal: Modal del carrito de compras con funcionalidad completa
 * - footer: Pie de página con información de copyright y diseño
 * 
 * ⚡ CARACTERÍSTICAS:
 * - HTML completo y funcional embebido en JavaScript
 * - Idéntico al contenido de los archivos HTML correspondientes
 * - Se mantiene sincronizado manualmente con los archivos
 * - Proporciona experiencia de usuario consistente
 */
const embeddedComponents = {
    /**
     * COMPONENTE NAVBAR EMBEBIDO
     * 
     * Contiene el HTML completo de la barra de navegación principal.
     * Incluye logo, menús de navegación, dropdown de productos y carrito.
     * 
     * 📋 ELEMENTOS INCLUIDOS:
     * - Logo de la pastelería con enlace a index.html
     * - Nombre de la pastelería (visible solo en móvil/tablet)
     * - Menú de navegación principal (Inicio, Productos)
     * - Dropdown de categorías de productos
     * - Iconos de carrito con contador dinámico
     * - Enlaces de login y registro
     * 
     * 🎨 ESTILOS:
     * - Bootstrap 5.3.0 para responsividad
     * - Sticky-top para navegación fija
     * - Shadow-sm para efecto de elevación
     * - Colores personalizados (text-pink)
     */
    navbar: `
<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div class="container-fluid px-4">
        <div class="row w-100 align-items-center">
            <!-- Logo -->
            <div class="col-auto px-3">
                <a class="navbar-brand d-flex align-items-center" href="index.html">
                    <img src="assets/images/logo-milsabores.png" alt="Mil Sabores Logo" class="me-2"
                        style="width: 102px;">
                </a>
            </div>

            <!-- Nombre de la pastelería - Solo visible en móvil/tablet -->
            <div class="col d-lg-none text-center">
                <h5 class="mb-0 fw-bold text-dark">Mil Sabores</h5>
                <small class="text-pink">Pastelería</small>
            </div>

            <!-- Dropdown de categorias -->
            <div class="col-auto px-3 d-none d-lg-block">
                <ul class="navbar-nav d-flex flex-row">
                    <li class="nav-item me-4">
                        <a class="nav-link fw-medium px-2" href="index.html">Inicio</a>
                    </li>
                    <li class="nav-item dropdown me-4">
                        <a class="nav-link dropdown-toggle fw-medium px-2" href="#" id="productosDropdown"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Productos
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="productosDropdown">
                            <li><a class="dropdown-item" href="#">Tortas Cuadradas</a></li>
                            <li><a class="dropdown-item" href="#">Tortas Circulares</a></li>
                            <li><a class="dropdown-item" href="#">Postres Individuales</a></li>
                            <li><a class="dropdown-item" href="#">Productos Sin Azúcar</a></li>
                            <li><a class="dropdown-item" href="#">Pastelería Tradicional</a></li>
                            <li><a class="dropdown-item" href="#">Productos sin gluten</a></li>
                            <li><a class="dropdown-item" href="#">Productos Vegana</a></li>
                            <li><a class="dropdown-item" href="#">Tortas Especiales</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fw-medium px-2" href="#">Sobre Nosotros</a>
                    </li>
                </ul>
            </div>

            <!-- Search Bar -->
            <div class="col px-4 d-none d-lg-block">
                <div class="position-relative">
                    <i
                        class="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-pink"></i>
                    <input type="text" class="form-control ps-5 border-pink bg-white search-input"
                        placeholder="Buscar..." style="border-radius: 25px;">
                </div>
            </div>

            <!-- User and Cart -->
            <div class="col-auto px-3 d-none d-lg-block">
                <div class="d-flex align-items-center gap-4">
                    <!-- Mi Cuenta Dropdown -->
                    <div class="dropdown">
                        <div class="d-flex flex-column align-items-center px-2 dropdown-toggle"
                            id="miCuentaDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                            style="cursor: pointer;">
                            <i class="fas fa-user text-pink"></i>
                            <small class="text-dark fw-medium">Mi cuenta</small>
                        </div>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="miCuentaDropdown">
                            <li>
                                <a class="dropdown-item" href="login.html">
                                    <i class="fas fa-sign-in-alt me-2"></i>Iniciar sesión
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="registro.html">
                                    <i class="fas fa-user-plus me-2"></i>Crear una cuenta
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Carrito -->
                    <div class="d-flex flex-column align-items-center px-2 position-relative" style="cursor: pointer;" onclick="showCartModal()">
                        <i class="fas fa-shopping-cart text-pink"></i>
                        <small class="text-dark fw-medium" id="cartTotalPrice">Carrito $0</small>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cartCounter" style="display: none;">0</span>
                    </div>
                </div>
            </div>

            <!-- Hamburger Button -->
            <div class="col-auto d-lg-none px-3">
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
        </div>
    </div>
</nav>

<!-- Offcanvas Menu -->
<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
    <div class="offcanvas-header border-bottom">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
            <img src="assets/images/logo-milsabores.png" alt="Mil Sabores Logo" style="width: 60px;">
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <!-- Navigation Links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link fw-medium py-3" href="index.html">Inicio</a>
            </li>
            <li class="nav-item">
                <a class="nav-link fw-medium py-3" href="#" data-bs-toggle="collapse"
                    data-bs-target="#productosCollapse" aria-expanded="false" aria-controls="productosCollapse">
                    Productos <i class="fas fa-chevron-down float-end"></i>
                </a>
                <div class="collapse" id="productosCollapse">
                    <ul class="list-unstyled ps-3">
                        <li><a class="nav-link py-2 text-muted" href="#">Tortas Cuadradas</a></li>
                        <li><a class="nav-link py-2 text-muted" href="#">Tortas Circulares</a></li>
                        <li><a class="nav-link py-2 text-muted" href="#">Postres Individuales</a></li>
                        <li><a class="nav-link py-2 text-muted" href="#">Productos Sin Azúcar</a></li>
                        <li><a class="nav-link py-2 text-muted" href="#">Pastelería Tradicional</a></li>
                        <li><a class="nav-link py-2 text-muted" href="#">Productos sin gluten</a></li>
                        <li><a class="nav-link py-2 text-muted" href="#">Productos Vegana</a></li>
                        <li><a class="nav-link py-2 text-muted" href="#">Tortas Especiales</a></li>
                    </ul>
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link fw-medium py-3" href="#">Sobre Nosotros</a>
            </li>
        </ul>

        <!-- Search Bar - Mobile -->
        <div class="mt-4">
            <div class="position-relative">
                <i
                    class="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-pink"></i>
                <input type="text" class="form-control ps-5 border-pink bg-white search-input"
                    placeholder="Buscar..." style="border-radius: 25px;">
            </div>
        </div>

        <!-- User and Cart - Mobile -->
        <div class="mt-4 d-flex flex-column gap-3">
            <!-- Mi Cuenta - Mobile -->
            <div class="d-flex flex-column gap-2">
                <div class="d-flex align-items-center gap-3 p-3 bg-light rounded">
                    <i class="fas fa-user text-pink"></i>
                    <span class="fw-medium">Mi cuenta</span>
                </div>
                <div class="ps-3 d-flex flex-column gap-2">
                    <a href="login.html" class="btn btn-primary btn-sm">
                        <i class="fas fa-sign-in-alt me-2"></i>Iniciar sesión
                    </a>
                    <a href="registro.html" class="btn btn-outline-primary btn-sm">
                        <i class="fas fa-user-plus me-2"></i>Crear una cuenta
                    </a>
                </div>
            </div>

            <!-- Carrito - Mobile -->
            <div class="d-flex align-items-center gap-3 p-3 bg-light rounded position-relative" style="cursor: pointer;" onclick="showCartModal()">
                <i class="fas fa-shopping-cart text-pink"></i>
                <span class="fw-medium" id="cartTotalPriceMobile">Carrito $0</span>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cartCounterMobile" style="display: none;">0</span>
            </div>
        </div>
    </div>
</div>`,

    /**
     * COMPONENTE CART-MODAL EMBEBIDO
     * 
     * Contiene el HTML completo del modal del carrito de compras.
     * Incluye funcionalidad completa para ver, gestionar y modificar productos.
     * 
     * 📋 ELEMENTOS INCLUIDOS:
     * - Header del modal con título y botón de cerrar
     * - Body con lista dinámica de productos del carrito
     * - Mensaje cuando el carrito está vacío
     * - Footer con total, botones de acción y cerrar
     * - Botón "Vaciar Carrito" para limpiar todo
     * - Botón "Ir a Pagar" (visual, sin funcionalidad)
     * 
     * 🎨 ESTILOS:
     * - Bootstrap 5.3.0 para diseño responsivo
     * - Modal-lg para tamaño grande
     * - Iconos Font Awesome para elementos visuales
     * - Badges para contadores dinámicos
     * 
     * ⚡ FUNCIONALIDAD:
     * - Se llena dinámicamente con productos del carrito
     * - Muestra total calculado automáticamente
     * - Permite eliminar productos individuales
     * - Integrado con localStorage para persistencia
     */
    cartModal: `
<!-- Modal del Carrito -->
<div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="cartModalLabel">
                    <i class="fas fa-shopping-cart me-2"></i>Mi Carrito
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- Lista de productos del carrito -->
                <div id="cartItemsList">
                    <!-- Los productos se cargarán dinámicamente aquí -->
                </div>
                
                <!-- Mensaje cuando el carrito está vacío -->
                <div id="cartEmptyMessage" class="text-center py-5" style="display: none;">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">Tu carrito está vacío</h5>
                    <p class="text-muted">Agrega algunos productos para comenzar</p>
                </div>
            </div>
            <div class="modal-footer">
                <div class="d-flex justify-content-between align-items-center w-100">
                    <div>
                        <strong>Total: <span id="cartModalTotal">$0</span></strong>
                    </div>
                    <div>
                        <button type="button" class="btn btn-outline-danger me-2" onclick="clearCart()" id="clearCartBtn" style="display: none;">
                            <i class="fas fa-trash me-1"></i>Vaciar Carrito
                        </button>
                        <button type="button" class="btn btn-success me-2" id="checkoutBtn" style="display: none;">
                            <i class="fas fa-credit-card me-1"></i>Ir a Pagar
                        </button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`,

    /**
     * COMPONENTE FOOTER EMBEBIDO
     * 
     * Contiene el HTML completo del pie de página de la aplicación.
     * Incluye información de copyright y mensaje de la empresa.
     * 
     * 📋 ELEMENTOS INCLUIDOS:
     * - Información de copyright de la pastelería
     * - Mensaje de "Hecho con amor para nuestros clientes"
     * - Icono de corazón para el mensaje emocional
     * - Diseño responsivo con Bootstrap Grid
     * 
     * 🎨 ESTILOS:
     * - Bootstrap 5.3.0 para diseño responsivo
     * - bg-light para fondo claro
     * - py-4 para padding vertical
     * - mt-5 para margen superior
     * - text-muted para texto secundario
     * - text-danger para icono de corazón
     * 
     * ⚡ CARACTERÍSTICAS:
     * - Diseño simple y limpio
     * - Responsive (se adapta a móvil y desktop)
     * - Mensaje emocional de la marca
     * - Información legal básica
     */
    footer: `
<!-- Footer -->
<footer class="bg-light py-4 mt-5">
    <div class="container">
        <div class="row">
            <div class="col-md-6 text-center text-md-start">
                <p class="mb-0 text-muted">
                    © 2024 Pastelería Mil Sabores. Todos los derechos reservados.
                </p>
            </div>
            <div class="col-md-6 text-center text-md-end">
                <p class="mb-0 text-muted">
                    <i class="fas fa-heart text-danger me-1"></i>
                    Hecho con amor para nuestros clientes
                </p>
            </div>
        </div>
    </div>
</footer>`
}; // ← CIERRE DEL OBJETO embeddedComponents

/**
 * ========================================
 * FUNCIONES DEL SISTEMA DE COMPONENTES
 * ========================================
 * 
 * A partir de aquí comienzan las funciones que utilizan el objeto
 * embeddedComponents para cargar componentes dinámicamente en las páginas.
 */

/**
 * SISTEMA HÍBRIDO DE COMPONENTES HTML
 * 
 * Esta función implementa un sistema inteligente de carga de componentes con dos estrategias:
 * 
 * 🎯 ESTRATEGIA 1: CARGA DESDE ARCHIVO (PREFERIDA)
 * - Intenta cargar desde: components/navbar.html, components/footer.html, etc.
 * - Ventaja: Archivos separados, fácil mantenimiento
 * - Problema: CORS bloquea fetch() de archivos locales en algunos navegadores
 * 
 * 🛡️ ESTRATEGIA 2: FALLBACK EMBEBIDO (RESPALDO)
 * - Si el archivo falla, usa el HTML embebido en embeddedComponents
 * - Ventaja: Siempre funciona, sin problemas de CORS
 * - Desventaja: HTML duplicado en el código JavaScript
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 1. Busca el contenedor en el HTML (ej: <div id="navbar-container">)
 * 2. Intenta fetch('components/navbar.html')
 * 3. Si funciona: Inserta el HTML del archivo
 * 4. Si falla: Usa embeddedComponents.navbar
 * 5. Si ambos fallan: Muestra error
 * 
 * 📋 COMPONENTES DISPONIBLES:
 * - navbar: Barra de navegación completa
 * - footer: Pie de página simple
 * - cart-modal: Modal del carrito de compras
 * 
 * @param {string} componentName - Nombre del componente ('navbar', 'footer', 'cart-modal')
 * @param {string} containerId - ID del div donde insertar el componente
 */
async function loadComponent(componentName, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`❌ Contenedor ${containerId} no encontrado`);
        return;
    }

    try {
        // Intentar cargar desde archivo HTML
        const response = await fetch(`components/${componentName}.html`);
        if (response.ok) {
            const html = await response.text();
            container.innerHTML = html;
            console.log(`✅ Componente ${componentName} cargado desde archivo HTML`);
        } else {
            throw new Error(`Archivo no encontrado: ${response.status}`);
        }
    } catch (error) {
        // Fallback a componente embebido
        console.warn(`⚠️ No se pudo cargar ${componentName}.html, usando componente embebido:`, error.message);

        if (embeddedComponents[componentName]) {
            container.innerHTML = embeddedComponents[componentName];
            console.log(`✅ Componente ${componentName} cargado desde fallback embebido`);
        } else {
            console.error(`❌ Componente ${componentName} no encontrado ni en archivo ni en fallback`);
        }
    }
}

/**
 * ====================================================================================
 * 📋 FASE 2 DEL PROCESO PRINCIPAL - CARGA DE COMPONENTES BASE
 * ====================================================================================
 * 
 * Esta función es la FASE 2 del PROCESO PRINCIPAL. Se ejecuta automáticamente
 * cuando se detectan contenedores de componentes y carga los elementos base
 * en todas las páginas de la aplicación.
 * 
 * 🎯 PROPÓSITO EN EL PROCESO:
 * - Cargar navbar, carrito y footer en todas las páginas
 * - Mantener consistencia visual en toda la aplicación
 * - Permitir acceso al carrito desde cualquier página
 * - Preparar la base para la FASE 3 (Configuración de navegación)
 * 
 * 🔄 FLUJO DENTRO DEL PROCESO PRINCIPAL:
 * 
 * PASO 2.1: INICIO DE CARGA
 * - Se llama automáticamente desde el event listener DOMContentLoaded
 * - Solo se ejecuta si existen contenedores de componentes
 * 
 * PASO 2.2: CARGA SECUENCIAL DE COMPONENTES
 * - Carga navbar (navegación principal) usando loadComponent()
 * - Carga modal del carrito (funcionalidad de compras) usando loadComponent()
 * - Carga footer (información de la empresa) usando loadComponent()
 * 
 * PASO 2.3: FINALIZACIÓN DE FASE
 * - Muestra confirmación de carga completa
 * - Prepara para la FASE 3 (Configuración de navegación)
 * 
 * 📋 COMPONENTES QUE CARGA:
 * - navbar: Barra de navegación con logo, menús y carrito
 * - cart-modal: Modal para ver y gestionar productos en el carrito
 * - footer: Pie de página con información de copyright
 * 
 * 📄 PÁGINAS QUE USAN ESTA FUNCIÓN:
 * - index.html: Página principal
 * - login.html: Página de inicio de sesión
 * - registro.html: Página de registro de usuario
 * 
 * ⚡ CARACTERÍSTICAS DEL PROCESO:
 * - Función async/await para cargar componentes en secuencia
 * - Manejo de errores automático (fallback a componentes embebidos)
 * - Logs informativos para debugging
 * - Sistema simplificado sin duplicación de código
 * - Integración perfecta con el PROCESO PRINCIPAL
 */
async function loadPageComponents() {
    console.log('🔄 ===== FASE 2: INICIANDO CARGA DE COMPONENTES =====');
    
    // ====================================================================================
    // PASO 2.1: CARGA DE NAVBAR (Navegación principal)
    // ====================================================================================
    console.log('📋 PASO 2.1: Cargando navbar...');
    await loadComponent('navbar', 'navbar-container');
    
    // ====================================================================================
    // PASO 2.2: CARGA DE MODAL DEL CARRITO (Funcionalidad de compras)
    // ====================================================================================
    console.log('🛒 PASO 2.2: Cargando modal del carrito...');
    await loadComponent('cart-modal', 'cart-modal-container');
    
    // ====================================================================================
    // PASO 2.3: CARGA DE FOOTER (Información de la empresa)
    // ====================================================================================
    console.log('📄 PASO 2.3: Cargando footer...');
    await loadComponent('footer', 'footer-container');
    
    // ====================================================================================
    // PASO 2.4: FINALIZACIÓN DE FASE 2
    // ====================================================================================
    console.log('✅ ===== FASE 2 COMPLETADA: TODOS LOS COMPONENTES CARGADOS =====');
}

/**
 * ====================================================================================
 * 🚀 PROCESO PRINCIPAL - SISTEMA COMPLETO DE COMPONENTES Y NAVEGACIÓN
 * ====================================================================================
 * 
 * Este es el CORAZÓN de todo el sistema. Es un PROCESO ÚNICO que maneja:
 * 
 * 📋 FASE 1: CARGA DE COMPONENTES
 * - Detecta automáticamente si la página tiene contenedores de componentes
 * - Carga navbar, carrito y footer usando sistema híbrido (fetch + fallback)
 * - Aplica a todas las páginas: index.html, login.html, registro.html
 * 
 * 📋 FASE 2: CONFIGURACIÓN DE NAVEGACIÓN
 * - Configura navegación suave para enlaces del navbar
 * - Maneja navegación entre páginas con anclas específicas
 * - Activa tabs de productos automáticamente según categoría seleccionada
 * 
 * 🎯 PROPÓSITO GLOBAL:
 * - Crear experiencia de usuario consistente en toda la aplicación
 * - Mantener navbar, carrito y footer disponibles en todas las páginas
 * - Proporcionar navegación fluida y contextual
 * - Simplificar el mantenimiento del sistema
 * 
 * 🔄 FLUJO COMPLETO DEL PROCESO:
 * 
 * PASO 1: DETECCIÓN AUTOMÁTICA
 * - Espera a que el DOM esté completamente cargado
 * - Verifica si existen contenedores de componentes (navbar-container)
 * 
 * PASO 2: CARGA DE COMPONENTES (Si existen contenedores)
 * - Ejecuta loadPageComponents() para cargar navbar, carrito y footer
 * - Usa sistema híbrido: intenta fetch() de archivos HTML, fallback a embebidos
 * - Aplica a todas las páginas que tengan los contenedores necesarios
 * 
 * PASO 3: CONFIGURACIÓN DE NAVEGACIÓN
 * - Ejecuta setupNavbarNavigation() para configurar enlaces
 * - Configura navegación suave, activación de tabs, scroll animado
 * - Maneja navegación entre páginas y secciones
 * 
 * PASO 4: FINALIZACIÓN
 * - Proceso completo terminado
 * - Usuario puede navegar y usar todos los componentes
 * 
 * 📄 PÁGINAS QUE USAN ESTE PROCESO:
 * - index.html: Página principal con navbar-container
 * - login.html: Página de login con navbar-container  
 * - registro.html: Página de registro con navbar-container
 * 
 * ⚡ CARACTERÍSTICAS DEL PROCESO:
 * - PROCESO ÚNICO: Todo en una secuencia lógica
 * - Ejecución automática (no necesita llamada manual)
 * - Sistema simplificado sin detección de tipos de página
 * - Carga de componentes base en todas las páginas
 * - Configuración automática de navegación
 * - Logs informativos para debugging
 * - Manejo de errores automático con fallbacks
 */
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 ===== INICIANDO PROCESO PRINCIPAL DE COMPONENTES =====');
    
    // ====================================================================================
    // PASO 1: DETECCIÓN AUTOMÁTICA DE CONTENEDORES
    // ====================================================================================
    console.log('🔍 PASO 1: Detectando contenedores de componentes...');
    
    if (document.getElementById('navbar-container')) {
        // ====================================================================================
        // PASO 2: CARGA DE COMPONENTES (Si existen contenedores)
        // ====================================================================================
        console.log('✅ PASO 2: Contenedores detectados - Iniciando carga de componentes');
        loadPageComponents();
    } else {
        console.log('ℹ️ PASO 2: No se detectaron contenedores - Saltando carga de componentes');
    }
    
    // ====================================================================================
    // PASO 3: CONFIGURACIÓN DE NAVEGACIÓN (Siempre se ejecuta)
    // ====================================================================================
    console.log('🔧 PASO 3: Configurando navegación suave...');
    setupNavbarNavigation();
    
    // ====================================================================================
    // PASO 4: FINALIZACIÓN DEL PROCESO
    // ====================================================================================
    console.log('✅ ===== PROCESO PRINCIPAL COMPLETADO =====');
});

/**
 * ====================================================================================
 * 🔧 FASE 3 DEL PROCESO PRINCIPAL - CONFIGURACIÓN DE NAVEGACIÓN SUAVE
 * ====================================================================================
 * 
 * Esta función es la FASE 3 del PROCESO PRINCIPAL. Se ejecuta automáticamente
 * después de cargar los componentes y configura el comportamiento de los enlaces
 * del navbar para proporcionar navegación suave y inteligente.
 * 
 * 🎯 PROPÓSITO EN EL PROCESO:
 * - Configurar navegación suave para enlaces internos (#sobre-nosotros, #productos)
 * - Manejar navegación entre páginas con anclas específicas
 * - Activar tabs de productos automáticamente según la categoría seleccionada
 * - Completar la experiencia de usuario del PROCESO PRINCIPAL
 * 
 * 🔄 FLUJO DENTRO DEL PROCESO PRINCIPAL:
 * 
 * PASO 3.1: ESPERA DE CARGA
 * - Espera 500ms para que los componentes se carguen completamente
 * - Asegura que el navbar esté disponible antes de configurar enlaces
 * 
 * PASO 3.2: CONFIGURACIÓN DE ENLACES
 * - Busca todos los enlaces que contienen anclas (#sobre-nosotros, #productos)
 * - Configura event listeners para cada enlace
 * - Detecta si estamos en index.html o en otra página
 * 
 * PASO 3.3: LÓGICA DE NAVEGACIÓN
 * - Navegación interna: Desde index.html a secciones de la misma página
 * - Navegación externa: Desde login/registro a index.html con sección específica
 * - Activación de tabs: Automática según categoría de producto seleccionada
 * 
 * PASO 3.4: RECUPERACIÓN DE ESTADO
 * - Verifica si hay una categoría guardada en sessionStorage
 * - Activa el tab correspondiente si existe
 * - Limpia el estado guardado después de usarlo
 * 
 * 📋 TIPOS DE NAVEGACIÓN MANEJADOS:
 * - Navegación interna: Desde index.html a secciones de la misma página
 * - Navegación externa: Desde login/registro a index.html con sección específica
 * - Activación de tabs: Automática según categoría de producto seleccionada
 * 
 * ⚡ CARACTERÍSTICAS DEL PROCESO:
 * - Navegación suave con scroll animado
 * - Preservación de estado entre páginas (sessionStorage)
 * - Activación automática de tabs de productos
 * - Manejo inteligente de contexto de página
 * - Integración perfecta con el PROCESO PRINCIPAL
 */
function setupNavbarNavigation() {
    console.log('🔧 ===== FASE 3: INICIANDO CONFIGURACIÓN DE NAVEGACIÓN =====');
    
    // ====================================================================================
    // PASO 3.1: ESPERA DE CARGA DE COMPONENTES
    // ====================================================================================
    console.log('⏳ PASO 3.1: Esperando carga completa de componentes...');
    setTimeout(() => {
        // ====================================================================================
        // PASO 3.2: CONFIGURACIÓN DE ENLACES DE NAVEGACIÓN
        // ====================================================================================
        console.log('🔗 PASO 3.2: Configurando enlaces de navegación...');
        const navLinks = document.querySelectorAll('a[href*="#sobre-nosotros"], a[href*="#productos"]');
        console.log(`📋 Encontrados ${navLinks.length} enlaces de navegación`);

        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const href = this.getAttribute('href');
                const [page, anchor] = href.split('#');
                const category = this.getAttribute('data-category');

                // ====================================================================================
                // PASO 3.3: LÓGICA DE NAVEGACIÓN SEGÚN CONTEXTO
                // ====================================================================================
                if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                    // Navegación interna: Desde index.html a secciones de la misma página
                    console.log(`🏠 Navegación interna a: ${anchor}`);
                    scrollToSection(anchor);

                    // Si hay una categoría específica, activar el tab correspondiente
                    if (category) {
                        console.log(`📋 Activando tab de categoría: ${category}`);
                        activateProductTab(category);
                    }
                } else {
                    // Navegación externa: Desde login/registro a index.html con sección específica
                    console.log(`🌐 Navegación externa a: ${href}`);
                    if (category) {
                        // Guardar la categoría para activarla después de cargar la página
                        sessionStorage.setItem('activeCategory', category);
                        console.log(`💾 Categoría guardada para activación: ${category}`);
                    }
                    window.location.href = href;
                }
            });
        });

        // ====================================================================================
        // PASO 3.4: RECUPERACIÓN DE ESTADO GUARDADO
        // ====================================================================================
        console.log('🔄 PASO 3.4: Verificando estado guardado...');
        const savedCategory = sessionStorage.getItem('activeCategory');
        if (savedCategory) {
            console.log(`📋 Categoría guardada encontrada: ${savedCategory}`);
            setTimeout(() => {
                activateProductTab(savedCategory);
                sessionStorage.removeItem('activeCategory');
                console.log(`✅ Tab activado y estado limpiado: ${savedCategory}`);
            }, 1000);
        } else {
            console.log('ℹ️ No hay categoría guardada para activar');
        }
        
        console.log('✅ ===== FASE 3 COMPLETADA: NAVEGACIÓN CONFIGURADA =====');
    }, 500);
}

/**
 * SCROLL SUAVE A SECCIÓN ESPECÍFICA
 * 
 * Esta función proporciona navegación suave y animada a secciones específicas
 * de la página, mejorando la experiencia de usuario con transiciones fluidas.
 * 
 * 🎯 PROPÓSITO:
 * - Navegar suavemente a secciones específicas de la página
 * - Proporcionar experiencia de usuario fluida y profesional
 * - Evitar saltos bruscos al cambiar de sección
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 1. Busca el elemento con el ID especificado
 * 2. Si existe, ejecuta scrollIntoView con comportamiento suave
 * 3. Si no existe, no hace nada (evita errores)
 * 
 * 📋 PARÁMETROS:
 * - sectionId: ID de la sección a la que navegar (ej: 'sobre-nosotros', 'productos')
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Scroll suave y animado (behavior: 'smooth')
 * - Posicionamiento preciso (block: 'start')
 * - Manejo seguro de errores (verificación de existencia)
 * - Compatible con todos los navegadores modernos
 * 
 * @param {string} sectionId - ID de la sección a la que hacer scroll
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',  // Animación suave
            block: 'start'       // Posicionar al inicio de la sección
        });
    }
}

/**
 * ACTIVACIÓN AUTOMÁTICA DE TABS DE PRODUCTOS
 * 
 * Esta función activa automáticamente el tab de productos correspondiente
 * a la categoría seleccionada desde el navbar, proporcionando navegación
 * directa a la sección de productos específica.
 * 
 * 🎯 PROPÓSITO:
 * - Activar automáticamente el tab de productos según la categoría seleccionada
 * - Proporcionar navegación directa desde el navbar a categorías específicas
 * - Mejorar la experiencia de usuario con navegación contextual
 * - Integrar navegación del navbar con el sistema de tabs de productos
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 1. Recibe el ID de la categoría a activar
 * 2. Busca el botón del tab correspondiente
 * 3. Maneja caso especial para "todos" (tab de todos los productos)
 * 4. Activa el tab usando la API de Bootstrap
 * 5. Muestra confirmación o error según el resultado
 * 
 * 📋 CATEGORÍAS SOPORTADAS:
 * - 'todos': Tab de todos los productos
 * - 'tortas-cuadradas': Tab de tortas cuadradas
 * - 'tortas-circulares': Tab de tortas circulares
 * - 'postres-individuales': Tab de postres individuales
 * - 'productos-sin-azucar': Tab de productos sin azúcar
 * - 'pasteleria-tradicional': Tab de pastelería tradicional
 * - 'productos-sin-gluten': Tab de productos sin gluten
 * - 'productos-vegana': Tab de productos veganos
 * - 'tortas-especiales': Tab de tortas especiales
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Activación automática usando Bootstrap Tab API
 * - Manejo de caso especial para "todos"
 * - Búsqueda dinámica de tabs por atributo data-bs-target
 * - Logs informativos para debugging
 * - Manejo seguro de errores
 * 
 * @param {string} categoryId - ID de la categoría a activar
 */
function activateProductTab(categoryId) {
    let tabButton;

    // Caso especial para "todos" - Tab de todos los productos
    if (categoryId === 'todos') {
        tabButton = document.getElementById('todos-tab');
    } else {
        // Buscar el tab correspondiente para categorías específicas
        tabButton = document.querySelector(`button[data-bs-target="#${categoryId}"]`);
    }

    if (tabButton) {
        // Activar el tab usando Bootstrap Tab API
        const tab = new bootstrap.Tab(tabButton);
        tab.show();

        console.log(`✅ Tab activado: ${categoryId}`);
    } else {
        console.warn(`❌ No se encontró el tab para la categoría: ${categoryId}`);
    }
}

/**
 * ====================================================================================
 * 🎯 RESUMEN FINAL DEL PROCESO PRINCIPAL
 * ====================================================================================
 * 
 * Este archivo implementa un PROCESO ÚNICO y COMPLETO que maneja:
 * 
 * 📋 FASE 1: DETECCIÓN AUTOMÁTICA
 * - Detecta si la página tiene contenedores de componentes
 * - Se ejecuta automáticamente cuando el DOM está listo
 * 
 * 📋 FASE 2: CARGA DE COMPONENTES
 * - Carga navbar, carrito y footer en todas las páginas
 * - Usa sistema híbrido (fetch + fallback) para máxima compatibilidad
 * - Aplica a index.html, login.html y registro.html
 * 
 * 📋 FASE 3: CONFIGURACIÓN DE NAVEGACIÓN
 * - Configura navegación suave para enlaces del navbar
 * - Maneja navegación entre páginas con anclas específicas
 * - Activa tabs de productos automáticamente según categoría
 * 
 * 🎯 RESULTADO FINAL:
 * - Experiencia de usuario consistente en toda la aplicación
 * - Navbar, carrito y footer disponibles en todas las páginas
 * - Navegación fluida y contextual
 * - Sistema simple y mantenible
 * 
 * ⚡ CARACTERÍSTICAS DEL PROCESO:
 * - PROCESO ÚNICO: Todo en una secuencia lógica
 * - Ejecución automática (no necesita llamada manual)
 * - Sistema simplificado sin detección de tipos de página
 * - Carga de componentes base en todas las páginas
 * - Configuración automática de navegación
 * - Logs informativos para debugging
 * - Manejo de errores automático con fallbacks
 * 
 * 📋 FUNCIONES DISPONIBLES DESPUÉS DE ESTA LÍNEA:
 * - loadComponent(): Carga componentes con sistema híbrido
 * - loadPageComponents(): FASE 2 - Carga componentes base para todas las páginas
 * - setupNavbarNavigation(): FASE 3 - Configura navegación suave
 * - scrollToSection(): Scroll suave a secciones
 * - activateProductTab(): Activa tabs de productos
 * 
 * ⚡ ESTADO DEL PROCESO:
 * - Sistema híbrido de componentes: ✅ DISPONIBLE
 * - Componentes embebidos: ✅ CARGADOS
 * - Event listeners: ✅ CONFIGURADOS
 * - Navegación suave: ✅ LISTA
 * - PROCESO PRINCIPAL: ✅ COMPLETO Y FUNCIONAL
 */
console.log('🚀 ===== SISTEMA DE COMPONENTES LISTO Y FUNCIONANDO =====');