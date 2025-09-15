/**
 * ====================================================================================
 * 🛒 ARCHIVO DE PRODUCTOS - PASTELERÍA MIL SABORES
 * ====================================================================================
 * 
 * Este archivo centraliza toda la lógica relacionada con productos, carrito de compras
 * y navegación entre categorías. Es el corazón del sistema de e-commerce de la aplicación.
 * 
 * 🎯 PROPÓSITO:
 * - Gestionar la base de datos de productos y categorías
 * - Implementar funcionalidad completa del carrito de compras
 * - Manejar navegación entre categorías de productos
 * - Proporcionar modales de detalles de productos
 * - Persistir datos del carrito en localStorage
 * 
 * 📋 FUNCIONALIDADES PRINCIPALES:
 * - Base de datos de productos con categorías
 * - Sistema de carrito con persistencia
 * - Modales de detalles de productos
 * - Navegación entre categorías con tabs
 * - Notificaciones toast para feedback del usuario
 * - Gestión de cantidad de productos
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 1. Carga productos desde base de datos local
 * 2. Inicializa carrito desde localStorage
 * 3. Configura event listeners para interacciones
 * 4. Maneja navegación entre categorías
 * 5. Gestiona agregar/quitar productos del carrito
 * 6. Persiste cambios en localStorage
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Sistema de carrito persistente
 * - Navegación fluida entre categorías
 * - Modales responsivos con Bootstrap
 * - Notificaciones toast para feedback
 * - Gestión de cantidad con botones +/-
 * - Integración con sistema de componentes
 * 
 * 📄 ARCHIVOS RELACIONADOS:
 * - index.html: Página principal con sección de productos
 * - components/navbar.html: Navegación con dropdown de categorías
 * - components/cart-modal.html: Modal del carrito de compras
 * - js/components.js: Sistema de componentes y navegación
 */

// ====================================================================================
// 📋 SECCIÓN 1: VARIABLES GLOBALES Y PERSISTENCIA
// ====================================================================================

/**
 * ====================================================================================
 * 🛒 VARIABLES GLOBALES DEL SISTEMA
 * ====================================================================================
 * 
 * Estas variables mantienen el estado global del sistema de productos y carrito.
 * 
 * 📋 VARIABLES DISPONIBLES:
 * - cart: Array que contiene los productos en el carrito
 * - currentModalProductId: ID del producto actualmente mostrado en el modal
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Estado global accesible desde todas las funciones
 * - Persistencia automática en localStorage
 * - Sincronización con interfaz de usuario
 */

// Array que contiene los productos en el carrito
let cart = [];

// ID del producto actualmente mostrado en el modal de detalles
let currentModalProductId = null;

/**
 * ====================================================================================
 * 💾 CARGA DE CARRITO DESDE LOCALSTORAGE
 * ====================================================================================
 * 
 * Esta función recupera el carrito de compras guardado en localStorage al inicializar
 * la aplicación, asegurando que el usuario mantenga sus productos seleccionados
 * entre sesiones.
 * 
 * 🎯 PROPÓSITO:
 * - Recuperar carrito de compras de sesiones anteriores
 * - Mantener persistencia de datos del usuario
 * - Inicializar el estado global del carrito
 * - Manejar errores de parsing de JSON
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 
 * PASO 1: RECUPERACIÓN DE DATOS
 * - Busca el carrito guardado en localStorage con clave 'milSaboresCart'
 * - Si no existe → Mantiene carrito vacío
 * 
 * PASO 2: PARSING DE JSON
 * - Intenta convertir el string JSON a objeto JavaScript
 * - Si hay error → Muestra error en consola y resetea carrito
 * 
 * PASO 3: INICIALIZACIÓN
 * - Asigna el carrito recuperado a la variable global
 * - Actualiza la interfaz de usuario
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Manejo seguro de errores de parsing
 * - Fallback a carrito vacío en caso de error
 * - Logs informativos para debugging
 * - Persistencia automática entre sesiones
 * 
 * 📄 USADO EN:
 * - Inicialización de la aplicación
 * - Recuperación de estado después de recarga de página
 */
function loadCartFromStorage() {
    // ====================================================================================
    // PASO 1: RECUPERACIÓN DE DATOS DESDE LOCALSTORAGE
    // ====================================================================================
    const savedCart = localStorage.getItem('milSaboresCart');
    if (savedCart) {
        try {
            // ====================================================================================
            // PASO 2: PARSING SEGURO DE JSON
            // ====================================================================================
            cart = JSON.parse(savedCart);
        } catch (e) {
            // ====================================================================================
            // PASO 3: MANEJO DE ERRORES
            // ====================================================================================
            console.error('Error al cargar carrito desde localStorage:', e);
            cart = [];
        }
    }
}

/**
 * ====================================================================================
 * 💾 GUARDADO DE CARRITO EN LOCALSTORAGE
 * ====================================================================================
 * 
 * Esta función guarda el estado actual del carrito en localStorage para mantener
 * persistencia entre sesiones y recargas de página.
 * 
 * 🎯 PROPÓSITO:
 * - Guardar estado actual del carrito en localStorage
 * - Mantener persistencia de datos del usuario
 * - Sincronizar cambios con almacenamiento local
 * - Manejar errores de escritura en localStorage
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 
 * PASO 1: SERIALIZACIÓN
 * - Convierte el array del carrito a string JSON
 * - Prepara datos para almacenamiento
 * 
 * PASO 2: ALMACENAMIENTO
 * - Guarda el carrito en localStorage con clave 'milSaboresCart'
 * - Si hay error → Muestra error en consola
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Manejo seguro de errores de escritura
 * - Serialización automática a JSON
 * - Logs informativos para debugging
 * - Persistencia automática en cada cambio
 * 
 * 📄 USADO EN:
 * - Después de agregar productos al carrito
 * - Después de modificar cantidades
 * - Después de eliminar productos
 * - Al cerrar la aplicación
 */
function saveCartToStorage() {
    try {
        // ====================================================================================
        // PASO 1: SERIALIZACIÓN Y ALMACENAMIENTO
        // ====================================================================================
        localStorage.setItem('milSaboresCart', JSON.stringify(cart));
    } catch (e) {
        // ====================================================================================
        // PASO 2: MANEJO DE ERRORES
        // ====================================================================================
        console.error('Error al guardar carrito en localStorage:', e);
    }
}

// ====================================================================================
// 📋 SECCIÓN 2: BASE DE DATOS DE PRODUCTOS
// ====================================================================================

/**
 * ====================================================================================
 * 🗄️ BASE DE DATOS DE PRODUCTOS Y CATEGORÍAS
 * ====================================================================================
 * 
 * Esta es la base de datos local que contiene todos los productos organizados por
 * categorías. Cada producto incluye información completa para la tienda online.
 * 
 * 🎯 PROPÓSITO:
 * - Almacenar información completa de productos
 * - Organizar productos por categorías
 * - Proporcionar datos para la interfaz de usuario
 * - Mantener consistencia en toda la aplicación
 * 
 * 📋 ESTRUCTURA DE DATOS:
 * - categorias: Objeto con categorías de productos
 * - cada categoría contiene: nombre, icono, productos
 * - cada producto contiene: id, nombre, precio, imagen, descripción, etc.
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Datos estructurados y organizados
 * - Información completa de cada producto
 * - Categorización lógica de productos
 * - Fácil mantenimiento y actualización
 * - Integración con sistema de carrito
 * 
 * 📄 USADO EN:
 * - Generación dinámica de productos
 * - Modales de detalles de productos
 * - Sistema de carrito de compras
 * - Navegación entre categorías
 */
console.log('🚀 productos.js cargado correctamente');

// Base de datos de productos cargada dinámicamente desde JSON
let productosDB = null;

/**
 * ====================================================================================
 * 🗄️ CARGAR BASE DE DATOS DE PRODUCTOS
 * ====================================================================================
 * 
 * Carga la base de datos de productos desde el archivo JSON externo.
 * Esta función se ejecuta al inicializar la aplicación.
 */
