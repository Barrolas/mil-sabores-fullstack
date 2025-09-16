
// Array que contiene los productos en el carrito
let cart = [];

// ID del producto actualmente mostrado en el modal de detalles
let currentModalProductId = null;

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

console.log('🚀 productos.js cargado correctamente');

// Base de datos de productos embebida directamente en el JavaScript
let productosDB = 
{
    "categorias": {
        "tortas-cuadradas": {
            "nombre": "Tortas Cuadradas",
            "icono": "fas fa-square",
            "productos": [
                {
                    "id": "TC001",
                    "nombre": "Torta Cuadrada de Chocolate",
                    "precio": 45990,
                    "imagen": "https://delicakesysnacks.com/wp-content/uploads/2025/01/vitxekmdoeio3sgmh5dr-1.webp",
                    "descripcion": "Deliciosa torta de chocolate con relleno de crema.",
                    "descripcionDetallada": "Exquisita torta de chocolate premium elaborada con los mejores ingredientes. Capas de bizcocho de chocolate esponjoso, relleno de crema de chocolate belga y decoración artesanal con virutas de chocolate. Perfecta para celebraciones especiales, cumpleaños y eventos importantes. Cada bocado es una experiencia de sabor inolvidable.",
                    "rating": 4.8,
                    "reviews": 24,
                    "porciones": "10-15 personas",
                    "calorias": "350 cal/porción",
                    "ingredientes": "Chocolate premium, harina, huevos, azúcar, mantequilla, crema de leche, cacao en polvo",
                    "reseñas": [
                        { "autor": "María González", "fecha": "2024-01-15", "rating": 5, "comentario": "¡Increíble! La mejor torta de chocolate que he probado." },
                        { "autor": "Carlos López", "fecha": "2024-01-10", "rating": 4, "comentario": "Muy buena calidad, la recomiendo." },
                        { "autor": "Ana Martínez", "fecha": "2024-01-08", "rating": 5, "comentario": "Perfecta para ocasiones especiales." }
                    ]
                },
                {
                    "id": "TC002",
                    "nombre": "Torta Cuadrada de Frutas",
                    "precio": 22990,
                    "imagen": "https://thumbs.dreamstime.com/b/este-delicioso-pastel-de-fruta-cuadrada-con-capas-esponja-ligera-y-crema-delicada-adornado-generosidad-est%C3%A1-decorado-una-gran-398214730.jpg",
                    "descripcion": "Torta fresca con frutas de temporada y crema chantilly.",
                    "descripcionDetallada": "Hermosa torta cuadrada decorada con una selección de frutas frescas de temporada como fresas, kiwis, duraznos y arándanos. Base de bizcocho esponjoso de vainilla, relleno de crema chantilly casera y decoración artesanal con frutas frescas. Perfecta para celebraciones de verano, cumpleaños y eventos al aire libre. Cada porción es una explosión de sabores frescos y naturales.",
                    "rating": 4.7,
                    "reviews": 19,
                    "porciones": "10-15 personas",
                    "calorias": "320 cal/porción",
                    "ingredientes": "Frutas frescas de temporada, crema chantilly, harina, huevos, azúcar, vainilla, gelatina",
                    "reseñas": [
                        { "autor": "Laura Sánchez", "fecha": "2024-01-12", "rating": 5, "comentario": "Muy fresca y deliciosa." },
                        { "autor": "Pedro Rodríguez", "fecha": "2024-01-09", "rating": 4, "comentario": "Excelente sabor y presentación." }
                    ]
                }
            ]
        },
        "tortas-circulares": {
            "nombre": "Tortas Circulares",
            "icono": "fas fa-circle",
            "productos": [
                {
                    "id": "TT001",
                    "nombre": "Torta Circular de Vainilla",
                    "precio": 18990,
                    "imagen": "https://wiltonenespanol.com/wp-content/uploads/2017/02/pastel-de-vainilla.jpg",
                    "descripcion": "Torta tradicional de vainilla con buttercream y frutas frescas.",
                    "descripcionDetallada": "Clásica torta circular de vainilla, elaborada con extracto de vainilla natural y decorada con buttercream suave. Capas de bizcocho esponjoso de vainilla, relleno de crema de vainilla y decoración elegante con frutas frescas de temporada. Un postre atemporal que nunca pasa de moda, perfecto para cualquier celebración.",
                    "rating": 4.6,
                    "reviews": 18,
                    "porciones": "8-10 personas",
                    "calorias": "320 cal/porción",
                    "ingredientes": "Vainilla natural, harina, huevos, azúcar, mantequilla, frutas frescas",
                    "reseñas": [
                        { "autor": "Laura Sánchez", "fecha": "2024-01-12", "rating": 4, "comentario": "Muy rica y fresca." },
                        { "autor": "Pedro Rodríguez", "fecha": "2024-01-09", "rating": 5, "comentario": "Excelente sabor y presentación." }
                    ]
                },
                {
                    "id": "TT002",
                    "nombre": "Torta Circular de Manjar",
                    "precio": 15990,
                    "imagen": "https://www.elingenio.cl/productos/bizcocho-manjar-lucuma.jpg",
                    "descripcion": "Torta circular con manjar casero y decoración elegante.",
                    "descripcionDetallada": "Exquisita torta circular de manjar casero, elaborada con la receta tradicional chilena. Capas de bizcocho esponjoso, relleno generoso de manjar casero y decoración elegante con nueces y almendras. Un clásico de la repostería chilena que evoca los sabores de la infancia. Perfecta para celebraciones familiares y ocasiones especiales.",
                    "rating": 4.9,
                    "reviews": 31,
                    "porciones": "8-10 personas",
                    "calorias": "380 cal/porción",
                    "ingredientes": "Manjar casero, harina, huevos, azúcar, mantequilla, nueces, almendras",
                    "reseñas": [
                        { "autor": "Carmen Díaz", "fecha": "2024-01-14", "rating": 5, "comentario": "Absolutamente deliciosa, muy elegante." },
                        { "autor": "Roberto Silva", "fecha": "2024-01-11", "rating": 5, "comentario": "Perfecta para eventos especiales." }
                    ]
                },
                {
                    "id": "TT003",
                    "nombre": "Torta Circular de Frutilla",
                    "precio": 19990,
                    "imagen": "https://www.annarecetasfaciles.com/files/tarta-de-fresas-y-nata-3.jpg",
                    "descripcion": "Torta circular de frutillas frescas con crema chantilly.",
                    "descripcionDetallada": "Deliciosa torta circular de frutillas frescas, elaborada con las mejores frutillas de temporada. Base de bizcocho esponjoso de vainilla, relleno de crema chantilly casera y decorada con frutillas frescas enteras y en rodajas. Un postre fresco y elegante que combina la dulzura natural de las frutillas con la suavidad de la crema. Perfecta para celebraciones de primavera y verano, cumpleaños y eventos especiales.",
                    "rating": 4.7,
                    "reviews": 28,
                    "porciones": "15 personas",
                    "calorias": "320 cal/porción",
                    "ingredientes": "Frutillas frescas, crema chantilly, harina, huevos, azúcar, vainilla, gelatina",
                    "reseñas": [
                        { "autor": "María González", "fecha": "2024-01-15", "rating": 5, "comentario": "¡Increíble! Las frutillas están perfectas." },
                        { "autor": "Carlos López", "fecha": "2024-01-12", "rating": 4, "comentario": "Muy fresca y deliciosa, perfecta para el verano." },
                        { "autor": "Ana Martínez", "fecha": "2024-01-10", "rating": 5, "comentario": "La mejor torta de frutillas que he probado." }
                    ]
                }
            ]
        },
        "postres-individuales": {
            "nombre": "Postres Individuales",
            "icono": "fas fa-cookie-bite",
            "productos": [
                {
                    "id": "PI001",
                    "nombre": "Mousse de Chocolate",
                    "precio": 5990,
                    "imagen": "https://images.aws.nestle.recipes/original/2024_10_18T11_53_16_badun_images.badun.es_4ed41e942636_mousse_de_chocolate_intenso.jpg",
                    "descripcion": "Delicioso mousse de chocolate con decoración de frutas.",
                    "descripcionDetallada": "Exquisito mousse de chocolate intenso, elaborado con chocolate premium y crema fresca. Textura suave y aterciopelada que se derrite en el paladar. Decorado con frutas frescas de temporada y virutas de chocolate. Perfecto como postre individual o para compartir en ocasiones especiales. Una experiencia de sabor que deleitará a los amantes del chocolate.",
                    "rating": 4.5,
                    "reviews": 12,
                    "porciones": "1 persona",
                    "calorias": "280 cal/porción",
                    "ingredientes": "Chocolate premium, crema de leche, huevos, azúcar, frutas frescas",
                    "reseñas": [
                        { "autor": "Isabel Torres", "fecha": "2024-01-13", "rating": 4, "comentario": "Sabor único y muy refrescante." }
                    ]
                },
                {
                    "id": "PI002",
                    "nombre": "Tiramisú Clásico",
                    "precio": 7990,
                    "imagen": "https://www.kingarthurbaking.com/sites/default/files/2023-03/Tiramisu_1426.jpg",
                    "descripcion": "Tiramisú tradicional italiano con café y mascarpone.",
                    "descripcionDetallada": "Auténtico tiramisú italiano, elaborado siguiendo la receta tradicional. Capas de bizcocho savoiardi empapado en café espresso, crema de mascarpone suave y espolvoreado con cacao en polvo. Un postre elegante y sofisticado que transporta a las cafeterías de Italia. Perfecto para los amantes del café y la repostería italiana.",
                    "rating": 4.8,
                    "reviews": 22,
                    "porciones": "1 persona",
                    "calorias": "320 cal/porción",
                    "ingredientes": "Café espresso, mascarpone, cacao en polvo, bizcocho savoiardi, huevos, azúcar",
                    "reseñas": [
                        { "autor": "Fernando Castro", "fecha": "2024-01-16", "rating": 5, "comentario": "Muy buena calidad y sabor." }
                    ]
                }
            ]
        },
        "productos-sin-azucar": {
            "nombre": "Productos Sin Azúcar",
            "icono": "fas fa-heart",
            "productos": [
                {
                    "id": "PSA001",
                    "nombre": "Torta Sin Azúcar de Naranja",
                    "precio": 25990,
                    "imagen": "https://santaisabel.vtexassets.com/arquivos/ids/447848-900-900?width=900&height=900&aspect=true",
                    "descripcion": "Torta saludable sin azúcar con sabor a naranja natural.",
                    "descripcionDetallada": "Deliciosa torta de naranja sin azúcar, elaborada con naranjas frescas y edulcorantes naturales. Perfecta para personas con diabetes o que buscan opciones más saludables. Base de bizcocho esponjoso de naranja, relleno de crema de naranja natural y decoración con gajos de naranja fresca. Un postre refrescante y saludable que no compromete el sabor.",
                    "rating": 4.6,
                    "reviews": 15,
                    "porciones": "8-10 personas",
                    "calorias": "250 cal/porción",
                    "ingredientes": "Naranja natural, edulcorante stevia, harina integral, huevos, aceite de oliva",
                    "reseñas": [
                        { "autor": "María González", "fecha": "2024-01-15", "rating": 5, "comentario": "¡Increíble! La mejor torta de chocolate que he probado." }
                    ]
                },
                {
                    "id": "PSA002",
                    "nombre": "Cheesecake de Maracuyá Sin Azúcar",
                    "precio": 12990,
                    "imagen": "https://bechef.cl/wp-content/uploads/2022/02/CCMM-1.png",
                    "descripcion": "Cheesecake de maracuyá sin azúcar, saludable y delicioso.",
                    "descripcionDetallada": "Delicioso cheesecake de maracuyá sin azúcar, perfecto para quienes buscan un postre saludable sin comprometer el sabor. Elaborado con edulcorantes naturales como stevia y la frescura única del maracuyá natural. Base de galletas integrales sin azúcar, crema de queso suave y topping de maracuyá fresco. Ideal para personas con diabetes, dietas bajas en carbohidratos o simplemente para quienes prefieren opciones más saludables sin sacrificar el sabor.",
                    "rating": 4.8,
                    "reviews": 22,
                    "porciones": "8 personas",
                    "calorias": "220 cal/porción",
                    "ingredientes": "Queso crema, maracuyá natural, edulcorante stevia, galletas integrales sin azúcar, huevos, gelatina sin sabor",
                    "reseñas": [
                        { "autor": "Carlos López", "fecha": "2024-01-10", "rating": 5, "comentario": "¡Increíble! No se nota que no tiene azúcar. El sabor del maracuyá es perfecto." },
                        { "autor": "María Fernández", "fecha": "2024-01-08", "rating": 4, "comentario": "Muy rico y saludable. Perfecto para mi dieta." },
                        { "autor": "Ana Martínez", "fecha": "2024-01-08", "rating": 5, "comentario": "Perfecta para ocasiones especiales." }
                    ]
                }
            ]
        },
        "pasteleria-tradicional": {
            "nombre": "Pastelería Tradicional",
            "icono": "fas fa-home",
            "productos": [
                {
                    "id": "PT001",
                    "nombre": "Empanada de Manzana",
                    "precio": 1890,
                    "imagen": "https://cocinachilena.cl/wp-content/uploads/2012/11/empanadas-manzana-3-scaled.jpg",
                    "descripcion": "Empanada tradicional de manzana con canela y azúcar.",
                    "descripcionDetallada": "Deliciosa empanada de manzana casera, elaborada con masa fresca y relleno de manzanas cortadas en cubos con canela, azúcar y un toque de limón. Horneada hasta obtener una textura dorada y crujiente. Un clásico de la repostería chilena que combina perfectamente con una taza de té o café. Ideal para la hora del té o como postre ligero.",
                    "rating": 4.4,
                    "reviews": 28,
                    "porciones": "1 persona",
                    "calorias": "180 cal/porción",
                    "ingredientes": "Manzana, canela, azúcar, masa de empanada, limón, mantequilla",
                    "reseñas": [
                        { "autor": "Ana Martínez", "fecha": "2024-01-08", "rating": 5, "comentario": "Perfecta para ocasiones especiales." }
                    ]
                },
                {
                    "id": "PT002",
                    "nombre": "Tarta de Santiago",
                    "precio": 11990,
                    "imagen": "https://recetasdecocina.elmundo.es/wp-content/uploads/2025/03/tarta-de-santiago.jpg",
                    "descripcion": "Tarta tradicional española con almendras y limón.",
                    "descripcionDetallada": "Auténtica Tarta de Santiago, el postre más emblemático de Galicia. Elaborada con almendras molidas, huevos, azúcar y un toque de limón. Decorada con la cruz de Santiago en azúcar glass. Una tarta sin harina, perfecta para celíacos, con una textura húmeda y un sabor intenso a almendras. Un clásico de la repostería española que conquista paladares.",
                    "rating": 4.8,
                    "reviews": 16,
                    "porciones": "6-8 personas",
                    "calorias": "320 cal/porción",
                    "ingredientes": "Almendras molidas, limón, azúcar, huevos, azúcar glass",
                    "reseñas": [
                        { "autor": "Laura Sánchez", "fecha": "2024-01-12", "rating": 4, "comentario": "Muy rica y fresca." }
                    ]
                }
            ]
        },
        "productos-sin-gluten": {
            "nombre": "Productos Sin Gluten",
            "icono": "fas fa-leaf",
            "productos": [
                {
                    "id": "PG001",
                    "nombre": "Brownie Sin Gluten",
                    "precio": 2990,
                    "imagen": "https://www.justspices.es/media/recipe/brownie-chocolate.jpg",
                    "descripcion": "Brownie delicioso sin gluten con chocolate premium.",
                    "descripcionDetallada": "Exquisito brownie sin gluten elaborado con chocolate premium y harina de arroz. Textura húmeda y densa en el centro, con una corteza crujiente en la superficie. Perfecto para personas celíacas o que siguen una dieta sin gluten. Decorado con nueces y chips de chocolate. Un postre que no compromete el sabor ni la textura tradicional del brownie.",
                    "rating": 4.5,
                    "reviews": 14,
                    "porciones": "4-6 personas",
                    "calorias": "300 cal/porción",
                    "ingredientes": "Chocolate premium, harina de arroz, huevos, azúcar, mantequilla, nueces",
                    "reseñas": [
                        { "autor": "Pedro Rodríguez", "fecha": "2024-01-09", "rating": 5, "comentario": "Excelente sabor y presentación." }
                    ]
                },
                {
                    "id": "PG002",
                    "nombre": "Pan Sin Gluten",
                    "precio": 3590,
                    "imagen": "https://imag.bonviveur.com/pan-sin-gluten.jpg",
                    "descripcion": "Pan artesanal sin gluten con semillas y frutos secos.",
                    "descripcionDetallada": "Pan artesanal sin gluten elaborado con una mezcla de harinas especiales, semillas de girasol, chía y sésamo, además de frutos secos como nueces y almendras. Textura esponjosa y sabor natural. Perfecto para el desayuno o acompañar cualquier comida. Ideal para personas celíacas o que buscan opciones más saludables sin comprometer el sabor.",
                    "rating": 4.3,
                    "reviews": 11,
                    "porciones": "8-10 rebanadas",
                    "calorias": "200 cal/porción",
                    "ingredientes": "Harina sin gluten, semillas de girasol, chía, sésamo, nueces, almendras, levadura",
                    "reseñas": [
                        { "autor": "Carmen Díaz", "fecha": "2024-01-14", "rating": 4, "comentario": "Absolutamente deliciosa, muy elegante." }
                    ]
                }
            ]
        },
        "productos-veganos": {
            "nombre": "Productos Veganos",
            "icono": "fas fa-seedling",
            "productos": [
                {
                    "id": "PV001",
                    "nombre": "Torta Vegana de Chocolate",
                    "precio": 22990,
                    "imagen": "https://www.lagloriavegana.com/wp-content/uploads/2020/08/Bizcocho-muerte-por-chocolate-1280x1280.jpg",
                    "descripcion": "Torta de chocolate 100% vegana con ingredientes naturales.",
                    "descripcionDetallada": "Exquisita torta de chocolate 100% vegana, elaborada sin productos de origen animal. Utiliza chocolate vegano, leche de almendras, azúcar de coco y harina integral. Decorada con crema de coco y frutas frescas. Perfecta para veganos, vegetarianos o cualquier persona que busque opciones más saludables y sostenibles sin comprometer el sabor delicioso del chocolate.",
                    "rating": 4.7,
                    "reviews": 20,
                    "porciones": "8-10 personas",
                    "calorias": "280 cal/porción",
                    "ingredientes": "Chocolate vegano, harina integral, leche de almendras, azúcar de coco, aceite de coco",
                    "reseñas": [
                        { "autor": "Roberto Silva", "fecha": "2024-01-11", "rating": 5, "comentario": "Perfecta para eventos especiales." }
                    ]
                },
                {
                    "id": "PV002",
                    "nombre": "Galletas Veganas de Avena",
                    "precio": 890,
                    "imagen": "https://luciacomparada.com/wp-content/uploads/2024/01/galletas-de-avena-veganas-05.jpg",
                    "descripcion": "Galletas saludables de avena con pasas y canela.",
                    "descripcionDetallada": "Deliciosas galletas veganas de avena, elaboradas con avena integral, pasas, canela y endulzadas con azúcar de coco. Sin huevos, leche ni mantequilla. Perfectas para el desayuno, merienda o como snack saludable. Textura crujiente por fuera y suave por dentro. Ideales para veganos, vegetarianos o cualquier persona que busque opciones más saludables y nutritivas.",
                    "rating": 4.4,
                    "reviews": 17,
                    "porciones": "12 galletas",
                    "calorias": "120 cal/porción",
                    "ingredientes": "Avena integral, pasas, canela, aceite de coco, azúcar de coco, harina de avena",
                    "reseñas": [
                        { "autor": "Isabel Torres", "fecha": "2024-01-13", "rating": 4, "comentario": "Sabor único y muy refrescante." }
                    ]
                }
            ]
        },
        "tortas-especiales": {
            "nombre": "Tortas Especiales",
            "icono": "fas fa-star",
            "productos": [
                {
                    "id": "TE001",
                    "nombre": "Torta Especial de Cumpleaños",
                    "precio": 29990,
                    "imagen": "assets/images/torta-cumpleaños.webp",
                    "descripcion": "Torta personalizada para cumpleaños con decoración especial.",
                    "descripcionDetallada": "Torta especial de cumpleaños personalizada según tus gustos y preferencias. Elaborada con los mejores ingredientes y decorada con crema, frutas frescas, chocolates y elementos decorativos temáticos. Perfecta para hacer de tu cumpleaños un día inolvidable. Incluye decoración personalizada con el nombre del cumpleañero y velas. Una experiencia única que combina sabor excepcional con presentación espectacular.",
                    "rating": 4.9,
                    "reviews": 35,
                    "porciones": "12-15 personas",
                    "calorias": "400 cal/porción",
                    "ingredientes": "Harina premium, huevos frescos, azúcar, mantequilla, crema chantilly, frutas frescas, chocolates, decoración personalizada",
                    "reseñas": [
                        { "autor": "Fernando Castro", "fecha": "2024-01-16", "rating": 5, "comentario": "Muy buena calidad y sabor." }
                    ]
                },
                {
                    "id": "TE002",
                    "nombre": "Torta Especial de Boda",
                    "precio": 79990,
                    "imagen": "https://bodasyweddings.com/wp-content/uploads/2015/04/Si-prefieres-un-diseno-simple-hazlo-inolvidable.jpg",
                    "descripcion": "Torta elegante para bodas con decoración premium.",
                    "descripcionDetallada": "Exquisita torta de boda elaborada con la máxima elegancia y sofisticación. Diseño personalizado según el estilo de la boda, con decoración artesanal que incluye flores comestibles, detalles en fondant y acabados de lujo. Perfecta para hacer de tu día especial un momento inolvidable. Cada detalle está cuidadosamente elaborado para crear una obra de arte comestible que refleje la personalidad de los novios.",
                    "rating": 5.0,
                    "reviews": 42,
                    "porciones": "20-25 personas",
                    "calorias": "350 cal/porción",
                    "ingredientes": "Harina premium, huevos frescos, azúcar, mantequilla, crema chantilly, fondant, flores comestibles, decoración artesanal",
                    "reseñas": [
                        { "autor": "María González", "fecha": "2024-01-15", "rating": 5, "comentario": "¡Increíble! La mejor torta de bodas que he probado." }
                    ]
                }
            ]
        }
    }
}
;

