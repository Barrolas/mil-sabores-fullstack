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
// FUNCIONES DE PRODUCTOS Y CARRITO
// ========================================

// Base de datos completa de productos y categorías
const productosDB = {
    categorias: {
        "tortas-cuadradas": {
            nombre: "Tortas Cuadradas",
            icono: "fas fa-square",
            productos: [
                {
                    id: "TC001",
                    nombre: "Torta Cuadrada de Chocolate",
                    precio: 45000,
                    imagen: "https://via.placeholder.com/300x200/ffb6c1/ffffff?text=Torta+Chocolate",
                    descripcion: "Deliciosa torta de chocolate con relleno de crema y decoración artesanal.",
                    rating: 4.8,
                    reviews: 24,
                    stock: 10,
                    porciones: "8-10 personas",
                    calorias: "350 cal/porción",
                    ingredientes: "Chocolate, harina, huevos, azúcar, mantequilla, crema",
                    reseñas: [
                        { autor: "María González", fecha: "2024-01-15", rating: 5, comentario: "¡Increíble! La mejor torta de chocolate que he probado." },
                        { autor: "Carlos López", fecha: "2024-01-10", rating: 4, comentario: "Muy buena calidad, la recomiendo." },
                        { autor: "Ana Martínez", fecha: "2024-01-08", rating: 5, comentario: "Perfecta para ocasiones especiales." }
                    ]
                },
                {
                    id: "TC002",
                    nombre: "Torta Cuadrada de Frutas",
                    precio: 50000,
                    imagen: "https://via.placeholder.com/300x200/ffc0cb/ffffff?text=Torta+Frutas",
                    descripcion: "Torta fresca con frutas de temporada y crema chantilly.",
                    rating: 4.7,
                    reviews: 19,
                    stock: 8,
                    porciones: "10-12 personas",
                    calorias: "320 cal/porción",
                    ingredientes: "Frutas frescas, crema chantilly, harina, huevos, azúcar",
                    reseñas: [
                        { autor: "Laura Sánchez", fecha: "2024-01-12", rating: 5, comentario: "Muy fresca y deliciosa." },
                        { autor: "Pedro Rodríguez", fecha: "2024-01-09", rating: 4, comentario: "Excelente sabor y presentación." }
                    ]
                }
            ]
        },
        "tortas-circulares": {
            nombre: "Tortas Circulares",
            icono: "fas fa-circle",
            productos: [
                {
                    id: "TT001",
                    nombre: "Torta Circular de Vainilla",
                    precio: 40000,
                    imagen: "https://via.placeholder.com/300x200/ffc0cb/ffffff?text=Torta+Vainilla",
                    descripcion: "Torta tradicional de vainilla con buttercream y frutas frescas.",
                    rating: 4.6,
                    reviews: 18,
                    stock: 12,
                    porciones: "6-8 personas",
                    calorias: "320 cal/porción",
                    ingredientes: "Vainilla, harina, huevos, azúcar, mantequilla, frutas frescas",
                    reseñas: [
                        { autor: "Laura Sánchez", fecha: "2024-01-12", rating: 4, comentario: "Muy rica y fresca." },
                        { autor: "Pedro Rodríguez", fecha: "2024-01-09", rating: 5, comentario: "Excelente sabor y presentación." }
                    ]
                },
                {
                    id: "TT002",
                    nombre: "Torta Circular de Manjar",
                    precio: 42000,
                    imagen: "https://via.placeholder.com/300x200/dda0dd/ffffff?text=Torta+Manjar",
                    descripcion: "Torta circular con manjar casero y decoración elegante.",
                    rating: 4.9,
                    reviews: 31,
                    stock: 9,
                    porciones: "8-10 personas",
                    calorias: "380 cal/porción",
                    ingredientes: "Manjar casero, harina, huevos, azúcar, mantequilla",
                    reseñas: [
                        { autor: "Carmen Díaz", fecha: "2024-01-14", rating: 5, comentario: "Absolutamente deliciosa, muy elegante." },
                        { autor: "Roberto Silva", fecha: "2024-01-11", rating: 5, comentario: "Perfecta para eventos especiales." }
                    ]
                }
            ]
        },
        "postres-individuales": {
            nombre: "Postres Individuales",
            icono: "fas fa-cookie-bite",
            productos: [
                {
                    id: "PI001",
                    nombre: "Mousse de Chocolate",
                    precio: 5000,
                    imagen: "https://via.placeholder.com/300x200/8b4513/ffffff?text=Mousse+Chocolate",
                    descripcion: "Delicioso mousse de chocolate con decoración de frutas.",
                    rating: 4.5,
                    reviews: 12,
                    stock: 25,
                    porciones: "1 persona",
                    calorias: "280 cal/porción",
                    ingredientes: "Chocolate, crema, huevos, azúcar, frutas",
                    reseñas: [
                        { autor: "Isabel Torres", fecha: "2024-01-13", rating: 4, comentario: "Sabor único y muy refrescante." }
                    ]
                },
                {
                    id: "PI002",
                    nombre: "Tiramisú Clásico",
                    precio: 5500,
                    imagen: "https://via.placeholder.com/300x200/654321/ffffff?text=Tiramisu",
                    descripcion: "Tiramisú tradicional italiano con café y mascarpone.",
                    rating: 4.8,
                    reviews: 22,
                    stock: 20,
                    porciones: "1 persona",
                    calorias: "320 cal/porción",
                    ingredientes: "Café, mascarpone, cacao, bizcocho, huevos",
                    reseñas: [
                        { autor: "Fernando Castro", fecha: "2024-01-16", rating: 5, comentario: "Muy buena calidad y sabor." }
                    ]
                }
            ]
        },
        "sin-azucar": {
            nombre: "Productos Sin Azúcar",
            icono: "fas fa-heart",
            productos: [
                {
                    id: "PSA001",
                    nombre: "Torta Sin Azúcar de Naranja",
                    precio: 48000,
                    imagen: "https://via.placeholder.com/300x200/ffa500/ffffff?text=Torta+Naranja",
                    descripcion: "Torta saludable sin azúcar con sabor a naranja natural.",
                    rating: 4.6,
                    reviews: 15,
                    stock: 7,
                    porciones: "8-10 personas",
                    calorias: "250 cal/porción",
                    ingredientes: "Naranja natural, edulcorante, harina integral, huevos",
                    reseñas: [
                        { autor: "María González", fecha: "2024-01-15", rating: 5, comentario: "¡Increíble! La mejor torta de chocolate que he probado." }
                    ]
                },
                {
                    id: "PSA002",
                    nombre: "Cheesecake Sin Azúcar",
                    precio: 47000,
                    imagen: "https://via.placeholder.com/300x200/ffb6c1/ffffff?text=Cheesecake",
                    descripcion: "Cheesecake cremoso sin azúcar con base de galletas integrales.",
                    rating: 4.7,
                    reviews: 18,
                    stock: 6,
                    porciones: "10-12 personas",
                    calorias: "280 cal/porción",
                    ingredientes: "Queso crema, edulcorante, galletas integrales, huevos",
                    reseñas: [
                        { autor: "Carlos López", fecha: "2024-01-10", rating: 4, comentario: "Muy buena calidad, la recomiendo." }
                    ]
                }
            ]
        },
        "tradicional": {
            nombre: "Pastelería Tradicional",
            icono: "fas fa-home",
            productos: [
                {
                    id: "PT001",
                    nombre: "Empanada de Manzana",
                    precio: 3000,
                    imagen: "https://via.placeholder.com/300x200/8b4513/ffffff?text=Empanada+Manzana",
                    descripcion: "Empanada tradicional de manzana con canela y azúcar.",
                    rating: 4.4,
                    reviews: 28,
                    stock: 30,
                    porciones: "1 persona",
                    calorias: "180 cal/porción",
                    ingredientes: "Manzana, canela, azúcar, masa de empanada",
                    reseñas: [
                        { autor: "Ana Martínez", fecha: "2024-01-08", rating: 5, comentario: "Perfecta para ocasiones especiales." }
                    ]
                },
                {
                    id: "PT002",
                    nombre: "Tarta de Santiago",
                    precio: 6000,
                    imagen: "https://via.placeholder.com/300x200/654321/ffffff?text=Tarta+Santiago",
                    descripcion: "Tarta tradicional española con almendras y limón.",
                    rating: 4.8,
                    reviews: 16,
                    stock: 15,
                    porciones: "6-8 personas",
                    calorias: "320 cal/porción",
                    ingredientes: "Almendras, limón, azúcar, harina, huevos",
                    reseñas: [
                        { autor: "Laura Sánchez", fecha: "2024-01-12", rating: 4, comentario: "Muy rica y fresca." }
                    ]
                }
            ]
        },
        "sin-gluten": {
            nombre: "Productos Sin Gluten",
            icono: "fas fa-leaf",
            productos: [
                {
                    id: "PG001",
                    nombre: "Brownie Sin Gluten",
                    precio: 4000,
                    imagen: "https://via.placeholder.com/300x200/8b4513/ffffff?text=Brownie+Sin+Gluten",
                    descripcion: "Brownie delicioso sin gluten con chocolate premium.",
                    rating: 4.5,
                    reviews: 14,
                    stock: 20,
                    porciones: "4-6 personas",
                    calorias: "300 cal/porción",
                    ingredientes: "Chocolate, harina sin gluten, huevos, azúcar, mantequilla",
                    reseñas: [
                        { autor: "Pedro Rodríguez", fecha: "2024-01-09", rating: 5, comentario: "Excelente sabor y presentación." }
                    ]
                },
                {
                    id: "PG002",
                    nombre: "Pan Sin Gluten",
                    precio: 3500,
                    imagen: "https://via.placeholder.com/300x200/daa520/ffffff?text=Pan+Sin+Gluten",
                    descripcion: "Pan artesanal sin gluten con semillas y frutos secos.",
                    rating: 4.3,
                    reviews: 11,
                    stock: 18,
                    porciones: "8-10 rebanadas",
                    calorias: "200 cal/porción",
                    ingredientes: "Harina sin gluten, semillas, frutos secos, levadura",
                    reseñas: [
                        { autor: "Carmen Díaz", fecha: "2024-01-14", rating: 4, comentario: "Absolutamente deliciosa, muy elegante." }
                    ]
                }
            ]
        },
        "vegana": {
            nombre: "Productos Veganos",
            icono: "fas fa-seedling",
            productos: [
                {
                    id: "PV001",
                    nombre: "Torta Vegana de Chocolate",
                    precio: 50000,
                    imagen: "https://via.placeholder.com/300x200/8b4513/ffffff?text=Torta+Vegana",
                    descripcion: "Torta de chocolate 100% vegana con ingredientes naturales.",
                    rating: 4.7,
                    reviews: 20,
                    stock: 8,
                    porciones: "8-10 personas",
                    calorias: "280 cal/porción",
                    ingredientes: "Chocolate vegano, harina, leche de almendras, azúcar de coco",
                    reseñas: [
                        { autor: "Roberto Silva", fecha: "2024-01-11", rating: 5, comentario: "Perfecta para eventos especiales." }
                    ]
                },
                {
                    id: "PV002",
                    nombre: "Galletas Veganas de Avena",
                    precio: 4500,
                    imagen: "https://via.placeholder.com/300x200/daa520/ffffff?text=Galletas+Avena",
                    descripcion: "Galletas saludables de avena con pasas y canela.",
                    rating: 4.4,
                    reviews: 17,
                    stock: 25,
                    porciones: "12 galletas",
                    calorias: "120 cal/porción",
                    ingredientes: "Avena, pasas, canela, aceite de coco, azúcar de coco",
                    reseñas: [
                        { autor: "Isabel Torres", fecha: "2024-01-13", rating: 4, comentario: "Sabor único y muy refrescante." }
                    ]
                }
            ]
        },
        "especiales": {
            nombre: "Tortas Especiales",
            icono: "fas fa-star",
            productos: [
                {
                    id: "TE001",
                    nombre: "Torta Especial de Cumpleaños",
                    precio: 55000,
                    imagen: "https://via.placeholder.com/300x200/ff69b4/ffffff?text=Torta+Cumpleanos",
                    descripcion: "Torta personalizada para cumpleaños con decoración especial.",
                    rating: 4.9,
                    reviews: 35,
                    stock: 5,
                    porciones: "12-15 personas",
                    calorias: "400 cal/porción",
                    ingredientes: "Harina, huevos, azúcar, mantequilla, decoración personalizada",
                    reseñas: [
                        { autor: "Fernando Castro", fecha: "2024-01-16", rating: 5, comentario: "Muy buena calidad y sabor." }
                    ]
                },
                {
                    id: "TE002",
                    nombre: "Torta Especial de Boda",
                    precio: 60000,
                    imagen: "https://via.placeholder.com/300x200/ffb6c1/ffffff?text=Torta+Boda",
                    descripcion: "Torta elegante para bodas con decoración premium.",
                    rating: 5.0,
                    reviews: 42,
                    stock: 3,
                    porciones: "20-25 personas",
                    calorias: "350 cal/porción",
                    ingredientes: "Harina premium, huevos, azúcar, mantequilla, decoración de lujo",
                    reseñas: [
                        { autor: "María González", fecha: "2024-01-15", rating: 5, comentario: "¡Increíble! La mejor torta de chocolate que he probado." }
                    ]
                }
            ]
        }
    }
};