async function loadProductosDB() {
    try {
        console.log('📁 Cargando base de datos de productos...');
        const response = await fetch('productos.json');
        
        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
        }
        
        productosDB = await response.json();
        console.log('✅ Base de datos de productos cargada correctamente');
        console.log(`📊 Categorías disponibles: ${Object.keys(productosDB.categorias).length}`);
        
        return productosDB;
    } catch (error) {
        console.error('❌ Error al cargar la base de datos de productos:', error);
        showDatabaseError();
        throw new Error(`No se pudo cargar productos.json: ${error.message}`);
    }
}

/**
 * ====================================================================================
 * 🚨 MOSTRAR ERROR DE BASE DE DATOS
 * ====================================================================================
 * 
 * Muestra un error visible cuando no se puede cargar la base de datos de productos.
 */
function showDatabaseError() {
    console.error('🚨 ERROR CRÍTICO: Base de datos de productos no disponible');
    console.error('📁 Verificar que el archivo productos.json existe y es accesible');
    
    // Mostrar error con SweetAlert2
    Swal.fire({
        icon: 'error',
        title: 'Error de Base de Datos',
        html: `
            <p><strong>No se pudo cargar el archivo productos.json</strong></p>
            <hr>
            <p class="mb-2">Posibles causas:</p>
            <ul class="text-start">
                <li>El archivo productos.json no existe</li>
                <li>Error de permisos de acceso</li>
                <li>Problema de conexión o servidor</li>
                <li>Formato JSON inválido</li>
            </ul>
            <hr>
            <small class="text-muted">
                <i class="fas fa-info-circle"></i> 
                Verifica la consola del navegador para más detalles técnicos
            </small>
        `,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#e74c3c'
    });
}


// ========================================
//   FUNCIONES DE PRODUCTOS
// ========================================

// Variables globales para filtros
let filtroPrecioActivo = false;
let precioMinimo = 0;
let precioMaximo = 999999;

// Función para obtener todos los productos en un objeto plano
// ====================================================================================
// 📋 SECCIÓN 3: FUNCIONES DE OBTENCIÓN DE PRODUCTOS
// ====================================================================================

/**
 * ====================================================================================
 * 📦 OBTENCIÓN DE TODOS LOS PRODUCTOS
 * ====================================================================================
 * 
 * Esta función obtiene todos los productos de todas las categorías y los organiza
 * en un objeto indexado por ID para facilitar el acceso.
 * 
 * 🎯 PROPÓSITO:
 * - Consolidar todos los productos en un solo objeto
 * - Indexar productos por ID para acceso rápido
 * - Facilitar búsquedas por ID de producto
 * - Proporcionar vista unificada de todos los productos
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 
 * PASO 1: INICIALIZACIÓN
 * - Crea objeto vacío para almacenar productos
 * 
 * PASO 2: ITERACIÓN POR CATEGORÍAS
 * - Recorre todas las categorías de productosDB
 * - Extrae productos de cada categoría
 * 
 * PASO 3: INDEXACIÓN POR ID
 * - Asigna cada producto al objeto usando su ID como clave
 * - Retorna objeto indexado
 * 
 * 📋 VALOR DE RETORNO:
 * - Objeto con productos indexados por ID
 * - Estructura: {productoId: productoObject, ...}
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Acceso rápido por ID de producto
 * - Consolidación de datos de múltiples categorías
 * - Estructura optimizada para búsquedas
 * - Integración con sistema de carrito
 * 
 * 📄 USADO EN:
 * - Búsqueda de productos por ID
 * - Generación de contenido dinámico
 * - Sistema de carrito de compras
 */
function getAllProducts() {
    // ====================================================================================
    // PASO 1: INICIALIZACIÓN DEL OBJETO DE PRODUCTOS
    // ====================================================================================
    const productos = {};
    
    // ====================================================================================
    // PASO 2: ITERACIÓN POR CATEGORÍAS Y PRODUCTOS
    // ====================================================================================
    Object.values(productosDB.categorias).forEach(categoria => {
        categoria.productos.forEach(producto => {
            productos[producto.id] = producto;
        });
    });
    
    // ====================================================================================
    // PASO 3: RETORNO DEL OBJETO INDEXADO
    // ====================================================================================
    return productos;
}

/**
 * ====================================================================================
 * 🔍 OBTENCIÓN DE PRODUCTO POR ID
 * ====================================================================================
 * 
 * Esta función busca y retorna un producto específico usando su ID único.
 * 
 * 🎯 PROPÓSITO:
 * - Buscar producto específico por ID
 * - Proporcionar acceso directo a datos del producto
 * - Facilitar operaciones con productos individuales
 * - Centralizar lógica de búsqueda por ID
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 
 * PASO 1: BÚSQUEDA
 * - Usa getAllProducts() para obtener todos los productos
 * - Busca producto por ID en el objeto indexado
 * 
 * PASO 2: LOGGING
 * - Registra la búsqueda en consola para debugging
 * 
 * PASO 3: RETORNO
 * - Retorna el producto encontrado o undefined
 * 
 * 📋 PARÁMETROS:
 * - id: ID único del producto (string)
 * 
 * 📋 VALOR DE RETORNO:
 * - Objeto del producto si existe
 * - undefined si no se encuentra
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Búsqueda rápida por ID
 * - Logging para debugging
 * - Manejo seguro de productos no encontrados
 * - Integración con sistema de carrito
 * 
 * 📄 USADO EN:
 * - Modales de detalles de productos
 * - Sistema de carrito de compras
 * - Operaciones de productos individuales
 * 
 * @param {string} id - ID único del producto
 * @returns {object|undefined} - Objeto del producto o undefined
 */
function getProductById(id) {
    // ====================================================================================
    // PASO 1: BÚSQUEDA DEL PRODUCTO
    // ====================================================================================
    const producto = getAllProducts()[id];
    
    // ====================================================================================
    // PASO 2: LOGGING PARA DEBUGGING
    // ====================================================================================
    console.log('getProductById:', id, producto);
    
    // ====================================================================================
    // PASO 3: RETORNO DEL PRODUCTO
    // ====================================================================================
    return producto;
}

/**
 * ====================================================================================
 * 📂 OBTENCIÓN DE PRODUCTOS POR CATEGORÍA
 * ====================================================================================
 * 
 * Esta función obtiene todos los productos de una categoría específica.
 * 
 * 🎯 PROPÓSITO:
 * - Obtener productos de una categoría específica
 * - Facilitar navegación por categorías
 * - Proporcionar datos para tabs de productos
 * - Centralizar lógica de filtrado por categoría
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 
 * PASO 1: BÚSQUEDA DE CATEGORÍA
 * - Busca la categoría en productosDB usando categoryKey
 * - Usa optional chaining para manejo seguro
 * 
 * PASO 2: RETORNO DE PRODUCTOS
 * - Retorna array de productos de la categoría
 * - Retorna array vacío si la categoría no existe
 * 
 * 📋 PARÁMETROS:
 * - categoryKey: Clave de la categoría (string)
 * 
 * 📋 VALOR DE RETORNO:
 * - Array de productos de la categoría
 * - Array vacío si la categoría no existe
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Manejo seguro de categorías inexistentes
 * - Retorno consistente (siempre array)
 * - Acceso directo a productos de categoría
 * - Integración con sistema de tabs
 * 
 * 📄 USADO EN:
 * - Generación de contenido de tabs
 * - Navegación entre categorías
 * - Filtrado de productos
 * 
 * @param {string} categoryKey - Clave de la categoría
 * @returns {array} - Array de productos de la categoría
 */
function getProductsByCategory(categoryKey) {
    return productosDB.categorias[categoryKey]?.productos || [];
}

/**
 * ====================================================================================
 * 📋 OBTENCIÓN DE TODAS LAS CATEGORÍAS
 * ====================================================================================
 * 
 * Esta función obtiene todas las categorías disponibles en la base de datos.
 * 
 * 🎯 PROPÓSITO:
 * - Obtener todas las categorías de productos
 * - Facilitar generación de navegación
 * - Proporcionar datos para dropdowns y tabs
 * - Centralizar acceso a categorías
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 
 * PASO 1: ACCESO DIRECTO
 * - Accede directamente a productosDB.categorias
 * - Retorna objeto completo de categorías
 * 
 * 📋 VALOR DE RETORNO:
 * - Objeto con todas las categorías
 * - Estructura: {categoryKey: categoryObject, ...}
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Acceso directo a datos de categorías
 * - Retorno completo de información
 * - Integración con sistema de navegación
 * - Fácil iteración y manipulación
 * 
 * 📄 USADO EN:
 * - Generación de tabs de categorías
 * - Navegación del navbar
 * - Dropdowns de categorías
 * 
 * @returns {object} - Objeto con todas las categorías
 */
