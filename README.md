# Pastelería Mil Sabores - E-commerce Frontend

## Descripción del Proyecto
Desarrollo de una plataforma de comercio electrónico para la Pastelería Mil Sabores como parte de la asignatura DSY1104 (Full Stack) del programa de Analista Programador en Duoc UC.

## Objetivos
- Demostrar dominio de HTML, CSS y JavaScript
- Implementar validaciones de formularios en tiempo real con feedback visual
- Desarrollar funcionalidad de carrito de compras con localStorage
- Simular sistema de registro y login de usuarios
- Aplicar control de versiones con GitHub
- Implementar sistema de componentes HTML modulares

## Tecnologías Utilizadas
- **HTML5**: Estructura semántica con sistema de componentes modulares
- **CSS3**: Diseño responsivo con Bootstrap 5.3.0 y estilos customizados
- **JavaScript**: Lógica de programación, manipulación del DOM y validaciones
- **SweetAlert2**: Alertas elegantes para feedback de usuario
- **Git/GitHub**: Control de versiones y colaboración

## Estructura del Proyecto
```
mil-sabores-fullstack/
├── index.html              # Página principal con catálogo, carrito y carrusel
├── login.html              # Página de inicio de sesión con validaciones
├── registro.html           # Página de registro con sistema de beneficios
├── css/
│   └── style.css          # Estilos globales y responsivos del proyecto
├── js/
│   ├── login.js           # Lógica específica de login (9 funciones)
│   ├── registro.js        # Lógica específica de registro (10 funciones)
│   └── productos.js       # Gestión de productos, carrito y navegación (28 funciones)
├── components/
│   ├── navbar.html        # Componente de navegación
│   ├── footer.html        # Componente de pie de página
│   └── cart-modal.html    # Componente de modal del carrito
├── assets/
│   └── images/            # Recursos gráficos
│       ├── carrusel1.png  # Imagen del carrusel - Torta Especial de Boda
│       ├── carrusel2.png  # Imagen del carrusel - Cheesecake de Maracuyá
│       ├── carrusel3.png  # Imagen del carrusel - Torta Circular de Frutilla
│       ├── carrusel4.png  # Imagen del carrusel - Torta Especial de Cumpleaños
│       ├── logo-milsabores.png # Logo de la pastelería
│       └── torta-cumpleaños.webp # Imagen de producto
└── README.md              # Documentación del proyecto
```

## Funcionalidades Implementadas

### Sistema de Usuarios
- **Registro completo** con validaciones en tiempo real (`onblur`)
- **Login con validaciones** de email y contraseña
- **Sistema de beneficios** automático según criterios
- **Feedback visual** con campos rojos/verdes según validación
- **Botones dummy** para demostración (sin backend real)

### Sistema de Beneficios
- **🎂 Torta gratis** para estudiantes con correo @duoc.cl
- **🎉 50% de descuento** para usuarios mayores de 50 años
- **🎊 10% de descuento** con código "FELICES50"
- **Validación automática** de beneficios al completar campos

### Catálogo de Productos
- **8 categorías** de productos con tabs dinámicos
- **Carrusel interactivo** con imágenes clickeables
- **Filtros por categoría** con navegación suave
- **Modal de detalles** con información completa del producto
- **Sistema de búsqueda** integrado

### Carrito de Compras
- **Agregar/eliminar productos** con cantidades personalizables
- **Cálculo automático** de totales
- **Persistencia** con localStorage
- **Modal del carrito** con resumen completo
- **Funcionalidad en todas las páginas**

### Sistema de Componentes
- **Navbar modular** con navegación responsiva
- **Footer reutilizable** en todas las páginas
- **Modal de carrito** como componente independiente
- **Carga dinámica** de componentes con JavaScript

### Navegación y UX
- **Navegación suave** con anchors (`#secciones`)
- **Dropdown de productos** con activación de tabs
- **Responsive design** para desktop, tablet y móvil
- **Toast notifications** para feedback de usuario

