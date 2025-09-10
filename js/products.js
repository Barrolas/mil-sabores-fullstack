// ========================================
//   SISTEMA DE PRODUCTOS - MIL SABORES
// ========================================

// Base de datos de productos y categorías
const productosDB = {
    categorias: {
        "tortas-cuadradas": {
            nombre: "Tortas Cuadradas",
            icono: "fas fa-square",
            productos: [
                {
                    id: "TC001",
                    nombre: "Torta Cuadrada de Chocolate",
                    precio: 22990,
                    imagen: "https://delicakesysnacks.com/wp-content/uploads/2025/01/vitxekmdoeio3sgmh5dr-1.webp",
                    descripcion: "Deliciosa torta de chocolate con relleno de crema.",
                    descripcionDetallada: "Exquisita torta de chocolate premium elaborada con los mejores ingredientes. Capas de bizcocho de chocolate esponjoso, relleno de crema de chocolate belga y decoración artesanal con virutas de chocolate. Perfecta para celebraciones especiales, cumpleaños y eventos importantes. Cada bocado es una experiencia de sabor inolvidable.",
                    rating: 4.8,
                    reviews: 24,
                    stock: 15,
                    porciones: "10-15 personas",
                    calorias: "350 cal/porción",
                    ingredientes: "Chocolate premium, harina, huevos, azúcar, mantequilla, crema de leche, cacao en polvo",
                    reseñas: [
                        { autor: "María González", fecha: "2024-01-15", rating: 5, comentario: "¡Increíble! La mejor torta de chocolate que he probado." },
                        { autor: "Carlos López", fecha: "2024-01-10", rating: 4, comentario: "Muy buena calidad, la recomiendo." },
                        { autor: "Ana Martínez", fecha: "2024-01-08", rating: 5, comentario: "Perfecta para ocasiones especiales." }
                    ]
                },
                {
                    id: "TC002",
                    nombre: "Torta Cuadrada de Frutas",
                    precio: 22990,
                    imagen: "https://thumbs.dreamstime.com/b/este-delicioso-pastel-de-fruta-cuadrada-con-capas-esponja-ligera-y-crema-delicada-adornado-generosidad-est%C3%A1-decorado-una-gran-398214730.jpg",
                    descripcion: "Torta fresca con frutas de temporada y crema chantilly.",
                    descripcionDetallada: "Hermosa torta cuadrada decorada con una selección de frutas frescas de temporada como fresas, kiwis, duraznos y arándanos. Base de bizcocho esponjoso de vainilla, relleno de crema chantilly casera y decoración artesanal con frutas frescas. Perfecta para celebraciones de verano, cumpleaños y eventos al aire libre. Cada porción es una explosión de sabores frescos y naturales.",
                    rating: 4.7,
                    reviews: 19,
                    stock: 7,
                    porciones: "10-15 personas",
                    calorias: "320 cal/porción",
                    ingredientes: "Frutas frescas de temporada, crema chantilly, harina, huevos, azúcar, vainilla, gelatina",
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
                    precio: 18990,
                    imagen: "https://wiltonenespanol.com/wp-content/uploads/2017/02/pastel-de-vainilla.jpg",
                    descripcion: "Torta tradicional de vainilla con buttercream y frutas frescas.",
                    descripcionDetallada: "Clásica torta circular de vainilla, elaborada con extracto de vainilla natural y decorada con buttercream suave. Capas de bizcocho esponjoso de vainilla, relleno de crema de vainilla y decoración elegante con frutas frescas de temporada. Un postre atemporal que nunca pasa de moda, perfecto para cualquier celebración.",
                    rating: 4.6,
                    reviews: 18,
                    stock: 25,
                    porciones: "8-10 personas",
                    calorias: "320 cal/porción",
                    ingredientes: "Vainilla natural, harina, huevos, azúcar, mantequilla, frutas frescas",
                    reseñas: [
                        { autor: "Laura Sánchez", fecha: "2024-01-12", rating: 4, comentario: "Muy rica y fresca." },
                        { autor: "Pedro Rodríguez", fecha: "2024-01-09", rating: 5, comentario: "Excelente sabor y presentación." }
                    ]
                },
                {
                    id: "TT002",
                    nombre: "Torta Circular de Manjar",
                    precio: 15990,
                    imagen: "https://www.elingenio.cl/productos/bizcocho-manjar-lucuma.jpg",
                    descripcion: "Torta circular con manjar casero y decoración elegante.",
                    descripcionDetallada: "Exquisita torta circular de manjar casero, elaborada con la receta tradicional chilena. Capas de bizcocho esponjoso, relleno generoso de manjar casero y decoración elegante con nueces y almendras. Un clásico de la repostería chilena que evoca los sabores de la infancia. Perfecta para celebraciones familiares y ocasiones especiales.",
                    rating: 4.9,
                    reviews: 31,
                    stock: 1,
                    porciones: "8-10 personas",
                    calorias: "380 cal/porción",
                    ingredientes: "Manjar casero, harina, huevos, azúcar, mantequilla, nueces, almendras",
                    reseñas: [
                        { autor: "Carmen Díaz", fecha: "2024-01-14", rating: 5, comentario: "Absolutamente deliciosa, muy elegante." },
                        { autor: "Roberto Silva", fecha: "2024-01-11", rating: 5, comentario: "Perfecta para eventos especiales." }
                    ]
                },
                {
                    id: "TT003",
                    nombre: "Torta Circular de Frutilla",
                    precio: 19990,
                    imagen: "https://www.annarecetasfaciles.com/files/tarta-de-fresas-y-nata-3.jpg",
                    descripcion: "Torta circular de frutillas frescas con crema chantilly.",
                    descripcionDetallada: "Deliciosa torta circular de frutillas frescas, elaborada con las mejores frutillas de temporada. Base de bizcocho esponjoso de vainilla, relleno de crema chantilly casera y decorada con frutillas frescas enteras y en rodajas. Un postre fresco y elegante que combina la dulzura natural de las frutillas con la suavidad de la crema. Perfecta para celebraciones de primavera y verano, cumpleaños y eventos especiales.",
                    rating: 4.7,
                    reviews: 28,
                    stock: 12,
                    porciones: "15 personas",
                    featured: true,
                    calorias: "320 cal/porción",
                    ingredientes: "Frutillas frescas, crema chantilly, harina, huevos, azúcar, vainilla, gelatina",
                    reseñas: [
                        { autor: "María González", fecha: "2024-01-15", rating: 5, comentario: "¡Increíble! Las frutillas están perfectas." },
                        { autor: "Carlos López", fecha: "2024-01-12", rating: 4, comentario: "Muy fresca y deliciosa, perfecta para el verano." },
                        { autor: "Ana Martínez", fecha: "2024-01-10", rating: 5, comentario: "La mejor torta de frutillas que he probado." }
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
                    precio: 2990,
                    imagen: "https://images.aws.nestle.recipes/original/2024_10_18T11_53_16_badun_images.badun.es_4ed41e942636_mousse_de_chocolate_intenso.jpg",
                    descripcion: "Delicioso mousse de chocolate con decoración de frutas.",
                    descripcionDetallada: "Exquisito mousse de chocolate intenso, elaborado con chocolate premium y crema fresca. Textura suave y aterciopelada que se derrite en el paladar. Decorado con frutas frescas de temporada y virutas de chocolate. Perfecto como postre individual o para compartir en ocasiones especiales. Una experiencia de sabor que deleitará a los amantes del chocolate.",
                    rating: 4.5,
                    reviews: 12,
                    stock: 30,
                    porciones: "1 persona",
                    featured: true,
                    calorias: "280 cal/porción",
                    ingredientes: "Chocolate premium, crema de leche, huevos, azúcar, frutas frescas",
                    reseñas: [
                        { autor: "Isabel Torres", fecha: "2024-01-13", rating: 4, comentario: "Sabor único y muy refrescante." }
                    ]
                },
                {
                    id: "PI002",
                    nombre: "Tiramisú Clásico",
                    precio: 3990,
                    imagen: "https://www.kingarthurbaking.com/sites/default/files/2023-03/Tiramisu_1426.jpg",
                    descripcion: "Tiramisú tradicional italiano con café y mascarpone.",
                    descripcionDetallada: "Auténtico tiramisú italiano, elaborado siguiendo la receta tradicional. Capas de bizcocho savoiardi empapado en café espresso, crema de mascarpone suave y espolvoreado con cacao en polvo. Un postre elegante y sofisticado que transporta a las cafeterías de Italia. Perfecto para los amantes del café y la repostería italiana.",
                    rating: 4.8,
                    reviews: 22,
                    stock: 5,
                    porciones: "1 persona",
                    calorias: "320 cal/porción",
                    ingredientes: "Café espresso, mascarpone, cacao en polvo, bizcocho savoiardi, huevos, azúcar",
                    reseñas: [
                        { autor: "Fernando Castro", fecha: "2024-01-16", rating: 5, comentario: "Muy buena calidad y sabor." }
                    ]
                }
            ]
        },
        "productos-sin-azucar": {
            nombre: "Productos Sin Azúcar",
            icono: "fas fa-heart",
            productos: [
                {
                    id: "PSA001",
                    nombre: "Torta Sin Azúcar de Naranja",
                    precio: 19990,
                    imagen: "https://santaisabel.vtexassets.com/arquivos/ids/447848-900-900?width=900&height=900&aspect=true",
                    descripcion: "Torta saludable sin azúcar con sabor a naranja natural.",
                    descripcionDetallada: "Deliciosa torta de naranja sin azúcar, elaborada con naranjas frescas y edulcorantes naturales. Perfecta para personas con diabetes o que buscan opciones más saludables. Base de bizcocho esponjoso de naranja, relleno de crema de naranja natural y decoración con gajos de naranja fresca. Un postre refrescante y saludable que no compromete el sabor.",
                    rating: 4.6,
                    reviews: 15,
                    stock: 35,
                    porciones: "8-10 personas",
                    calorias: "250 cal/porción",
                    ingredientes: "Naranja natural, edulcorante stevia, harina integral, huevos, aceite de oliva",
                    reseñas: [
                        { autor: "María González", fecha: "2024-01-15", rating: 5, comentario: "¡Increíble! La mejor torta de chocolate que he probado." }
                    ]
                },
                {
                    id: "PSA002",
                    nombre: "Cheesecake de Maracuyá Sin Azúcar",
                    precio: 12990,
                    imagen: "https://bechef.cl/wp-content/uploads/2022/02/CCMM-1.png",
                    descripcion: "Cheesecake de maracuyá sin azúcar, saludable y delicioso.",
                    descripcionDetallada: "Delicioso cheesecake de maracuyá sin azúcar, perfecto para quienes buscan un postre saludable sin comprometer el sabor. Elaborado con edulcorantes naturales como stevia y la frescura única del maracuyá natural. Base de galletas integrales sin azúcar, crema de queso suave y topping de maracuyá fresco. Ideal para personas con diabetes, dietas bajas en carbohidratos o simplemente para quienes prefieren opciones más saludables sin sacrificar el sabor.",
                    rating: 4.8,
                    reviews: 22,
                    stock: 4,
                    porciones: "8 personas",
                    featured: true,
                    calorias: "220 cal/porción",
                    ingredientes: "Queso crema, maracuyá natural, edulcorante stevia, galletas integrales sin azúcar, huevos, gelatina sin sabor",
                    reseñas: [
                        { autor: "Carlos López", fecha: "2024-01-10", rating: 5, comentario: "¡Increíble! No se nota que no tiene azúcar. El sabor del maracuyá es perfecto." },
                        { autor: "María Fernández", fecha: "2024-01-08", rating: 4, comentario: "Muy rico y saludable. Perfecto para mi dieta." },
                        { autor: "Ana Martínez", fecha: "2024-01-08", rating: 5, comentario: "Perfecta para ocasiones especiales." }
                    ]
                }
            ]
        },
        "pasteleria-tradicional": {
            nombre: "Pastelería Tradicional",
            icono: "fas fa-home",
            productos: [
                {
                    id: "PT001",
                    nombre: "Empanada de Manzana",
                    precio: 1890,
                    imagen: "https://cocinachilena.cl/wp-content/uploads/2012/11/empanadas-manzana-3-scaled.jpg",
                    descripcion: "Empanada tradicional de manzana con canela y azúcar.",
                    descripcionDetallada: "Deliciosa empanada de manzana casera, elaborada con masa fresca y relleno de manzanas cortadas en cubos con canela, azúcar y un toque de limón. Horneada hasta obtener una textura dorada y crujiente. Un clásico de la repostería chilena que combina perfectamente con una taza de té o café. Ideal para la hora del té o como postre ligero.",
                    rating: 4.4,
                    reviews: 28,
                    stock: 30,
                    porciones: "1 persona",
                    calorias: "180 cal/porción",
                    ingredientes: "Manzana, canela, azúcar, masa de empanada, limón, mantequilla",
                    reseñas: [
                        { autor: "Ana Martínez", fecha: "2024-01-08", rating: 5, comentario: "Perfecta para ocasiones especiales." }
                    ]
                },
                {
                    id: "PT002",
                    nombre: "Tarta de Santiago",
                    precio: 11990,
                    imagen: "https://recetasdecocina.elmundo.es/wp-content/uploads/2025/03/tarta-de-santiago.jpg",
                    descripcion: "Tarta tradicional española con almendras y limón.",
                    descripcionDetallada: "Auténtica Tarta de Santiago, el postre más emblemático de Galicia. Elaborada con almendras molidas, huevos, azúcar y un toque de limón. Decorada con la cruz de Santiago en azúcar glass. Una tarta sin harina, perfecta para celíacos, con una textura húmeda y un sabor intenso a almendras. Un clásico de la repostería española que conquista paladares.",
                    rating: 4.8,
                    reviews: 16,
                    stock: 18,
                    porciones: "6-8 personas",
                    calorias: "320 cal/porción",
                    ingredientes: "Almendras molidas, limón, azúcar, huevos, azúcar glass",
                    reseñas: [
                        { autor: "Laura Sánchez", fecha: "2024-01-12", rating: 4, comentario: "Muy rica y fresca." }
                    ]
                }
            ]
        },
        "productos-sin-gluten": {
            nombre: "Productos Sin Gluten",
            icono: "fas fa-leaf",
            productos: [
                {
                    id: "PG001",
                    nombre: "Brownie Sin Gluten",
                    precio: 2990,
                    imagen: "https://www.justspices.es/media/recipe/brownie-chocolate.jpg",
                    descripcion: "Brownie delicioso sin gluten con chocolate premium.",
                    descripcionDetallada: "Exquisito brownie sin gluten elaborado con chocolate premium y harina de arroz. Textura húmeda y densa en el centro, con una corteza crujiente en la superficie. Perfecto para personas celíacas o que siguen una dieta sin gluten. Decorado con nueces y chips de chocolate. Un postre que no compromete el sabor ni la textura tradicional del brownie.",
                    rating: 4.5,
                    reviews: 14,
                    stock: 8,
                    porciones: "4-6 personas",
                    calorias: "300 cal/porción",
                    ingredientes: "Chocolate premium, harina de arroz, huevos, azúcar, mantequilla, nueces",
                    reseñas: [
                        { autor: "Pedro Rodríguez", fecha: "2024-01-09", rating: 5, comentario: "Excelente sabor y presentación." }
                    ]
                },
                {
                    id: "PG002",
                    nombre: "Pan Sin Gluten",
                    precio: 3590,
                    imagen: "https://imag.bonviveur.com/pan-sin-gluten.jpg",
                    descripcion: "Pan artesanal sin gluten con semillas y frutos secos.",
                    descripcionDetallada: "Pan artesanal sin gluten elaborado con una mezcla de harinas especiales, semillas de girasol, chía y sésamo, además de frutos secos como nueces y almendras. Textura esponjosa y sabor natural. Perfecto para el desayuno o acompañar cualquier comida. Ideal para personas celíacas o que buscan opciones más saludables sin comprometer el sabor.",
                    rating: 4.3,
                    reviews: 11,
                    stock: 22,
                    porciones: "8-10 rebanadas",
                    calorias: "200 cal/porción",
                    ingredientes: "Harina sin gluten, semillas de girasol, chía, sésamo, nueces, almendras, levadura",
                    reseñas: [
                        { autor: "Carmen Díaz", fecha: "2024-01-14", rating: 4, comentario: "Absolutamente deliciosa, muy elegante." }
                    ]
                }
            ]
        },
        "productos-veganos": {
            nombre: "Productos Veganos",
            icono: "fas fa-seedling",
            productos: [
                {
                    id: "PV001",
                    nombre: "Torta Vegana de Chocolate",
                    precio: 22990,
                    imagen: "https://www.lagloriavegana.com/wp-content/uploads/2020/08/Bizcocho-muerte-por-chocolate-1280x1280.jpg",
                    descripcion: "Torta de chocolate 100% vegana con ingredientes naturales.",
                    descripcionDetallada: "Exquisita torta de chocolate 100% vegana, elaborada sin productos de origen animal. Utiliza chocolate vegano, leche de almendras, azúcar de coco y harina integral. Decorada con crema de coco y frutas frescas. Perfecta para veganos, vegetarianos o cualquier persona que busque opciones más saludables y sostenibles sin comprometer el sabor delicioso del chocolate.",
                    rating: 4.7,
                    reviews: 20,
                    stock: 6,
                    porciones: "8-10 personas",
                    calorias: "280 cal/porción",
                    ingredientes: "Chocolate vegano, harina integral, leche de almendras, azúcar de coco, aceite de coco",
                    reseñas: [
                        { autor: "Roberto Silva", fecha: "2024-01-11", rating: 5, comentario: "Perfecta para eventos especiales." }
                    ]
                },
                {
                    id: "PV002",
                    nombre: "Galletas Veganas de Avena",
                    precio: 890,
                    imagen: "https://luciacomparada.com/wp-content/uploads/2024/01/galletas-de-avena-veganas-05.jpg",
                    descripcion: "Galletas saludables de avena con pasas y canela.",
                    descripcionDetallada: "Deliciosas galletas veganas de avena, elaboradas con avena integral, pasas, canela y endulzadas con azúcar de coco. Sin huevos, leche ni mantequilla. Perfectas para el desayuno, merienda o como snack saludable. Textura crujiente por fuera y suave por dentro. Ideales para veganos, vegetarianos o cualquier persona que busque opciones más saludables y nutritivas.",
                    rating: 4.4,
                    reviews: 17,
                    stock: 40,
                    porciones: "12 galletas",
                    featured: true,
                    calorias: "120 cal/porción",
                    ingredientes: "Avena integral, pasas, canela, aceite de coco, azúcar de coco, harina de avena",
                    reseñas: [
                        { autor: "Isabel Torres", fecha: "2024-01-13", rating: 4, comentario: "Sabor único y muy refrescante." }
                    ]
                }
            ]
        },
        "tortas-especiales": {
            nombre: "Tortas Especiales",
            icono: "fas fa-star",
            productos: [
                {
                    id: "TE001",
                    nombre: "Torta Especial de Cumpleaños",
                    precio: 29990,
                    imagen: "assets/images/torta-cumpleaños.webp",
                    descripcion: "Torta personalizada para cumpleaños con decoración especial.",
                    descripcionDetallada: "Torta especial de cumpleaños personalizada según tus gustos y preferencias. Elaborada con los mejores ingredientes y decorada con crema, frutas frescas, chocolates y elementos decorativos temáticos. Perfecta para hacer de tu cumpleaños un día inolvidable. Incluye decoración personalizada con el nombre del cumpleañero y velas. Una experiencia única que combina sabor excepcional con presentación espectacular.",
                    rating: 4.9,
                    reviews: 35,
                    stock: 3,
                    porciones: "12-15 personas",
                    featured: true,
                    calorias: "400 cal/porción",
                    ingredientes: "Harina premium, huevos frescos, azúcar, mantequilla, crema chantilly, frutas frescas, chocolates, decoración personalizada",
                    reseñas: [
                        { autor: "Fernando Castro", fecha: "2024-01-16", rating: 5, comentario: "Muy buena calidad y sabor." }
                    ]
                },
                {
                    id: "TE002",
                    nombre: "Torta Especial de Boda",
                    precio: 79990,
                    imagen: "https://bodasyweddings.com/wp-content/uploads/2015/04/Si-prefieres-un-diseno-simple-hazlo-inolvidable.jpg",
                    descripcion: "Torta elegante para bodas con decoración premium.",
                    descripcionDetallada: "Exquisita torta de boda elaborada con la máxima elegancia y sofisticación. Diseño personalizado según el estilo de la boda, con decoración artesanal que incluye flores comestibles, detalles en fondant y acabados de lujo. Perfecta para hacer de tu día especial un momento inolvidable. Cada detalle está cuidadosamente elaborado para crear una obra de arte comestible que refleje la personalidad de los novios.",
                    rating: 5.0,
                    reviews: 42,
                    stock: 2,
                    porciones: "20-25 personas",
                    featured: true,
                    calorias: "350 cal/porción",
                    ingredientes: "Harina premium, huevos frescos, azúcar, mantequilla, crema chantilly, fondant, flores comestibles, decoración artesanal",
                    reseñas: [
                        { autor: "María González", fecha: "2024-01-15", rating: 5, comentario: "¡Increíble! La mejor torta de bodas que he probado." }
                    ]
                }
            ]
        }
    }
};

// ========================================
//   FUNCIONES DE PRODUCTOS
// ========================================

// Variables globales para filtros
let filtroPrecioActivo = false;
let precioMinimo = 0;
let precioMaximo = 999999;

// Función para obtener todos los productos en un objeto plano
function getAllProducts() {
    const productos = {};
    Object.values(productosDB.categorias).forEach(categoria => {
        categoria.productos.forEach(producto => {
            productos[producto.id] = producto;
        });
    });
    return productos;
}

// Función para obtener un producto por ID
function getProductById(id) {
    return getAllProducts()[id];
}

// Función para obtener productos por categoría
function getProductsByCategory(categoryKey) {
    return productosDB.categorias[categoryKey]?.productos || [];
}

// Función para obtener todas las categorías
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
                    
                    <!-- Selector de cantidad -->
                    <div class="quantity-selector mb-3">
                        <button class="quantity-btn" onclick="changeQuantity('${producto.id}', -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="quantity-input" id="quantity-${producto.id}" value="1" min="1" max="${producto.stock}">
                        <button class="quantity-btn" onclick="changeQuantity('${producto.id}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    
                    <!-- Botones de acción -->
                    <div class="mt-auto">
                        <button class="btn btn-primary w-100 mb-2" onclick="addToCart('${producto.id}')">
                            <i class="fas fa-shopping-cart me-2"></i>Agregar al Carrito
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

// Función para generar HTML de los tabs de categorías
function generateTabsHTML() {
    // Tab "Todos los Productos" primero
    const todosTab = `<li class="nav-item" role="presentation">
        <button class="nav-link active" id="todos-tab" data-bs-toggle="pill" 
            data-bs-target="#todos" type="button" role="tab">
            <i class="fas fa-th-large me-2"></i>Todos los Productos
        </button>
    </li>`;
    
    // Tabs de categorías individuales
    const categoriasTabs = Object.entries(productosDB.categorias).map(([key, categoria]) => 
        `<li class="nav-item" role="presentation">
            <button class="nav-link" id="${key}-tab" data-bs-toggle="pill" 
                data-bs-target="#${key}" type="button" role="tab">
                <i class="${categoria.icono} me-2"></i>${categoria.nombre}
            </button>
        </li>`
    ).join('');
    
    return todosTab + categoriasTabs;
}

// Función para generar HTML del tab "Todos los Productos"
function generateTodosHTML() {
    // Obtener todos los productos de todas las categorías
    const todosProductos = [];
    Object.values(productosDB.categorias).forEach(categoria => {
        todosProductos.push(...categoria.productos);
    });
    
    // Aplicar filtro de precios
    const productosFiltrados = filtrarProductosPorPrecio(todosProductos);
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
        <div class="tab-pane fade show active" id="todos" role="tabpanel">
            ${contenidoHTML}
        </div>
    `;
}

// Función para generar todo el contenido de productos dinámicamente
function generateProductsContent() {
    const tabsHTML = generateTabsHTML();
    const todosHTML = generateTodosHTML();
    const categoriesHTML = Object.entries(productosDB.categorias).map(([key, categoria]) => 
        generateCategoryHTML(key, categoria)
    ).join('');
    
    return {
        tabs: tabsHTML,
        categories: todosHTML + categoriesHTML
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
    }
}

// Función para mostrar detalles del producto en modal
function showProductDetails(productId) {
    const producto = getProductById(productId);
    if (!producto) return;

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

// Inicializar productos cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Solo inicializar si estamos en la página de productos
    if (document.getElementById('productos')) {
        initializeDynamicProducts();
        handleUrlHash();
    }
});
