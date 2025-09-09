# Pastelería Mil Sabores - E-commerce Frontend

## Descripción del Proyecto
Desarrollo de una plataforma de comercio electrónico para la Pastelería Mil Sabores como parte de la asignatura DSY1104 (Full Stack) del programa de Analista Programador en Duoc UC.

## Objetivos
- Demostrar dominio de HTML, CSS y JavaScript
- Implementar validaciones de formularios en tiempo real
- Desarrollar funcionalidad de carrito de compras con localStorage
- Simular sistema de administración de usuarios y productos
- Aplicar control de versiones con GitHub

## Tecnologías Utilizadas
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsivo y consistente. Uso de Bootstrap
- **JavaScript**: Lógica de programación y manipulación del DOM
- **Git/GitHub**: Control de versiones y colaboración

## Estructura del Proyecto
```
mil-sabores-fullstack/
├── index.html          # Página principal con catálogo y carrito
├── login.html          # Página de inicio de sesión
├── registro.html       # Página de registro de usuarios
├── css/
│   └── style.css       # Estilos globales del proyecto
├── js/
│   └── script.js       # Lógica de JavaScript
├── assets/
│   └── images/         # Recursos gráficos
└── README.md           # Documentación del proyecto
```

## Funcionalidades Implementadas

### Sistema de Usuarios
- Registro de usuarios con validaciones
- Login simulado (solo frontend)
- Gestión de perfiles de usuario (simulado)

### Catálogo de Productos
- Visualización de productos por categorías
- Filtros funcionales por tipo de producto
- **En revision: Filtros por precio.**
- Búsqueda de productos

### Carrito de Compras
- Agregar/eliminar productos
- Cálculo de totales
- Persistencia con localStorage

### Sistema de Descuentos
- 20% de descuento para usuarios con correo @duoc.cl
- 10% de descuento con código "FELICES50"
- 50% de descuento para usuarios mayores de 50 años

### Administración
- Tabla de usuarios con datos simulados
- Gestión de productos
- Funcionalidad de eliminación

## Categorías de Productos
- Tortas Cuadradas
- Tortas Circulares
- Postres Individuales
- Productos Sin Azúcar
- Pastelería Tradicional
- Productos Sin Gluten
- Productos Veganos
- Tortas Especiales

## Instalación y Uso
1. Clonar el repositorio
2. Abrir `index.html` en un navegador web
3. Navegar por las diferentes secciones del sitio

## Colaboradores
- Nicole Chavez
- Nicolás Barra

## Fecha de Entrega
16 de Septiembre de 2025

## Notas Importantes
- Este es un proyecto de frontend únicamente
- No se implementa backend ni base de datos
- Los datos se simulan usando JavaScript y localStorage
- El proyecto cumple con los requisitos de la rúbrica de evaluación