function getAllCategories() {
    return productosDB.categorias;
}

// Función para filtrar productos por precio
function filtrarProductosPorPrecio(productos) {
    if (!filtroPrecioActivo) return productos;
    
    return productos.filter(producto => 
        producto.precio >= precioMinimo && producto.precio <= precioMaximo
    );
}

// Función para aplicar filtro de precio
function aplicarFiltroPrecio() {
    const precioMinInput = document.getElementById('precioMin');
    const precioMaxInput = document.getElementById('precioMax');
    
    if (!precioMinInput || !precioMaxInput) return;
    
    const min = parseInt(precioMinInput.value) || 0;
    const max = parseInt(precioMaxInput.value) || 999999;
    
    // Validar que el mínimo no sea mayor al máximo
    if (min > max) {
        showCartNotification('El precio mínimo no puede ser mayor al máximo', 'error');
        return;
    }
    
    // Aplicar filtros
    filtroPrecioActivo = true;
    precioMinimo = min;
    precioMaximo = max;
    
    // Regenerar contenido
    regenerateProductsContent();
    
    // Mostrar notificación
    const cantidadFiltrada = contarProductosFiltrados();
    showCartNotification(`Filtro aplicado: ${cantidadFiltrada} productos encontrados`, 'success');
}

// Función para limpiar filtro de precio
function limpiarFiltroPrecio() {
    const precioMinInput = document.getElementById('precioMin');
    const precioMaxInput = document.getElementById('precioMax');
    
    if (precioMinInput) precioMinInput.value = '';
    if (precioMaxInput) precioMaxInput.value = '';
    
    // Limpiar filtros
    filtroPrecioActivo = false;
    precioMinimo = 0;
    precioMaximo = 999999;
    
    // Regenerar contenido
    regenerateProductsContent();
    
    showCartNotification('Filtro de precio limpiado', 'info');
}

// Función para contar productos filtrados
function contarProductosFiltrados() {
    let total = 0;
    Object.values(productosDB.categorias).forEach(categoria => {
        const productosFiltrados = filtrarProductosPorPrecio(categoria.productos);
        total += productosFiltrados.length;
    });
    return total;
}

// Función para regenerar contenido de productos
function regenerateProductsContent() {
    const productTabsContent = document.getElementById('productTabsContent');
    if (!productTabsContent) return;
    
    const todosHTML = generateTodosHTML();
    const categoriesHTML = Object.entries(productosDB.categorias).map(([key, categoria]) => 
        generateCategoryHTML(key, categoria)
    ).join('');
    
    productTabsContent.innerHTML = todosHTML + categoriesHTML;
    
    // Configurar botones de cantidad después de regenerar el HTML
    setupQuantityButtons();
    
    // Configurar listeners de cambio de tabs
    setupTabChangeListeners();
}