## Categorías de Productos
- **Tortas Cuadradas** - Tortas tradicionales en formato cuadrado
- **Tortas Circulares** - Tortas clásicas en formato redondo
- **Postres Individuales** - Porciones individuales
- **Productos Sin Azúcar** - Opciones saludables
- **Pastelería Tradicional** - Recetas clásicas
- **Productos Sin Gluten** - Opciones para celíacos
- **Productos Veganos** - Opciones sin ingredientes animales
- **Tortas Especiales** - Diseños únicos y personalizados

## Características Técnicas

### Validaciones de Formularios
- **Validación en tiempo real** con `onblur`
- **Campos obligatorios** con feedback visual
- **Validación de email** con formato correcto
- **Validación de contraseñas** con criterios de seguridad
- **Validación de edad** para beneficios automáticos
- **Conversión automática** a mayúsculas en códigos

### Sistema de Componentes
- **Carga híbrida** con `fetch` y fallback embebido
- **Componentes reutilizables** en todas las páginas
- **Navegación consistente** entre páginas
- **Modales compartidos** (carrito, productos)

### Responsive Design
- **Bootstrap 5.3.0** como framework base
- **Media queries** personalizadas para ajustes específicos
- **Grid system** para layouts adaptativos
- **Navegación móvil** con offcanvas

## Arquitectura de Funciones JavaScript

### 📊 Resumen Estadístico
- **Total de funciones**: 47 funciones activas
- **Archivos JavaScript**: 3 archivos optimizados
- **Estado**: Completamente optimizado sin redundancias

### 🛒 `js/productos.js` (28 funciones)

#### 🗄️ Gestión de Carrito (9 funciones)
- `loadCartFromStorage()` - Carga carrito desde localStorage
- `saveCartToStorage()` - Guarda carrito en localStorage
- `addToCart(productId)` - Agrega producto al carrito
- `removeFromCart(productId)` - Elimina producto del carrito
- `clearCart()` - Vacía todo el carrito
- `changeCartItemQuantity(productId, change)` - Cambia cantidad de producto
- `updateCartCounter()` - Actualiza contador del carrito
- `updateCartModal()` - Actualiza modal del carrito
- `showCartModal()` - Muestra modal del carrito

#### 📦 Gestión de Productos (6 funciones)
- `initializeProductosDB()` - Inicializa base de datos de productos
- `getAllProducts()` - Obtiene todos los productos
- `getProductById(id)` - Obtiene producto por ID
- `getProductsByCategory(categoryKey)` - Obtiene productos por categoría
- `getAllCategories()` - Obtiene todas las categorías
- `showProductDetails(productId)` - Muestra detalles del producto

#### 🔍 Filtros y Búsqueda (5 funciones)
- `filtrarProductosPorPrecio(productos)` - Filtra productos por precio
- `aplicarFiltroPrecio()` - Aplica filtro de precio
- `limpiarFiltroPrecio()` - Limpia filtro de precio
- `contarProductosFiltrados()` - Cuenta productos filtrados
- `filtrarPorCategoria()` - Filtra productos por categoría

#### 🎨 Generación de HTML (3 funciones)
- `generateProductCardHTML(producto)` - Genera HTML de card de producto
- `generateCategoryOptions()` - Genera opciones de categorías
- `regenerateProductsContent()` - Regenera contenido de productos

#### ⚙️ Inicialización y Navegación (5 funciones)
- `showAllProducts()` - Muestra todos los productos
- `initializeProducts()` - Inicializa sistema de productos
- `initializeDynamicProducts()` - Inicializa productos dinámicos
- `handleProductNavigation(categoryKey)` - Maneja navegación de productos
- `handleUrlHash()` - Maneja hash de URL

### 🔐 `js/login.js` (9 funciones)