// Función para obtener todos los productos en un formato plano
function getAllProducts() {
    const allProducts = {};
    Object.values(productosDB.categorias).forEach(categoria => {
        categoria.productos.forEach(producto => {
            allProducts[producto.id] = producto;
        });
    });
    return allProducts;
}

// Crear objeto productos para compatibilidad con código existente
const productos = getAllProducts();

// Función para generar HTML de una card de producto
function generateProductCardHTML(producto) {
    const stockBadge = producto.stock <= 5 ? 
        `<div class="product-badge sale">Poco Stock</div>` : 
        (producto.stock > 20 ? `<div class="product-badge new">Disponible</div>` : '');
    
    const ratingStars = Array.from({length: 5}, (_, i) => 
        `<i class="fas fa-star ${i < Math.floor(producto.rating) ? 'text-warning' : 'text-muted'}"></i>`
    ).join('');
    
    return `
        <div class="swiper-slide">
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
                        <span class="h4">$${producto.precio.toLocaleString()}</span>
                        ${producto.stock <= 5 ? `<small class="text-danger ms-2">Solo ${producto.stock} disponibles</small>` : ''}
                    </div>
                    
                    <!-- Selector de cantidad -->
                    <div class="quantity-selector mb-3">
                        <button class="quantity-btn" onclick="changeQuantity('${producto.id}', -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="quantity-input" id="quantity-${producto.id}" value="1" min="1" max="${Math.min(10, producto.stock)}">
                        <button class="quantity-btn" onclick="changeQuantity('${producto.id}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    
                    <div class="mt-auto">
                        <button class="btn btn-primary w-100 mb-2" onclick="addToCart('${producto.id}')" ${producto.stock === 0 ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart me-2"></i>${producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
                        </button>
                        <button class="btn btn-outline-primary w-100" onclick="showProductDetails('${producto.id}')">
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
    const productosHTML = categoria.productos.map(producto => generateProductCardHTML(producto)).join('');
    
    return `
        <div class="tab-pane fade ${categoriaKey === 'tortas-cuadradas' ? 'show active' : ''}" id="${categoriaKey}" role="tabpanel">
            <div class="swiper productosSwiper">
                <div class="swiper-wrapper">
                    ${productosHTML}
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
        </div>
    `;
}

// Función para generar HTML de los tabs de categorías
function generateTabsHTML() {
    return Object.entries(productosDB.categorias).map(([key, categoria]) => 
        `<li class="nav-item" role="presentation">
            <button class="nav-link ${key === 'tortas-cuadradas' ? 'active' : ''}" id="${key}-tab" data-bs-toggle="pill" 
                data-bs-target="#${key}" type="button" role="tab">
                <i class="${categoria.icono} me-2"></i>${categoria.nombre}
            </button>
        </li>`
    ).join('');
}

// Función para generar todo el contenido de productos dinámicamente
function generateProductsContent() {
    const tabsHTML = generateTabsHTML();
    const categoriesHTML = Object.entries(productosDB.categorias).map(([key, categoria]) => 
        generateCategoryHTML(key, categoria)
    ).join('');
    
    return {
        tabs: tabsHTML,
        categories: categoriesHTML
    };
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
        
        // Reinicializar Swiper después de generar el contenido
        setTimeout(() => {
            initializeSwiper();
        }, 100);
    }
}

// Función para mostrar detalles del producto
function showProductDetails(productId) {
    const producto = productos[productId];
    if (!producto) return;

    // Llenar el modal con la información del producto
    document.getElementById('modalProductImage').src = producto.imagen;
    document.getElementById('modalProductTitle').textContent = producto.nombre;
    document.getElementById('modalProductPrice').textContent = `$${producto.precio.toLocaleString()}`;
    document.getElementById('modalProductDescription').textContent = producto.descripcion;
    document.getElementById('modalProductServings').textContent = producto.porciones;
    document.getElementById('modalProductCalories').textContent = producto.calorias;
    document.getElementById('modalProductIngredients').textContent = producto.ingredientes;

    // Mostrar rating
    const ratingHtml = Array.from({length: 5}, (_, i) => 
        `<i class="fas fa-star ${i < producto.rating ? 'text-warning' : 'text-muted'}"></i>`
    ).join('') + ` <span class="ms-1 text-muted">(${producto.reviews} reseñas)</span>`;
    document.getElementById('modalProductRating').innerHTML = ratingHtml;

    // Mostrar reseñas
    const reviewsHtml = producto.reseñas.map(review => `
        <div class="review-item">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                    <div class="review-author">${review.autor}</div>
                    <div class="review-date">${new Date(review.fecha).toLocaleDateString('es-ES')}</div>
                </div>
                <div>
                    ${Array.from({length: 5}, (_, i) => 
                        `<i class="fas fa-star ${i < review.rating ? 'text-warning' : 'text-muted'}"></i>`
                    ).join('')}
                </div>
            </div>
            <p class="mb-0">${review.comentario}</p>
        </div>
    `).join('');
    document.getElementById('modalProductReviews').innerHTML = reviewsHtml;

    // Configurar botón de agregar al carrito
    document.getElementById('modalAddToCart').onclick = () => {
        const quantity = getModalQuantity();
        addToCart(productId, quantity);
    };

    // Actualizar límites del input de cantidad en el modal
    const modalQuantityInput = document.getElementById('modalQuantity');
    if (modalQuantityInput) {
        modalQuantityInput.max = Math.min(10, producto.stock);
        modalQuantityInput.value = 1;
    }

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// Función para cambiar cantidad en cards
function changeQuantity(productId, change) {
    const input = document.getElementById(`quantity-${productId}`);
    if (!input) return;
    
    const producto = productos[productId];
    const maxStock = producto ? Math.min(10, producto.stock) : 10;
    
    let currentValue = parseInt(input.value) || 1;
    let newValue = currentValue + change;
    
    // Limitar entre 1 y el stock disponible
    newValue = Math.max(1, Math.min(maxStock, newValue));
    input.value = newValue;
}

// Función para cambiar cantidad en modal
function changeModalQuantity(change) {
    const input = document.getElementById('modalQuantity');
    if (!input) return;
    
    // Obtener el producto actual del modal
    const modalTitle = document.getElementById('modalProductTitle');
    const currentProduct = modalTitle ? Object.values(productos).find(p => p.nombre === modalTitle.textContent) : null;
    const maxStock = currentProduct ? Math.min(10, currentProduct.stock) : 10;
    
    let currentValue = parseInt(input.value) || 1;
    let newValue = currentValue + change;
    
    // Limitar entre 1 y el stock disponible
    newValue = Math.max(1, Math.min(maxStock, newValue));
    input.value = newValue;
}

// Función para obtener cantidad de un producto
function getProductQuantity(productId) {
    const input = document.getElementById(`quantity-${productId}`);
    return input ? parseInt(input.value) || 1 : 1;
}

// Función para obtener cantidad del modal
function getModalQuantity() {
    const input = document.getElementById('modalQuantity');
    return input ? parseInt(input.value) || 1 : 1;
}

// Función para agregar producto al carrito
function addToCart(productId, quantity = null) {
    const producto = productos[productId];
    if (!producto) return;

    // Obtener cantidad (del modal o de la card)
    const cantidad = quantity || getProductQuantity(productId);

    // Verificar stock disponible
    if (producto.stock === 0) {
        showCartNotification('Este producto no está disponible', 'error');
        return;
    }

    // Verificar si la cantidad solicitada excede el stock
    if (cantidad > producto.stock) {
        showCartNotification(`Solo hay ${producto.stock} unidades disponibles`, 'warning');
        return;
    }

    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Verificar si la cantidad total excede el stock
        if (existingItem.cantidad + cantidad > producto.stock) {
            showCartNotification(`Solo puedes agregar ${producto.stock - existingItem.cantidad} unidades más`, 'warning');
            return;
        }
        // Si ya existe, actualizar la cantidad
        existingItem.cantidad += cantidad;
    } else {
        // Si no existe, agregarlo al carrito
        cart.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }

    // Mostrar notificación
    const message = cantidad > 1 ? 
        `${cantidad} unidades de ${producto.nombre} agregadas al carrito` : 
        `${producto.nombre} agregado al carrito`;
    showCartNotification(message);
    
    // Actualizar contador del carrito
    updateCartCounter();
}

// Función para mostrar notificación de carrito
function showCartNotification(message, type = 'success') {
    // Determinar clase CSS según el tipo
    let bgClass, iconClass;
    switch(type) {
        case 'error':
            bgClass = 'bg-danger';
            iconClass = 'fas fa-exclamation-circle';
            break;
        case 'warning':
            bgClass = 'bg-warning';
            iconClass = 'fas fa-exclamation-triangle';
            break;
        default:
            bgClass = 'bg-success';
            iconClass = 'fas fa-check-circle';
    }

    // Crear notificación toast
    const toastHtml = `
        <div class="toast align-items-center text-white ${bgClass} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="${iconClass} me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;

    // Crear contenedor de toasts si no existe
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }

    // Agregar toast
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    // Mostrar toast
    const toastElement = toastContainer.lastElementChild;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    // Remover toast después de que se oculte
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

