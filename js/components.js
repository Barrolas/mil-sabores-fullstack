// ========================================
// COMPONENTS - Pastelería Mil Sabores
// Carga dinámica de componentes HTML compartidos
// ========================================

/**
 * Carga un componente HTML desde el archivo correspondiente
 * @param {string} componentName - Nombre del componente (sin extensión)
 * @param {string} containerId - ID del contenedor donde insertar el componente
 * @param {object} replacements - Objeto con reemplazos de texto (opcional)
 */
async function loadComponent(componentName, containerId, replacements = {}) {
    try {
        const response = await fetch(`components/${componentName}.html`);
        if (!response.ok) {
            throw new Error(`Error al cargar el componente ${componentName}: ${response.status}`);
        }
        
        let html = await response.text();
        
        // Aplicar reemplazos si se proporcionan
        Object.keys(replacements).forEach(key => {
            const placeholder = `{{${key}}}`;
            html = html.replace(new RegExp(placeholder, 'g'), replacements[key]);
        });
        
        // Insertar el HTML en el contenedor
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
            console.log(`✅ Componente ${componentName} cargado exitosamente en ${containerId}`);
        } else {
            console.error(`❌ Contenedor ${containerId} no encontrado`);
        }
    } catch (error) {
        console.error(`❌ Error al cargar componente ${componentName}:`, error);
    }
}

/**
 * Carga todos los componentes necesarios para las páginas de autenticación
 */
async function loadAuthComponents() {
    // Cargar navbar
    await loadComponent('navbar', 'navbar-container');
    
    // Cargar modal del carrito
    await loadComponent('cart-modal', 'cart-modal-container');
    
    console.log('✅ Todos los componentes de autenticación cargados');
}

/**
 * Carga componentes específicos para la página principal
 */
async function loadMainPageComponents() {
    // Cargar navbar
    await loadComponent('navbar', 'navbar-container');
    
    // Cargar modal del carrito
    await loadComponent('cart-modal', 'cart-modal-container');
    
    console.log('✅ Todos los componentes de la página principal cargados');
}

// Cargar componentes automáticamente cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Detectar el tipo de página y cargar componentes correspondientes
    const body = document.body;
    
    if (body.classList.contains('auth-page')) {
        // Páginas de autenticación (login, registro)
        loadAuthComponents();
    } else if (document.getElementById('navbar-container')) {
        // Página principal u otras páginas
        loadMainPageComponents();
    }
});

console.log('✅ components.js cargado correctamente - Sistema de componentes disponible');