// Función para generar HTML de una card de producto
function generateProductCardHTML(producto) {
    let stockBadge = '';
    if (producto.stock === 0) {
        stockBadge = `<div class="product-badge out-of-stock">Sin Stock</div>`;
    } else if (producto.stock < 10) {
        stockBadge = `<div class="product-badge low-stock">Poco Stock</div>`;
    } else if (producto.featured) {
        stockBadge = `<div class="product-badge featured">Destacado</div>`;
    }
    
    const ratingStars = Array.from({length: 5}, (_, i) => 
        `<i class="fas fa-star ${i < Math.floor(producto.rating) ? 'text-warning' : 'text-muted'}"></i>`
    ).join('');
    
    return `
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="card product-card h-100">
                <div class="product-image">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    ${stockBadge}
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text text-muted">${producto.descripcion}</p>
                    <div class="product-rating mb-2">
                        ${ratingStars}
                        <span class="ms-1 text-muted">(${producto.reviews})</span>
                    </div>
                    <div class="product-price mb-3">
                        <span class="h4">$${producto.precio.toLocaleString('es-CL')}</span>
                    </div>
                    <div class="stock-info mb-3">
                        <small class="text-muted">
                            <i class="fas fa-box me-1"></i>
                            Stock: <strong>${producto.stock} unidades</strong>
                        </small>
                    </div>
                    
                    <!-- Botones de acción -->
                    <div class="mt-auto">
                        <!-- Fila con cantidad y agregar al carrito -->
                        <div class="row g-2 mb-2 align-items-end">
                            <div class="col-3">
                                <input type="number" class="form-control form-control-sm py-2" id="quantity-${producto.id}" value="1" min="1" max="${producto.stock}" placeholder="Cant.">
                            </div>
                            <div class="col-9">
                                <button class="btn btn-primary w-100 py-2" onclick="addToCart('${producto.id}')">
                                    <i class="fas fa-shopping-cart me-1"></i>Agregar al Carrito
                                </button>
                            </div>
                        </div>
                        
                        <!-- Botón ver detalles -->
                        <button class="btn btn-outline-primary w-100 mt-2" onclick="showProductDetails('${producto.id}')">
                            <i class="fas fa-eye me-2"></i>Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función para generar HTML de una categoría completa
function generateCategoryHTML(categoriaKey, categoria) {
    const productosFiltrados = filtrarProductosPorPrecio(categoria.productos);
    const productosHTML = productosFiltrados.map(producto => 
        generateProductCardHTML(producto)
    ).join('');
    
    // Mostrar mensaje si no hay productos que coincidan con el filtro
    const contenidoHTML = productosFiltrados.length > 0 ? 
        `<div class="row">${productosHTML}</div>` :
        `<div class="text-center py-5">
            <i class="fas fa-search fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">No se encontraron productos</h5>
            <p class="text-muted">Intenta ajustar el filtro de precio</p>
        </div>`;
    
    return `
        <div class="tab-pane fade" id="${categoriaKey}" role="tabpanel">
            ${contenidoHTML}
        </div>
    `;
}

/**
 * ====================================================================================
 * 📋 GENERACIÓN DE HTML DE TABS DE CATEGORÍAS
 * ====================================================================================
 * 
 * Esta función genera dinámicamente el HTML de los tabs de navegación para las
 * categorías de productos, utilizando la estructura de datos de productosDB.categorias.
 * 
 * 🎯 PROPÓSITO:
 * - Crear tabs de navegación para cada categoría de productos
 * - Generar tab especial "Todos los Productos" que muestra todos los productos
 * - Configurar atributos Bootstrap para funcionalidad de tabs
 * - Integrar iconos Font Awesome para cada categoría
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 1. Crea tab fijo "Todos los Productos" (siempre activo por defecto)
 * 2. Itera sobre productosDB.categorias para generar tabs dinámicos
 * 3. Extrae datos específicos de cada categoría (nombre, icono, key)
 * 4. Genera HTML con atributos Bootstrap para funcionalidad
 * 5. Combina todos los tabs en una cadena HTML completa
 * 
 * 📊 UTILIZACIÓN DEL JSON productosDB.categorias:
 * - Object.entries(productosDB.categorias): Convierte objeto en array de [key, value]
 * - [key, categoria]: Destructuring para obtener clave y objeto de categoría
 * - categoria.nombre: Nombre legible de la categoría (ej: "Tortas Cuadradas")
 * - categoria.icono: Clase CSS del icono Font Awesome (ej: "fas fa-square")
 * - key: Identificador único de la categoría (ej: "tortas-cuadradas")
 * 
 * ⚡ CARACTERÍSTICAS DEL HTML GENERADO:
 * - Estructura Bootstrap nav-pills para tabs
 * - Atributos data-bs-toggle="pill" para funcionalidad Bootstrap
 * - data-bs-target="#id" para vincular tab con contenido
 * - IDs únicos para cada tab (ej: "tortas-cuadradas-tab")
 * - Iconos Font Awesome integrados
 * - Tab "Todos" marcado como activo por defecto
 * 
 * 📋 ESTRUCTURA JSON UTILIZADA:
 * productosDB.categorias = {
 *   "tortas-cuadradas": {
 *     nombre: "Tortas Cuadradas",
 *     icono: "fas fa-square",
 *     productos: [...]
 *   },
 *   "tortas-circulares": {
 *     nombre: "Tortas Circulares", 
 *     icono: "fas fa-circle",
 *     productos: [...]
 *   }
 * }
 * 
 * @returns {string} HTML completo de todos los tabs de categorías
 */
function generateTabsHTML() {
    console.log('🔧 Generando HTML de tabs de categorías...');
    console.log('📊 Categorías disponibles:', Object.keys(productosDB.categorias));
    
    // ====================================================================================
    // 📋 TAB FIJO "TODOS LOS PRODUCTOS"
    // ====================================================================================
    // Este tab siempre se genera primero y está activo por defecto.
    // Muestra todos los productos de todas las categorías combinados.
    const todosTab = `<li class="nav-item" role="presentation">
        <button class="nav-link active" id="todos-tab" data-bs-toggle="pill" 
            data-bs-target="#todos" type="button" role="tab">
            <i class="fas fa-th-large me-2"></i>Todos los Productos
        </button>
    </li>`;
    
    console.log('✅ Tab "Todos los Productos" generado');
    
    // ====================================================================================
    // 📋 GENERACIÓN DINÁMICA DE TABS DE CATEGORÍAS
    // ====================================================================================
    // Object.entries() convierte el objeto productosDB.categorias en un array de pares [key, value]
    // Ejemplo: [["tortas-cuadradas", {nombre: "Tortas Cuadradas", icono: "fas fa-square", productos: [...]}]]
    const categoriasTabs = Object.entries(productosDB.categorias).map(([key, categoria]) => {
        console.log(`🔧 Procesando categoría: ${key} -> ${categoria.nombre}`);
        
        // ====================================================================================
        // 📋 DESTRUCTURING DE DATOS DE CATEGORÍA
        // ====================================================================================
        // key: Identificador único de la categoría (ej: "tortas-cuadradas")
        // categoria: Objeto completo de la categoría con propiedades:
        //   - nombre: Nombre legible (ej: "Tortas Cuadradas")
        //   - icono: Clase CSS del icono Font Awesome (ej: "fas fa-square")
        //   - productos: Array de productos de esta categoría
        
        return `<li class="nav-item" role="presentation">
            <button class="nav-link" id="${key}-tab" data-bs-toggle="pill" 
                data-bs-target="#${key}" type="button" role="tab">
                <i class="${categoria.icono} me-2"></i>${categoria.nombre}
            </button>
        </li>`;
    }).join(''); // join('') convierte el array de strings en una sola cadena
    
    console.log(`✅ ${Object.keys(productosDB.categorias).length} tabs de categorías generados`);
    
    // ====================================================================================
    // 📋 COMBINACIÓN Y RETORNO
    // ====================================================================================
    // Combina el tab fijo "Todos" con todos los tabs dinámicos de categorías
    const resultado = todosTab + categoriasTabs;
    console.log('🎯 HTML de tabs generado exitosamente');
    
    return resultado;
}

/**
 * ====================================================================================
 * 📋 GENERACIÓN DE HTML DEL TAB "TODOS LOS PRODUCTOS"
 * ====================================================================================
 * 
 * Esta función genera el contenido del tab "Todos los Productos" que muestra
 * todos los productos de todas las categorías combinados en una sola vista.
 * 
 * 🎯 PROPÓSITO:
 * - Combinar productos de todas las categorías en una vista unificada
 * - Aplicar filtros de precio a todos los productos
 * - Generar tarjetas de productos para cada elemento
 * - Manejar casos donde no hay productos que coincidan con filtros
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 1. Extrae todos los productos de todas las categorías usando Object.values()
 * 2. Combina arrays de productos usando spread operator (...)
 * 3. Aplica filtro de precios usando filtrarProductosPorPrecio()
 * 4. Genera HTML de tarjetas para cada producto usando generateProductCardHTML()
 * 5. Maneja caso de "sin resultados" con mensaje informativo
 * 6. Envuelve todo en estructura Bootstrap tab-pane
 * 
 * 📊 UTILIZACIÓN DEL JSON productosDB.categorias:
 * - Object.values(productosDB.categorias): Obtiene solo los valores (objetos de categorías)
 * - categoria.productos: Array de productos específicos de cada categoría
 * - ...categoria.productos: Spread operator para combinar arrays
 * - productosDB.categorias = {
 *     "tortas-cuadradas": { productos: [producto1, producto2, ...] },
 *     "tortas-circulares": { productos: [producto3, producto4, ...] }
 *   }
 * 
 * ⚡ CARACTERÍSTICAS DEL HTML GENERADO:
 * - Estructura Bootstrap tab-pane con clases "fade show active"
 * - ID "todos" para vinculación con tab correspondiente
 * - Grid responsivo con clase "row" para tarjetas de productos
 * - Mensaje de "sin resultados" con iconos Font Awesome
 * - Integración con sistema de filtros de precio
 * 
 * 📋 ESTRUCTURA DE PRODUCTOS UTILIZADA:
 * Cada producto en categoria.productos tiene la estructura:
 * {
 *   id: "unique-id",
 *   nombre: "Nombre del Producto",
 *   precio: 15000,
 *   descripcion: "Descripción detallada",
 *   imagen: "ruta/imagen.jpg",
 *   stock: 10,
 *   categoria: "tortas-cuadradas"
 * }
 * 
 * @returns {string} HTML completo del tab "Todos los Productos"
 */
function generateTodosHTML() {
    console.log('🔧 Generando HTML del tab "Todos los Productos"...');
    
    // ====================================================================================
    // 📋 EXTRACCIÓN DE TODOS LOS PRODUCTOS DE TODAS LAS CATEGORÍAS
    // ====================================================================================
    // Object.values() obtiene solo los valores (objetos de categorías) del objeto productosDB.categorias
    // Ejemplo: [{nombre: "Tortas Cuadradas", productos: [...]}, {nombre: "Tortas Circulares", productos: [...]}]
    const todosProductos = [];
    Object.values(productosDB.categorias).forEach(categoria => {
        console.log(`📦 Extrayendo productos de categoría: ${categoria.nombre} (${categoria.productos.length} productos)`);
        
        // Spread operator (...) combina el array de productos de esta categoría con el array principal
        // Ejemplo: todosProductos = [...todosProductos, producto1, producto2, producto3]
        todosProductos.push(...categoria.productos);
    });
    
    console.log(`📊 Total de productos combinados: ${todosProductos.length}`);
    
    // ====================================================================================
    // 📋 APLICACIÓN DE FILTROS DE PRECIO
    // ====================================================================================
    // filtrarProductosPorPrecio() aplica los filtros de precio configurados por el usuario
    // Utiliza los valores de los sliders de precio mínimo y máximo
    const productosFiltrados = filtrarProductosPorPrecio(todosProductos);
    console.log(`🔍 Productos después del filtro de precio: ${productosFiltrados.length}`);
    
    // ====================================================================================
    // 📋 GENERACIÓN DE HTML DE TARJETAS DE PRODUCTOS
    // ====================================================================================
    // map() transforma cada producto en su HTML de tarjeta correspondiente
    // generateProductCardHTML() crea la estructura completa de tarjeta Bootstrap
    const productosHTML = productosFiltrados.map(producto => {
        console.log(`🎨 Generando tarjeta para producto: ${producto.nombre}`);
        return generateProductCardHTML(producto);
    }).join(''); // join('') convierte el array de strings en una sola cadena HTML
    
    // ====================================================================================
    // 📋 MANEJO DE CASO "SIN RESULTADOS"
    // ====================================================================================
    // Si no hay productos que coincidan con los filtros, muestra mensaje informativo
    const contenidoHTML = productosFiltrados.length > 0 ? 
        `<div class="row">${productosHTML}</div>` :
        `<div class="text-center py-5">
            <i class="fas fa-search fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">No se encontraron productos</h5>
            <p class="text-muted">Intenta ajustar el filtro de precio</p>
        </div>`;
    
    console.log(`✅ Contenido HTML generado: ${productosFiltrados.length > 0 ? 'Con productos' : 'Sin resultados'}`);
    
    // ====================================================================================
    // 📋 ESTRUCTURA FINAL DEL TAB
    // ====================================================================================
    // Estructura Bootstrap tab-pane con:
    // - "fade show active": Clases para transición y estado activo
    // - id="todos": Identificador para vinculación con tab
    // - role="tabpanel": Atributo de accesibilidad
    const resultado = `
        <div class="tab-pane fade show active" id="todos" role="tabpanel">
            ${contenidoHTML}
        </div>
    `;
    
    console.log('🎯 HTML del tab "Todos los Productos" generado exitosamente');
    
    return resultado;
}

/**
 * ====================================================================================
 * 📋 GENERACIÓN COMPLETA DE CONTENIDO DE PRODUCTOS DINÁMICAMENTE
 * ====================================================================================
 * 
 * Esta función es el coordinador principal que genera todo el contenido de productos
 * de forma dinámica, incluyendo tabs de navegación y contenido de cada categoría.
 * 
 * 🎯 PROPÓSITO:
 * - Coordinar la generación de todos los elementos de productos
 * - Generar tabs de navegación para categorías
 * - Crear contenido del tab "Todos los Productos"
 * - Generar contenido específico para cada categoría individual
 * - Retornar estructura organizada para inserción en DOM
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 1. Genera HTML de tabs de navegación usando generateTabsHTML()
 * 2. Genera contenido del tab "Todos los Productos" usando generateTodosHTML()
 * 3. Itera sobre cada categoría para generar contenido específico
 * 4. Combina todo el contenido en estructura organizada
 * 5. Retorna objeto con tabs y contenido separados
 * 
 * 📊 UTILIZACIÓN DEL JSON productosDB.categorias:
 * - Object.entries(): Convierte objeto en array de [key, value] para iteración
 * - [key, categoria]: Destructuring para obtener clave y objeto de categoría
 * - generateCategoryHTML(key, categoria): Genera contenido específico de cada categoría
 * - key: Identificador único usado para IDs y navegación
 * - categoria: Objeto completo con nombre, icono y productos
 * 
 * ⚡ CARACTERÍSTICAS DEL RESULTADO:
 * - Estructura organizada con tabs y contenido separados
 * - Tabs de navegación con iconos Font Awesome
 * - Contenido del tab "Todos" activo por defecto
 * - Contenido específico para cada categoría individual
 * - HTML listo para inserción directa en DOM
 * 
 * 📋 ESTRUCTURA JSON UTILIZADA:
 * productosDB.categorias = {
 *   "tortas-cuadradas": {
 *     nombre: "Tortas Cuadradas",
 *     icono: "fas fa-square",
 *     productos: [
 *       {id: "torta-chocolate", nombre: "Torta de Chocolate", precio: 15000, ...},
 *       {id: "torta-vainilla", nombre: "Torta de Vainilla", precio: 12000, ...}
 *     ]
 *   },
 *   "tortas-circulares": {
 *     nombre: "Tortas Circulares",
 *     icono: "fas fa-circle", 
 *     productos: [
 *       {id: "torta-frutilla", nombre: "Torta de Frutilla", precio: 18000, ...}
 *     ]
 *   }
 * }
 * 
 * 📤 ESTRUCTURA DE RETORNO:
 * {
 *   tabs: "<li>Tab Todos</li><li>Tab Categoría 1</li><li>Tab Categoría 2</li>...",
 *   categories: "<div id='todos'>Contenido Todos</div><div id='cat1'>Contenido Cat1</div>..."
 * }
 * 
 * @returns {Object} Objeto con propiedades tabs y categories conteniendo HTML
 */
function generateProductsContent() {
    console.log('🚀 Iniciando generación completa de contenido de productos...');
    console.log('📊 Categorías disponibles:', Object.keys(productosDB.categorias));
    
    // ====================================================================================
    // 📋 GENERACIÓN DE TABS DE NAVEGACIÓN
    // ====================================================================================
    // generateTabsHTML() crea todos los tabs de navegación incluyendo:
    // - Tab fijo "Todos los Productos" (activo por defecto)
    // - Tabs dinámicos para cada categoría con iconos Font Awesome
    // - Atributos Bootstrap para funcionalidad de tabs
    const tabsHTML = generateTabsHTML();
    console.log('✅ Tabs de navegación generados');
    
    // ====================================================================================
    // 📋 GENERACIÓN DE CONTENIDO DEL TAB "TODOS LOS PRODUCTOS"
    // ====================================================================================
    // generateTodosHTML() crea el contenido del tab que muestra todos los productos
    // de todas las categorías combinados, con filtros de precio aplicados
    const todosHTML = generateTodosHTML();
    console.log('✅ Contenido del tab "Todos los Productos" generado');
    
    // ====================================================================================
    // 📋 GENERACIÓN DE CONTENIDO PARA CADA CATEGORÍA INDIVIDUAL
    // ====================================================================================
    // Object.entries() convierte productosDB.categorias en array de [key, value]
    // map() itera sobre cada categoría y genera su contenido específico
    // generateCategoryHTML(key, categoria) crea el contenido completo de cada categoría
    const categoriesHTML = Object.entries(productosDB.categorias).map(([key, categoria]) => {
        console.log(`🔧 Generando contenido para categoría: ${key} (${categoria.nombre})`);
        
        // ====================================================================================
        // 📋 DESTRUCTURING DE DATOS DE CATEGORÍA
        // ====================================================================================
        // key: Identificador único de la categoría (ej: "tortas-cuadradas")
        // categoria: Objeto completo con propiedades:
        //   - nombre: Nombre legible (ej: "Tortas Cuadradas")
        //   - icono: Clase CSS del icono Font Awesome (ej: "fas fa-square")
        //   - productos: Array de productos específicos de esta categoría
        
        return generateCategoryHTML(key, categoria);
    }).join(''); // join('') convierte el array de strings en una sola cadena HTML
    
    console.log(`✅ Contenido de ${Object.keys(productosDB.categorias).length} categorías generado`);
    
    // ====================================================================================
    // 📋 COMBINACIÓN Y ESTRUCTURA DE RETORNO
    // ====================================================================================
    // Combina el contenido del tab "Todos" con el contenido de todas las categorías
    // Estructura organizada para inserción eficiente en DOM
    const resultado = {
        tabs: tabsHTML,                    // HTML de tabs de navegación
        categories: todosHTML + categoriesHTML  // HTML de contenido (Todos + Categorías)
    };
    
    console.log('🎯 Generación completa de contenido de productos finalizada exitosamente');
    console.log('📊 Resumen:', {
        tabsGenerados: 'Tabs de navegación + Tab Todos',
        categoriasGeneradas: Object.keys(productosDB.categorias).length,
        contenidoTotal: 'Tab Todos + Contenido de todas las categorías'
    });
    
    return resultado;
}

// Función para inicializar el contenido dinámico de productos
function initializeDynamicProducts() {
    const productTabs = document.getElementById('productTabs');
    const productTabsContent = document.getElementById('productTabsContent');
    
    if (productTabs && productTabsContent) {
        const content = generateProductsContent();
        
        // Reemplazar tabs
        productTabs.innerHTML = content.tabs;
        
        // Reemplazar contenido de categorías
        productTabsContent.innerHTML = content.categories;
        
        // Configurar botones de cantidad después de regenerar el HTML
        setupQuantityButtons();
        
        // Configurar listeners de cambio de tabs
        setupTabChangeListeners();
    }
}

/**
 * Configura los inputs de cantidad después de regenerar el HTML
 */
function setupQuantityButtons() {
    console.log('🔧 Setting up quantity inputs...');
    
    // Configurar todos los inputs de cantidad existentes
    const inputs = document.querySelectorAll('input[id^="quantity-"]');
    console.log('🔍 Found quantity inputs:', inputs.length);
    
    // Verificar qué tab está activo
    const activeTab = document.querySelector('.tab-pane.active');
    console.log('📋 Active tab:', activeTab ? activeTab.id : 'none');
    
    inputs.forEach((input, index) => {
        console.log(`Input ${index} configured:`, input.id, input.value);
        
        // Asegurar que el input tenga los atributos correctos
        if (input.id && input.id.startsWith('quantity-')) {
            const productId = input.id.replace('quantity-', '');
            const producto = getProductById(productId);
            if (producto) {
                input.min = 1;
                input.max = producto.stock;
                input.value = input.value || 1;
                console.log(`✅ Input ${productId} configured: min=${input.min}, max=${input.max}, value=${input.value}`);
            }
        }
    });
    
    console.log('Quantity inputs setup complete');
}

/**
 * Configura los inputs de cantidad solo del tab activo
 */
function setupActiveTabQuantityButtons() {
    console.log('🎯 Setting up active tab quantity inputs...');
    
    // Buscar solo los inputs del tab activo
    const activeTab = document.querySelector('.tab-pane.active');
    if (!activeTab) {
        console.log('❌ No active tab found');
        return;
    }
    
    const inputs = activeTab.querySelectorAll('input[id^="quantity-"]');
    console.log('🔍 Found quantity inputs in active tab:', inputs.length, 'for tab:', activeTab.id);
    
    inputs.forEach((input, index) => {
        console.log(`Input ${index} configured in tab ${activeTab.id}:`, input.id, input.value);
        
        // Asegurar que el input tenga los atributos correctos
        if (input.id && input.id.startsWith('quantity-')) {
            const productId = input.id.replace('quantity-', '');
            const producto = getProductById(productId);
            if (producto) {
                input.min = 1;
                input.max = producto.stock;
                input.value = input.value || 1;
                console.log(`✅ Input ${productId} configured: min=${input.min}, max=${input.max}, value=${input.value}`);
            }
        }
    });
    
    console.log('Active tab quantity inputs setup complete');
}

/**
 * Verifica que los inputs de cantidad estén funcionando correctamente
 */
function verifyQuantityInputs() {
    console.log('🔍 Verifying quantity inputs...');
    
    const activeTab = document.querySelector('.tab-pane.active');
    if (!activeTab) {
        console.log('❌ No active tab found');
        return;
    }
    
    const inputs = activeTab.querySelectorAll('input[id^="quantity-"]');
    console.log(`📊 Found ${inputs.length} inputs in tab ${activeTab.id}`);
    
    inputs.forEach((input, index) => {
        const productId = input.id.replace('quantity-', '');
        console.log(`Input ${index}:`, {
            id: input.id,
            productId: productId,
            value: input.value,
            min: input.min,
            max: input.max,
            visible: input.offsetParent !== null
        });
    });
}

/**
 * Limpia inputs duplicados manteniendo solo los del tab activo
 */
function cleanupDuplicateInputs() {
    console.log('🧹 Cleaning up duplicate inputs...');
    
    const activeTab = document.querySelector('.tab-pane.active');
    if (!activeTab) {
        console.log('❌ No active tab found');
        return;
    }
    
    // Obtener todos los inputs de cantidad
    const allInputs = document.querySelectorAll('input[id^="quantity-"]');
    const inputsByProduct = {};
    
    // Agrupar inputs por producto
    allInputs.forEach(input => {
        const productId = input.id.replace('quantity-', '');
        if (!inputsByProduct[productId]) {
            inputsByProduct[productId] = [];
        }
        inputsByProduct[productId].push(input);
    });
    
    // Para cada producto, mantener solo el input del tab activo
    Object.entries(inputsByProduct).forEach(([productId, inputs]) => {
        if (inputs.length > 1) {
            console.log(`🔧 Found ${inputs.length} inputs for product ${productId}`);
            
            // Encontrar el input del tab activo
            const activeInput = activeTab.querySelector(`#quantity-${productId}`);
            
            if (activeInput) {
                // Ocultar o remover los otros inputs
                inputs.forEach(input => {
                    if (input !== activeInput) {
                        console.log(`🗑️ Removing duplicate input for ${productId}`);
                        input.remove();
                    }
                });
            }
        }
    });
    
    console.log('🧹 Cleanup complete');
}

