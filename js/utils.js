// Pastelería Mil Sabores - JavaScript Global

// Variables globales
let cart = [];

// ========================================
// FUNCIONES DE LOGIN
// ========================================

// Función para validar formulario de login
function validateLoginForm() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let isValid = true;

    // Limpiar validaciones anteriores
    email.classList.remove('is-invalid', 'is-valid');
    password.classList.remove('is-invalid', 'is-valid');

    // Validar email
    if (!email.value.trim()) {
        email.classList.add('is-invalid');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.add('is-valid');
    }

    // Validar contraseña (criterio más simple para login)
    if (!password.value.trim()) {
        password.classList.add('is-invalid');
        isValid = false;
    } else if (password.value.length < 6) {
        password.classList.add('is-invalid');
        isValid = false;
    } else {
        password.classList.add('is-valid');
    }

    return isValid;
}

// Función para manejar el login
function handleLogin() {
    if (!validateLoginForm()) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, completa todos los campos correctamente.',
            icon: 'error',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('loginBtn');

    // Mostrar estado de carga
    loginBtn.classList.add('btn-loading');
    loginBtn.disabled = true;

    // Simular proceso de login
    setTimeout(() => {
        // Simular login exitoso (sin validación real)
        Swal.fire({
            title: '¡Sesión Iniciada!',
            text: 'Has iniciado sesión correctamente. Bienvenido a Mil Sabores.',
            icon: 'success',
            confirmButtonText: 'Continuar',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then((result) => {
            // Guardar sesión usando función de auth.js
            saveUserSession(email);
            
            // Redirigir a index
            window.location.href = 'index.html';
        });
        
        // Redirigir automáticamente después de 2 segundos si no se hace clic
        setTimeout(() => {
            saveUserSession(email);
            window.location.href = 'index.html';
        }, 2000);

        // Restaurar botón
        loginBtn.classList.remove('btn-loading');
        loginBtn.disabled = false;
    }, 1500);
}

// Función para manejar "Olvidé mi contraseña"
function handleForgotPassword() {
    const email = document.getElementById('email').value;
    
    if (!email || !validateEmail(email)) {
        showAlert('Por favor, ingresa un email válido primero.', 'warning');
        return;
    }

    showAlert(`Se ha enviado un enlace de recuperación a ${email}`, 'info');
}

// ========================================
// FUNCIONES DE CARRITO
// ========================================

// Función para agregar producto al carrito
function addToCart(productId, quantity = null) {
    const producto = getProductById(productId);
    if (!producto) return;

    const cantidad = quantity || parseInt(document.getElementById(`quantity-${productId}`).value) || 1;
    
    // Validar stock
    if (producto.stock === 0) {
        showCartNotification('Este producto no está disponible', 'error');
        return;
    }
    
    if (cantidad > producto.stock) {
        showCartNotification(`Solo hay ${producto.stock} unidades disponibles`, 'error');
        return;
    }

    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Verificar si al agregar más cantidad no excede el stock
        if (existingItem.cantidad + cantidad > producto.stock) {
            showCartNotification(`Solo puedes agregar ${producto.stock - existingItem.cantidad} unidades más`, 'warning');
            return;
        }
        existingItem.cantidad += cantidad;
    } else {
        cart.push({
            id: productId,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad,
            imagen: producto.imagen
        });
    }

    updateCartCounter();
    showCartNotification(`${producto.nombre} agregado al carrito`, 'success');
}

// Función para mostrar notificación del carrito
function showCartNotification(message, type = 'success') {
    // Crear toast si no existe
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
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

// Función para cambiar cantidad de un producto
function changeQuantity(productId, change) {
    const input = document.getElementById(`quantity-${productId}`);
    const producto = getProductById(productId);
    if (!input || !producto) return;

    let newValue = parseInt(input.value) + change;
    newValue = Math.max(1, Math.min(newValue, producto.stock));
    input.value = newValue;
}

// Función para cambiar cantidad en el modal
function changeModalQuantity(change) {
    const input = document.getElementById('modalQuantity');
    const modalTitle = document.getElementById('modalProductTitle');
    if (!input || !modalTitle) return;

    // Obtener el producto actual del modal
    const currentProduct = getProductById(modalTitle.textContent);
    if (!currentProduct) return;

    let newValue = parseInt(input.value) + change;
    newValue = Math.max(1, Math.min(newValue, currentProduct.stock));
    input.value = newValue;
}

// Función para actualizar contador del carrito
function updateCartCounter() {
    const counter = document.getElementById('cartCounter');
    if (counter) {
        const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        
        counter.textContent = totalItems;
        counter.style.display = totalItems > 0 ? 'block' : 'none';
        
        // Actualizar precio total si existe el elemento
        const priceElement = document.getElementById('cartTotalPrice');
        if (priceElement) {
            priceElement.textContent = `$${totalPrice.toLocaleString('es-CL')}`;
        }
    }
}

// ========================================
// FUNCIONES DE NAVEGACIÓN
// ========================================

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
// INICIALIZACIÓN
// ========================================

// Inicializar cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar contador del carrito
    updateCartCounter();
    
    // Manejar hash de URL
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
    
    // Configurar eventos de autenticación usando auth.js
    setupPasswordToggles();
    setupDateInputs();
});