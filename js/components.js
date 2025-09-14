// ========================================
// COMPONENTS - Pastelería Mil Sabores
// Sistema híbrido de componentes HTML
// ========================================

/**
 * Componentes HTML embebidos como fallback
 * Se usan cuando fetch() falla (sin servidor local)
 */
const embeddedComponents = {
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
                        class="material-icons position-absolute top-50 start-0 translate-middle-y ms-3 text-pink">search</i>
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
                            <i class="material-icons text-pink">person</i>
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
                        <i class="material-icons text-pink">shopping_cart</i>
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
                    Productos <i class="material-icons float-end">expand_more</i>
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
                    class="material-icons position-absolute top-50 start-0 translate-middle-y ms-3 text-pink">search</i>
                <input type="text" class="form-control ps-5 border-pink bg-white search-input"
                    placeholder="Buscar..." style="border-radius: 25px;">
            </div>
        </div>

        <!-- User and Cart - Mobile -->
        <div class="mt-4 d-flex flex-column gap-3">
            <!-- Mi Cuenta - Mobile -->
            <div class="d-flex flex-column gap-2">
                <div class="d-flex align-items-center gap-3 p-3 bg-light rounded">
                    <i class="material-icons text-pink">person</i>
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
                <i class="material-icons text-pink">shopping_cart</i>
                <span class="fw-medium" id="cartTotalPriceMobile">Carrito $0</span>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cartCounterMobile" style="display: none;">0</span>
            </div>
        </div>
    </div>
</div>`,

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
};

/**
 * Carga un componente HTML desde archivo o fallback embebido
 * @param {string} componentName - Nombre del componente
 * @param {string} containerId - ID del contenedor donde insertar el componente
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
 * Carga todos los componentes necesarios para las páginas de autenticación
 */
async function loadAuthComponents() {
    console.log('🔄 Cargando componentes de autenticación...');
    
    // Cargar navbar
    await loadComponent('navbar', 'navbar-container');
    
    // Cargar modal del carrito
    await loadComponent('cartModal', 'cart-modal-container');
    
    // Cargar footer
    await loadComponent('footer', 'footer-container');
    
    console.log('✅ Todos los componentes de autenticación cargados');
}

/**
 * Carga componentes específicos para la página principal
 */
async function loadMainPageComponents() {
    console.log('🔄 Cargando componentes de página principal...');
    
    // Cargar navbar
    await loadComponent('navbar', 'navbar-container');
    
    // Cargar modal del carrito
    await loadComponent('cartModal', 'cart-modal-container');
    
    // Cargar footer
    await loadComponent('footer', 'footer-container');
    
    console.log('✅ Todos los componentes de página principal cargados');
}

// Cargar componentes automáticamente cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando carga de componentes...');
    
    // Detectar el tipo de página y cargar componentes correspondientes
    const body = document.body;
    
    if (body.classList.contains('auth-page')) {
        // Páginas de autenticación (login, registro)
        loadAuthComponents();
    } else if (document.getElementById('navbar-container')) {
        // Página principal u otras páginas
        loadMainPageComponents();
    } else {
        console.log('ℹ️ No se detectaron contenedores de componentes en esta página');
    }
    
    // Configurar navegación suave para enlaces del navbar
    setupNavbarNavigation();
});

/**
 * Configura la navegación suave para los enlaces del navbar
 */
function setupNavbarNavigation() {
    // Esperar un poco para que los componentes se carguen
    setTimeout(() => {
        // Manejar enlaces de navegación
        const navLinks = document.querySelectorAll('a[href*="#sobre-nosotros"], a[href*="#productos"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const href = this.getAttribute('href');
                const [page, anchor] = href.split('#');
                const category = this.getAttribute('data-category');
                
                // Si estamos en index.html, navegar directamente al anchor
                if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                    scrollToSection(anchor);
                    
                    // Si hay una categoría específica, activar el tab correspondiente
                    if (category) {
                        activateProductTab(category);
                    }
                } else {
                    // Si estamos en otra página, ir a index.html con el anchor
                    if (category) {
                        // Guardar la categoría para activarla después de cargar la página
                        sessionStorage.setItem('activeCategory', category);
                    }
                    window.location.href = href;
                }
            });
        });
        
        // Verificar si hay una categoría guardada para activar
        const savedCategory = sessionStorage.getItem('activeCategory');
        if (savedCategory) {
            setTimeout(() => {
                activateProductTab(savedCategory);
                sessionStorage.removeItem('activeCategory');
            }, 1000);
        }
    }, 500);
}

/**
 * Hace scroll suave a una sección específica
 * @param {string} sectionId - ID de la sección a la que hacer scroll
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Activa el tab de productos correspondiente a la categoría
 * @param {string} categoryId - ID de la categoría a activar
 */
function activateProductTab(categoryId) {
    let tabButton;
    
    // Caso especial para "todos"
    if (categoryId === 'todos') {
        tabButton = document.getElementById('todos-tab');
    } else {
        // Buscar el tab correspondiente para categorías específicas
        tabButton = document.querySelector(`button[data-bs-target="#${categoryId}"]`);
    }
    
    if (tabButton) {
        // Activar el tab usando Bootstrap
        const tab = new bootstrap.Tab(tabButton);
        tab.show();
        
        console.log(`✅ Tab activado: ${categoryId}`);
    } else {
        console.warn(`❌ No se encontró el tab para la categoría: ${categoryId}`);
    }
}

console.log('✅ components.js cargado correctamente - Sistema híbrido de componentes disponible');