/**
 * Configura los event listeners para el cambio de tabs
 */
function setupTabChangeListeners() {
    console.log('📑 Setting up tab change listeners...');
    
    // Configurar eventos para todos los tabs de productos
    const tabButtons = document.querySelectorAll('#productTabs button[data-bs-toggle="pill"]');
    
    tabButtons.forEach(tabButton => {
        // Remover event listener anterior si existe
        tabButton.removeEventListener('shown.bs.tab', handleTabShown);
        
        // Agregar nuevo event listener
        tabButton.addEventListener('shown.bs.tab', handleTabShown);
    });
    
    console.log('Tab change listeners configured for', tabButtons.length, 'tabs');
}

/**
 * Maneja el evento de mostrar un tab
 */
function handleTabShown(event) {
    console.log('🎯 Tab shown:', event.target.id);
    
    // Configurar botones de cantidad después de que se muestre el tab
    setTimeout(() => {
        console.log('⏰ Configurando botones después de cambio de tab...');
        cleanupDuplicateInputs();
        setupActiveTabQuantityButtons();
        verifyQuantityInputs();
    }, 200);
}


// Función para mostrar detalles del producto en modal
function showProductDetails(productId) {
    const producto = getProductById(productId);
    if (!producto) return;

    // Guardar el ID del producto actual para usar en el modal
    currentModalProductId = productId;

    // Llenar el modal con la información del producto
    document.getElementById('modalProductImage').src = producto.imagen;
    document.getElementById('modalProductTitle').textContent = producto.nombre;
     document.getElementById('modalProductPrice').textContent = `$${producto.precio.toLocaleString('es-CL')}`;
    
    // Mostrar stock en el modal
    const stockElement = document.getElementById('modalProductStock');
    if (stockElement) {
        stockElement.textContent = `${producto.stock} unidades disponibles`;
        stockElement.className = producto.stock === 0 ? 'text-danger' : 
                                 producto.stock < 10 ? 'text-warning' : 'text-success';
    }
    
    // Usar descripción detallada si existe, sino usar la descripción normal
    const descripcionModal = producto.descripcionDetallada || producto.descripcion;
    document.getElementById('modalProductDescription').textContent = descripcionModal;
    document.getElementById('modalProductServings').textContent = producto.porciones;
    document.getElementById('modalProductCalories').textContent = producto.calorias;
    document.getElementById('modalProductIngredients').textContent = producto.ingredientes;

    // Mostrar rating
    const ratingHtml = Array.from({length: 5}, (_, i) => 
        `<i class="fas fa-star ${i < Math.floor(producto.rating) ? 'text-warning' : 'text-muted'}"></i>`
    ).join('') + ` <span class="ms-2">${producto.rating}/5 (${producto.reviews} reseñas)</span>`;
    document.getElementById('modalProductRating').innerHTML = ratingHtml;

    // Mostrar reseñas
    const reviewsHtml = producto.reseñas.map(review => 
        `<div class="review-item">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <span class="review-author">${review.autor}</span>
                <span class="review-date">${new Date(review.fecha).toLocaleDateString()}</span>
            </div>
            <div class="mb-2">
                ${Array.from({length: 5}, (_, i) => 
                    `<i class="fas fa-star ${i < review.rating ? 'text-warning' : 'text-muted'}"></i>`
                ).join('')}
            </div>
            <p>${review.comentario}</p>
        </div>`
    ).join('');
    document.getElementById('modalProductReviews').innerHTML = reviewsHtml;

    // Configurar selector de cantidad del modal
    const modalQuantityInput = document.getElementById('modalQuantity');
    modalQuantityInput.value = 1;
    modalQuantityInput.max = producto.stock;

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
    
}