/**
 * ====================================================================================
 * 🗄️ INICIALIZAR BASE DE DATOS DE PRODUCTOS
 * ====================================================================================
 * 
 * Inicializa la base de datos de productos embebida.
 * Esta función se ejecuta al inicializar la aplicación.
 */
function initializeProductosDB() {
    console.log('📁 Inicializando base de datos de productos embebida...');
    console.log('✅ Base de datos de productos cargada correctamente');
    console.log(`📊 Categorías disponibles: ${Object.keys(productosDB.categorias).length}`);
    
    return productosDB;
}

// ========================================
//   FUNCIONES DE PRODUCTOS
// ========================================

// Variables globales para filtros
let filtroPrecioActivo = false;
let precioMinimo = 0;
let precioMaximo = 999999;

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

function getProductsByCategory(categoryKey) {
    return productosDB.categorias[categoryKey]?.productos || [];
}

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
        console.error('❌ El precio mínimo no puede ser mayor al máximo');
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
    console.log(`✅ Filtro aplicado: ${cantidadFiltrada} productos encontrados`);
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
    
    console.log('ℹ️ Filtro de precio limpiado');
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
    // Simplemente volver a mostrar los productos según la categoría seleccionada
    filtrarPorCategoria();
}

// Función para generar HTML de una card de producto
function generateProductCardHTML(producto) {
    const ratingStars = Array.from({length: 5}, (_, i) => 
        `<i class="fas fa-star ${i < Math.floor(producto.rating) ? 'text-warning' : 'text-muted'}"></i>`
    ).join('');
    
    return `
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="card product-card h-100">
                <div class="product-image">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
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
                    <!-- Botones de acción -->
                    <div class="mt-auto">
                        <button class="btn btn-primary w-100 py-2" onclick="addToCart('${producto.id}')">
                            <i class="fas fa-shopping-cart me-1"></i>Agregar al Carrito
                        </button>
                        
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


// Función simple para generar opciones del dropdown de categorías
function generateCategoryOptions() {
    console.log('🔧 Generando opciones del dropdown de categorías...');
    
    const options = Object.entries(productosDB.categorias).map(([key, categoria]) => {
        return `<option value="${key}">${categoria.nombre}</option>`;
    }).join('');
    
    console.log('✅ Opciones de categorías generadas');
    return options;
}

// Función simple para mostrar todos los productos
function showAllProducts() {
    console.log('🔧 Mostrando todos los productos...');
    
    const todosLosProductos = Object.values(productosDB.categorias)
        .flatMap(categoria => categoria.productos); //Aplana el array para mostrar los productos sin importar su categoria
    
    const productosFiltrados = filtrarProductosPorPrecio(todosLosProductos);
    const productosHTML = productosFiltrados.map(producto => 
        generateProductCardHTML(producto)
    ).join('');
    
    const contenidoHTML = productosFiltrados.length > 0 ? 
        `<div class="row">${productosHTML}</div>` :
        `<div class="text-center py-5">
            <i class="fas fa-search fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">No se encontraron productos</h5>
            <p class="text-muted">Intenta ajustar el filtro de precio</p>
        </div>`;
    
    document.getElementById('productosContainer').innerHTML = contenidoHTML;
    console.log('✅ Todos los productos mostrados');
}

// Función simple para inicializar el sistema de productos
function initializeProducts() {
    console.log('🚀 Inicializando sistema de productos...');
    
    // Generar opciones del dropdown
    const categoriaFilter = document.getElementById('categoriaFilter');
    if (categoriaFilter) {
        categoriaFilter.innerHTML = '<option value="todos">Todos los Productos</option>' + generateCategoryOptions();
    }
    
    // Mostrar todos los productos por defecto
    showAllProducts();
    
    console.log('✅ Sistema de productos inicializado');
}

// Función simple para filtrar por categoría
function filtrarPorCategoria() {
    const categoriaFilter = document.getElementById('categoriaFilter');
    const categoriaSeleccionada = categoriaFilter.value;
    
    console.log(`🔍 Filtrando por categoría: ${categoriaSeleccionada}`);
    
    if (categoriaSeleccionada === 'todos') {
        showAllProducts();
    } else {
        const categoria = productosDB.categorias[categoriaSeleccionada];
        if (categoria) {
            const productosFiltrados = filtrarProductosPorPrecio(categoria.productos);
    const productosHTML = productosFiltrados.map(producto => 
        generateProductCardHTML(producto)
    ).join('');
    
    const contenidoHTML = productosFiltrados.length > 0 ? 
        `<div class="row">${productosHTML}</div>` :
        `<div class="text-center py-5">
            <i class="fas fa-search fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">No se encontraron productos</h5>
            <p class="text-muted">Intenta ajustar el filtro de precio</p>
        </div>`;
    
            document.getElementById('productosContainer').innerHTML = contenidoHTML;
            console.log(`✅ Mostrando ${productosFiltrados.length} productos de ${categoria.nombre}`);
        }
    }
}

// Función para inicializar el contenido dinámico de productos (simplificada)
function initializeDynamicProducts() {
    console.log('🔧 Inicializando productos dinámicos...');
    
    if (!productosDB || !productosDB.categorias) {
        console.error('❌ productosDB no está disponible para inicializar productos');
        return;
    }
    
    // Usar la nueva función simple
    initializeProducts();
    
    // Configurar event listeners para botones de cantidad
    
    console.log('✅ Inicialización de productos dinámicos completada');
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


    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
    
}



// Función para manejar hash de URL al cargar la página
function handleUrlHash() {
    const hash = window.location.hash;
    if (hash === '#productos') {
        // Si el hash es #productos, hacer scroll a la sección
        setTimeout(() => {
            const productosSection = document.getElementById('productos');
            if (productosSection) {
                productosSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000);
    }
}

// Función para configurar event listeners de navegación a productos
function setupProductNavigationListeners() {
    // Configurar evento para el enlace principal de "Productos"
    document.querySelectorAll('a[href*="#productos"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productosSection = document.getElementById('productos');
            if (productosSection) {
                productosSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    // Asegurar que se muestren todos los productos
                    showAllProducts();
                }, 500);
            }
        });
    });
}

function addToCart(productId) {
    console.log('🛒 Adding to cart:', productId);
    
    const producto = getProductById(productId);
    if (!producto) {
        console.log('❌ Producto not found:', productId);
        return;
    }
    console.log('📦 Product found:', producto.nombre);

    // Buscar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Si ya existe, agregar 1 más
        existingItem.cantidad += 1;
        console.log('➕ Adding to existing item, new quantity:', existingItem.cantidad);
    } else {
        // Si no existe, agregarlo con cantidad 1
        cart.push({
            id: productId,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
            imagen: producto.imagen
        });
        console.log('🆕 Adding new item to cart');
    }

    // Actualizar interfaz y persistencia
    updateCartCounter();
    saveCartToStorage();
    updateCartModal();
    console.log(`✅ ${producto.nombre} agregado al carrito`);
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
        console.log(`ℹ️ ${producto.nombre} eliminado del carrito`);
    }
}


/**
 * Limpia todo el carrito
 */
function clearCart() {
    cart = [];
    updateCartCounter();
    saveCartToStorage();
    console.log('ℹ️ Carrito vaciado');
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
        
    // Actualizar todos los contadores usando clase CSS
    document.querySelectorAll('.cart-counter').forEach(counter => {
        counter.textContent = totalItems;
        counter.style.display = totalItems > 0 ? 'block' : 'none';
    });
    
    // Actualizar todos los precios usando clase CSS
    document.querySelectorAll('.cart-price').forEach(priceElement => {
        priceElement.textContent = `Carrito $${totalPrice.toLocaleString('es-CL')}`;
    });
}

// ========================================
// FUNCIONES DE NAVEGACIÓN
// ========================================


// Inicializar productos cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar base de datos de productos embebida
    initializeProductosDB();
    
    // Cargar carrito desde localStorage
    loadCartFromStorage();
    
    // Actualizar contador del carrito en todas las páginas
    updateCartCounter();
    
    // Configurar evento para el botón de agregar al carrito del modal
    const modalAddToCartBtn = document.getElementById('modalAddToCart');
    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', function() {
            if (currentModalProductId) {
                addToCart(currentModalProductId);
                
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
        console.log('🎯 Página de productos detectada, inicializando...');
        console.log('📊 productosDB antes de inicializar:', productosDB ? 'Cargado' : 'No cargado');
        
        // Verificar que productosDB esté cargado antes de inicializar
        if (productosDB && productosDB.categorias) {
            initializeDynamicProducts();
            handleUrlHash();
            setupProductNavigationListeners();
        } else {
            console.error('❌ productosDB no está cargado, no se puede inicializar productos');
        }
        
        // Configurar botones de cantidad después de la navegación
    }
});

console.log('✅ productos.js cargado correctamente - Sistema de productos y carrito disponible');