#### ✅ Validaciones (4 funciones)
- `validarEmailLogin()` - Valida email en login
- `validarPasswordLogin()` - Valida contraseña en login
- `validarFormularioLogin()` - Valida formulario completo de login
- `validateEmail(email)` - Función auxiliar de validación de email

#### 🎨 Interfaz de Usuario (4 funciones)
- `mostrarError(campo, mensaje)` - Muestra mensaje de error
- `mostrarExito(campo)` - Muestra mensaje de éxito
- `togglePassword(passwordId, eyeIconId)` - Toggle visibilidad de contraseña
- `setupPasswordToggles()` - Configura toggles de contraseña

#### ⚙️ Procesamiento (1 función)
- `handleLogin()` - Maneja proceso de login

### 📝 `js/registro.js` (10 funciones)

#### ✅ Validaciones (3 funciones)
- `validarEmailDuoc()` - Valida email de estudiante Duoc
- `validarFormulario()` - Valida formulario completo de registro
- `validateEmail(email)` - Función auxiliar de validación de email

#### 🎨 Interfaz de Usuario (3 funciones)
- `setupPasswordToggles()` - Configura toggles de contraseña
- `togglePassword(passwordId, eyeIconId)` - Toggle visibilidad de contraseña
- `setupDateInputs()` - Configura inputs de fecha

#### 🎁 Beneficios Especiales (4 funciones)
- `mostrarDescuentoEdad()` - Muestra beneficio por edad 50+
- `mostrarTortaGratis()` - Muestra beneficio para estudiantes Duoc
- `mostrarDescuentoCodigo()` - Muestra beneficio por código FELICES50
- `mostrarCodigoInvalido()` - Muestra mensaje de código inválido

## Instalación y Uso
1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Barrolas/mil-sabores-fullstack.git
   ```

2. **Abrir en navegador**
   - Abrir `index.html` en un navegador web
   - No requiere servidor local (funciona con file://)

3. **Navegar por el sitio**
   - Página principal: `index.html`
   - Login: `login.html`
   - Registro: `registro.html`

## Funcionalidades de Demostración

### Registro de Usuario
1. Ir a `registro.html`
2. Completar formulario con validaciones
3. Probar beneficios automáticos:
   - Email @duoc.cl → Torta gratis
   - Edad 50+ → Descuento 50%
   - Código "FELICES50" → Descuento 10%

### Carrito de Compras
1. En `index.html`, navegar a productos
2. Agregar productos al carrito
3. Verificar persistencia al recargar página
4. Probar funcionalidad en todas las páginas

### Navegación
1. Probar dropdown de productos
2. Verificar activación de tabs
3. Probar navegación móvil
4. Verificar anchors suaves

## Colaboradores
- **Nicole Chavez**
- **Nicolás Barra**

## Fecha de Entrega
**16 de Septiembre de 2025**

## Notas Importantes
- ✅ **Proyecto frontend completo** sin backend
- ✅ **Validaciones funcionales** con feedback visual
- ✅ **Sistema de componentes** modular y reutilizable
- ✅ **Carrito persistente** con localStorage
- ✅ **Sistema de beneficios** automático
- ✅ **Responsive design** para todos los dispositivos
- ✅ **Código optimizado** sin elementos innecesarios
- ✅ **Cumple requisitos** de la rúbrica de evaluación

## Últimas Actualizaciones

### 🎨 Mejoras de Interfaz
- **Filtros unificados** en una sola card optimizada
- **Botones con estilos** consistentes de las cards de productos
- **Sistema de carrito simplificado** (agregar siempre 1 producto)
- **Eliminado campo stock** de toda la base de datos
- **Navegación simplificada** sin dropdowns complejos

### ⚡ Optimizaciones Técnicas
- **Código completamente limpio** sin redundancias
- **Mejor rendimiento** de carga y ejecución
- **Mantenimiento simplificado** con menos archivos
- **Todas las funcionalidades** preservadas intactas
- **Documentación actualizada** con arquitectura de funciones