// Función para manejar navegación de productos desde navbar
function handleProductNavigation(categoryKey) {
    const productosSection = document.getElementById('productos');
    if (!productosSection) return;

    // Si estamos en la página de productos, hacer scroll y activar tab
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        productosSection.scrollIntoView({ behavior: 'smooth' });
        
        // Activar el tab correspondiente
        setTimeout(() => {
            const tabButton = document.getElementById(`${categoryKey}-tab`);
            if (tabButton) {
                const tab = new bootstrap.Tab(tabButton);
                tab.show();
            }
        }, 500);
    } else {
        // Si estamos en otra página, redirigir a index con hash
        window.location.href = `index.html#productos-${categoryKey}`;
    }
}

// Función para manejar hash de URL al cargar la página
function handleUrlHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#productos-')) {
        const categoryKey = hash.replace('#productos-', '');
        setTimeout(() => {
            handleProductNavigation(categoryKey);
        }, 1000);
    } else if (hash === '#productos' || hash === '#productos-todos') {
        // Si el hash es solo #productos o #productos-todos, mostrar el tab "todos"
        setTimeout(() => {
            const productosSection = document.getElementById('productos');
            if (productosSection) {
                productosSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    const tabButton = document.getElementById('todos-tab');
                    if (tabButton) {
                        const tab = new bootstrap.Tab(tabButton);
                        tab.show();
                    }
                }, 500);
            }
        }, 1000);
    }
}