// Función para actualizar contador del carrito
function updateCartCounter() {
    const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    // Actualizar texto del carrito en el navbar
    const cartElements = document.querySelectorAll('.text-dark.fw-medium');
    cartElements.forEach(element => {
        if (element.textContent.includes('Carrito')) {
            element.textContent = `Carrito $${totalPrice.toLocaleString()}`;
        }
    });
    
    // Mostrar información del carrito en consola para debug
    console.log('Carrito actualizado:', {
        totalItems,
        totalPrice,
        items: cart
    });
}

// Función para inicializar Swiper
function initializeSwiper() {
    const swipers = document.querySelectorAll('.productosSwiper');
    
    swipers.forEach(swiperElement => {
        new Swiper(swiperElement, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            },
        });
    });
}

// Función para manejar navegación desde navbar
function handleProductNavigation() {
    const dropdownItems = document.querySelectorAll('[data-category]');
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            // Si estamos en otra página, redirigir a index.html
            if (window.location.pathname !== '/index.html' && !window.location.pathname.endsWith('/')) {
                window.location.href = `index.html#${category}`;
                return;
            }
            
            // Scroll suave a la sección de productos
            const productosSection = document.getElementById('productos');
            if (productosSection) {
                productosSection.scrollIntoView({ behavior: 'smooth' });
                
                // Activar el tab correspondiente después de un pequeño delay
                setTimeout(() => {
                    const tabButton = document.getElementById(`${category}-tab`);
                    if (tabButton) {
                        tabButton.click();
                    }
                }, 500);
            }
        });
    });
}

// Función para manejar hash en URL
function handleUrlHash() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(`${hash}-tab`)) {
        setTimeout(() => {
            const tabButton = document.getElementById(`${hash}-tab`);
            if (tabButton) {
                tabButton.click();
            }
        }, 1000);
    }
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

    // Inicializar funcionalidades de productos (solo en index.html)
    if (document.getElementById('productos')) {
        initializeDynamicProducts();
        handleProductNavigation();
        handleUrlHash();
    }
});