// ========================================
// FUNCIONES DEL CARRITO
// ========================================

/**
 * Agrega un producto al carrito
 * @param {string} productId - ID del producto
 * @param {number} quantity - Cantidad a agregar
 */
// ====================================================================================
// 📋 SECCIÓN 4: FUNCIONES DEL CARRITO DE COMPRAS
// ====================================================================================

/**
 * ====================================================================================
 * 🛒 AGREGAR PRODUCTO AL CARRITO DE COMPRAS
 * ====================================================================================
 * 
 * Esta función es el corazón del sistema de carrito. Agrega productos al carrito
 * con validaciones de stock, manejo de cantidades y persistencia automática.
 * 
 * 🎯 PROPÓSITO:
 * - Agregar productos al carrito de compras
 * - Validar stock disponible
 * - Manejar cantidades de productos
 * - Persistir cambios en localStorage
 * - Proporcionar feedback visual al usuario
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 
 * PASO 1: VALIDACIÓN DE PRODUCTO
 * - Busca el producto por ID
 * - Si no existe → Termina la función
 * 
 * PASO 2: OBTENCIÓN DE CANTIDAD
 * - Busca el input de cantidad en el tab activo
 * - Usa cantidad proporcionada o valor del input
 * - Fallback a cantidad 1 si no se encuentra
 * 
 * PASO 3: VALIDACIÓN DE STOCK
 * - Verifica que el producto tenga stock disponible
 * - Valida que la cantidad no exceda el stock
 * - Muestra notificaciones de error si es necesario
 * 
 * PASO 4: MANEJO DE PRODUCTO EXISTENTE
 * - Si el producto ya está en el carrito → Suma cantidades
 * - Si no está en el carrito → Agrega nuevo item
 * 
 * PASO 5: ACTUALIZACIÓN DE INTERFAZ
 * - Actualiza contador del carrito
 * - Guarda cambios en localStorage
 * - Actualiza modal del carrito
 * - Muestra notificación de éxito
 * 
 * 📋 PARÁMETROS:
 * - productId: ID único del producto (string)
 * - quantity: Cantidad a agregar (number, opcional)
 * 
 * ⚡ CARACTERÍSTICAS:
 * - Validación robusta de stock
 * - Manejo inteligente de cantidades
 * - Persistencia automática en localStorage
 * - Feedback visual inmediato
 * - Logging detallado para debugging
 * - Manejo de productos duplicados
 * 
 * 📄 USADO EN:
 * - Botones "Agregar al Carrito" en tarjetas de productos
 * - Modal de detalles de productos
 * - Botones de cantidad con +/-
 * 
 * @param {string} productId - ID único del producto
 * @param {number} quantity - Cantidad a agregar (opcional)
 */
function addToCart(productId, quantity = null) {
    // ====================================================================================
    // PASO 1: VALIDACIÓN DE PRODUCTO
    // ====================================================================================
    console.log('🛒 addToCart called:', productId, 'quantity param:', quantity);
    const producto = getProductById(productId);
    if (!producto) {
        console.log('❌ Producto not found:', productId);
        return;
    }

    // ====================================================================================
    // PASO 2: OBTENCIÓN DE CANTIDAD DESDE TAB ACTIVO
    // ====================================================================================
    const activeTab = document.querySelector('.tab-pane.active');
    const inputElement = activeTab ? 
        activeTab.querySelector(`#quantity-${productId}`) : 
        document.getElementById(`quantity-${productId}`);
    
    const inputValue = inputElement ? inputElement.value : 'not found';
    const cantidad = quantity || parseInt(inputValue) || 1;
    
    console.log('📊 Active tab:', activeTab?.id);
    console.log('📊 Input element:', inputElement);
    console.log('📊 Input value:', inputValue);
    console.log('📊 Final cantidad:', cantidad);
    
    // ====================================================================================
    // PASO 3: VERIFICACIÓN DE INPUTS DUPLICADOS
    // ====================================================================================
    const allInputs = document.querySelectorAll(`#quantity-${productId}`);
    if (allInputs.length > 1) {
        console.log('⚠️ WARNING: Found', allInputs.length, 'inputs with same ID:', productId);
        allInputs.forEach((input, index) => {
            console.log(`Input ${index}:`, input.value, input.offsetParent ? 'visible' : 'hidden');
        });
    }
    
    // ====================================================================================
    // PASO 4: VALIDACIÓN DE STOCK
    // ====================================================================================
    if (producto.stock === 0) {
        showCartNotification('Este producto no está disponible', 'error');
        return;
    }
    
    if (cantidad > producto.stock) {
        showCartNotification(`Solo hay ${producto.stock} unidades disponibles`, 'error');
        return;
    }

    // ====================================================================================
    // PASO 5: MANEJO DE PRODUCTO EXISTENTE O NUEVO
    // ====================================================================================
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Verificar si al agregar más cantidad no excede el stock
        if (existingItem.cantidad + cantidad > producto.stock) {
            showCartNotification(`Solo puedes agregar ${producto.stock - existingItem.cantidad} unidades más`, 'warning');
            return;
        }
        console.log('➕ Adding to existing item:', existingItem.cantidad, '+', cantidad, '=', existingItem.cantidad + cantidad);
        existingItem.cantidad += cantidad;
    } else {
        console.log('🆕 Adding new item to cart:', cantidad, 'units');
        cart.push({
            id: productId,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad,
            imagen: producto.imagen
        });
    }

    // ====================================================================================
    // PASO 6: ACTUALIZACIÓN DE INTERFAZ Y PERSISTENCIA
    // ====================================================================================
    updateCartCounter();
    saveCartToStorage();
    updateCartModal();
    showCartNotification(`${producto.nombre} agregado al carrito`, 'success');
}

/**
 * Muestra notificación del carrito
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, error, warning)
 */
function showCartNotification(message, type = 'success') {
    // Crear toast si no existe
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 start-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }

    const toastId = 'toast-' + Date.now();
    const bgClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-warning';
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-exclamation-triangle';

    toastContainer.innerHTML += `
        <div class="toast ${bgClass} text-white" id="${toastId}" role="alert">
            <div class="toast-header ${bgClass} text-white border-0">
                <i class="fas ${icon} me-2"></i>
                <strong class="me-auto">Carrito</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;

    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    // Remover el toast del DOM después de que se oculte
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}


/**
 * Cambia la cantidad en el modal
 * @param {number} change - Cambio en la cantidad (+1 o -1)
 */
function changeModalQuantity(change) {
    const input = document.getElementById('modalQuantity');
    if (!input) return;

    let newValue = parseInt(input.value) + change;
    newValue = Math.max(1, Math.min(newValue, parseInt(input.max)));
    input.value = newValue;
}

/**
 * Elimina un producto del carrito
 * @param {string} productId - ID del producto a eliminar
 */
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        const producto = cart[index];
        cart.splice(index, 1);
        updateCartCounter();
        saveCartToStorage();
        updateCartModal();
        showCartNotification(`${producto.nombre} eliminado del carrito`, 'info');
    }
}

/**
 * Obtiene el carrito completo
 * @returns {Array} Array con todos los productos del carrito
 */
function getCart() {
    return cart;
}

/**
 * Limpia todo el carrito
 */
function clearCart() {
    cart = [];
    updateCartCounter();
    saveCartToStorage();
    showCartNotification('Carrito vaciado', 'info');
    updateCartModal();
}

/**
 * Muestra el modal del carrito
 */
function showCartModal() {
    updateCartModal();
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    modal.show();
}


/**
 * Actualiza el contenido del modal del carrito
 */
function updateCartModal() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartEmptyMessage = document.getElementById('cartEmptyMessage');
    const cartModalTotal = document.getElementById('cartModalTotal');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!cartItemsList || !cartEmptyMessage || !cartModalTotal || !clearCartBtn || !checkoutBtn) return;
    
    // Calcular total
    const totalPrice = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    cartModalTotal.textContent = `$${totalPrice.toLocaleString('es-CL')}`;
    
    if (cart.length === 0) {
        // Carrito vacío
        cartItemsList.style.display = 'none';
        cartEmptyMessage.style.display = 'block';
        clearCartBtn.style.display = 'none';
        checkoutBtn.style.display = 'none';
    } else {
        // Carrito con productos
        cartItemsList.style.display = 'block';
        cartEmptyMessage.style.display = 'none';
        clearCartBtn.style.display = 'inline-block';
        checkoutBtn.style.display = 'inline-block';
        
        // Generar HTML de los productos
        cartItemsList.innerHTML = cart.map(item => `
            <div class="cart-item d-flex align-items-center mb-3 p-3 border rounded">
                <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-image me-3" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${item.nombre}</h6>
                    <p class="text-muted mb-1">$${item.precio.toLocaleString('es-CL')} c/u</p>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-secondary" onclick="changeCartItemQuantity('${item.id}', -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="mx-2 fw-bold">${item.cantidad}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="changeCartItemQuantity('${item.id}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="text-end">
                    <div class="fw-bold mb-1">$${(item.precio * item.cantidad).toLocaleString('es-CL')}</div>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

/**
 * Cambia la cantidad de un producto en el carrito
 * @param {string} productId - ID del producto
 * @param {number} change - Cambio en la cantidad (+1 o -1)
 */
function changeCartItemQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    const producto = getProductById(productId);
    if (!producto) return;
    
    let newQuantity = item.cantidad + change;
    
    // Validar límites
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    if (newQuantity > producto.stock) {
        showCartNotification(`Solo hay ${producto.stock} unidades disponibles`, 'error');
        return;
    }
    
    item.cantidad = newQuantity;
    updateCartCounter();
    saveCartToStorage();
    updateCartModal();
}

/**
 * Actualiza el contador del carrito
 */
function updateCartCounter() {
        const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        
    // Actualizar contador desktop
    const counter = document.getElementById('cartCounter');
    if (counter) {
        counter.textContent = totalItems;
        counter.style.display = totalItems > 0 ? 'block' : 'none';
    }
    
    // Actualizar contador móvil
    const counterMobile = document.getElementById('cartCounterMobile');
    if (counterMobile) {
        counterMobile.textContent = totalItems;
        counterMobile.style.display = totalItems > 0 ? 'block' : 'none';
    }
    
    // Actualizar precio total desktop
        const priceElement = document.getElementById('cartTotalPrice');
        if (priceElement) {
        priceElement.textContent = `Carrito $${totalPrice.toLocaleString('es-CL')}`;
        }
    
    // Actualizar precio total móvil
    const priceElementMobile = document.getElementById('cartTotalPriceMobile');
    if (priceElementMobile) {
        priceElementMobile.textContent = `Carrito $${totalPrice.toLocaleString('es-CL')}`;
    }
}

// ========================================
// FUNCIONES DE NAVEGACIÓN
// ========================================


// Inicializar productos cuando se carga el DOM
document.addEventListener('DOMContentLoaded', async function() {
    // Cargar base de datos de productos desde JSON
    try {
        await loadProductosDB();
    } catch (error) {
        console.error('❌ No se pudo cargar la base de datos de productos:', error);
        return; // Salir si no se puede cargar la base de datos
    }
    
    // Cargar carrito desde localStorage
    loadCartFromStorage();
    
    // Actualizar contador del carrito en todas las páginas
    updateCartCounter();
    
    // Configurar evento para el botón de agregar al carrito del modal
    const modalAddToCartBtn = document.getElementById('modalAddToCart');
    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', function() {
            if (currentModalProductId) {
                const quantity = parseInt(document.getElementById('modalQuantity').value) || 1;
                addToCart(currentModalProductId, quantity);
                
                // Cerrar el modal después de agregar
                const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
                if (modal) {
                    modal.hide();
                }
            }
        });
    }
    
    // Solo inicializar si estamos en la página de productos
    if (document.getElementById('productos')) {
        initializeDynamicProducts();
        handleUrlHash();
        
        // Configurar eventos de navegación de productos
        document.querySelectorAll('[data-category]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const categoryKey = this.getAttribute('data-category');
                handleProductNavigation(categoryKey);
            });
        });
        
        // Configurar evento para el enlace principal de "Productos"
        document.querySelectorAll('a[href="#productos"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const productosSection = document.getElementById('productos');
                if (productosSection) {
                    productosSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                        const tabButton = document.getElementById('todos-tab');
                        if (tabButton) {
                            const tab = new bootstrap.Tab(tabButton);
                            tab.show();
                        }
                    }, 500);
                }
            });
        });
        
        // Configurar eventos de cambio de tabs para configurar botones de cantidad
        setupTabChangeListeners();
    }
});

/**
 * ====================================================================================
 * 🎯 RESUMEN FINAL DEL ARCHIVO DE PRODUCTOS
 * ====================================================================================
 * 
 * Este archivo es el corazón del sistema de e-commerce de la aplicación, centralizando
 * toda la lógica relacionada con productos, carrito de compras y navegación.
 * 
 * 📋 FUNCIONALIDADES PRINCIPALES:
 * - Base de datos de productos con categorías
 * - Sistema de carrito con persistencia en localStorage
 * - Modales de detalles de productos
 * - Navegación entre categorías con tabs
 * - Notificaciones toast para feedback del usuario
 * - Gestión de cantidad de productos
 * - Filtrado de productos por precio
 * - Generación dinámica de contenido
 * 
 * 📋 FUNCIONES PRINCIPALES:
 * - getAllProducts(): Obtiene todos los productos indexados por ID
 * - getProductById(): Busca producto específico por ID
 * - getProductsByCategory(): Obtiene productos de categoría específica
 * - addToCart(): Agrega productos al carrito con validaciones
 * - showProductDetails(): Muestra modal de detalles de producto
 * - updateCartCounter(): Actualiza contador del carrito
 * - generateProductsContent(): Genera contenido dinámico de productos
 * - setupQuantityButtons(): Configura botones de cantidad
 * 
 * ⚡ CARACTERÍSTICAS DEL ARCHIVO:
 * - Sistema de carrito persistente
 * - Navegación fluida entre categorías
 * - Modales responsivos con Bootstrap
 * - Notificaciones toast para feedback
 * - Gestión de cantidad con botones +/-
 * - Integración con sistema de componentes
 * - Validación robusta de stock
 * - Manejo inteligente de cantidades
 * 
 * 📄 ARCHIVOS RELACIONADOS:
 * - index.html: Página principal con sección de productos
 * - components/navbar.html: Navegación con dropdown de categorías
 * - components/cart-modal.html: Modal del carrito de compras
 * - js/components.js: Sistema de componentes y navegación
 * 
 * 🔄 FLUJO DE FUNCIONAMIENTO:
 * 1. Carga productos desde base de datos local
 * 2. Inicializa carrito desde localStorage
 * 3. Configura event listeners para interacciones
 * 4. Maneja navegación entre categorías
 * 5. Gestiona agregar/quitar productos del carrito
 * 6. Persiste cambios en localStorage
 * 7. Actualiza interfaz de usuario en tiempo real
 */
console.log('✅ productos.js cargado correctamente - Sistema de productos y carrito disponible');
