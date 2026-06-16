-----------------------------------

# 🛒 FakeStore E-Commerce - Proyecto Integrador

¡Bienvenido! Este proyecto es una aplicación de comercio electrónico (e-commerce) completamente funcional que consume la API REST de **Platzi Fake Store API**. El desarrollo fue realizado bajo el rol de estudiante de Desarrollo de Software, aplicando las mejores prácticas de arquitectura limpia, separación de responsabilidades, componentes reutilizables y un diseño consistente.

---

## 🚀 Tecnologías y Stack Utilizado

El proyecto fue desarrollado utilizando el siguiente ecosistema técnico obligatorio:

| Tecnología / Librería | Versión / Tipo  | Propósito                                                   |
| :-------------------- | :-------------- | :---------------------------------------------------------- |
| **React**             | v18+            | Biblioteca principal para la interfaz de usuario            |
| **Vite**              | Última          | Herramienta de construcción y servidor de desarrollo rápido |
| **React Router DOM**  | v6              | Sistema de enrutamiento dinámico y navegación               |
| **Material UI (MUI)** | v5 / v6         | Framework de diseño y componentes listos para producción    |
| **Context API**       | Nativo de React | Gestión del estado global (Carrito y Autenticación)         |
| **Fetch API**         | Nativa (ES6+)   | Consumo de servicios asincrónicos sin dependencias externas |
| **JavaScript**        | ES6+            | Lógica de programación moderna (Async/Await, Destructuring) |

---

## 📂 Estructura de Carpetas del Proyecto

Se aplicó una estructura modular que garantiza la **separación de responsabilidades** evaluada en los criterios de corrección:

```text
src/
├── assets/           # Archivos estáticos e imágenes
├── components/       # Componentes atómicos y reutilizables (Navbar, Footer, ProductCard, Layout)
├── contexts/         # Estados globales (CartContext, UserContext)
├── hooks/            # Custom Hooks obligatorios (useProducts, useCategories)
├── pages/            # Vistas/Páginas de la aplicación (Home, Productos, Login, etc.)
├── routes/           # Configuración centralizada de React Router DOM v6
├── services/         # Capa de abstracción de red (Llamadas Fetch puras a la API)
├── App.jsx           # Componente raíz (Configuración de proveedores y temas de MUI)
└── main.jsx          # Punto de entrada de la aplicación

------------------------------------------------------
🏁 ¡Proyecto Completo!
¡Felicitaciones! Acabamos de armar todo el código del proyecto integrador. Repasemos la checklist de entrega:

Capa de servicios API separada con Fetch nativo (src/services/api.js).

2 Contextos separados (CartContext y UserContext).

2 Custom Hooks obligatorios (useProducts y useCategories).

8 Páginas completas maquetadas consistentemente con Material UI.

Sistema de rutas estructurado con React Router DOM v6 y control 404.

🛠️ Características Principales Implementadas
1. Páginas y Enrutamiento (React Router DOM v6)
/ (Home): Banner de bienvenida, sección destacada y un algoritmo dinámico que selecciona 8 productos aleatorios en cada carga.

/productos (Catálogo): Listado completo con buscador por texto en tiempo real y filtro interactivo por categoría sincronizado con la barra de navegación.

/producto/:id (Detalle): Captura parámetros dinámicos para renderizar la información extendida de un artículo específico y agregarlo al carrito.

/login y /registro: Formularios completamente controlados con useState y validaciones de cliente básicas (formato de email, contraseñas idénticas y campos requeridos).

/carrito: Mapeo de productos, cálculo dinámico de subtotales por ítem, precio total general, y funciones para eliminar o vaciar el carrito.

/perfil: Renderizado condicional. Muestra los datos del usuario activo y sus métricas de compra si está logueado; bloquea el acceso si no lo está.

/contacto: Formulario de consultas con feedback de envío exitoso mediante alertas de MUI.

404 (NotFound): Manejo de rutas inexistentes mediante comodines (*).

2. Gestión de Estado Global (Context API)
CartContext: Administra el estado del array del carrito, añade productos de forma acumulativa (incrementando la cantidad si ya existen), elimina por ID, limpia el estado y calcula el total de manera automática con useEffect.

UserContext: Controla la sesión del usuario enlazando los formularios de autenticación con la API de Platzi para simular flujos reales de Login, Registro y Logout.

3. Custom Hooks Obligatorios
useProducts(): Maneja de forma aislada los estados locales de products (data), loading (barra de progreso) y error (alertas visuales) al consumir la API.

useCategories(): Abstrae la lógica de obtención de categorías para poblar dinámicamente los selectores y menús de la app.

✒️ Criterios de Código Limpio Aplicados
Derivación de Estados: El total del carrito y los subtotales no se duplican en useState locales; se calculan al vuelo en base al estado existente (Single Source of Truth).

UI Consistente: Se configuró un ThemeProvider centralizado en Material UI para estandarizar los colores primarios, secundarios y tipografías en toda la aplicación.

Desacoplamiento: Los componentes no saben cómo la API trae los datos; solo consumen los servicios o los custom hooks expuestos (useProducts), facilitando el mantenimiento y testing del código.

--------------------------------------------------
Preguntas:
🧠 Guía de Defensa frente al Profesor
1. Si te pregunta: "¿Por qué usaste Context API en lugar de pasar estados por Props?"
Tu respuesta: "Profesor, usamos Context API para evitar el Props Drilling (pasar datos a través de componentes que no los necesitan). El carrito (CartContext) y el usuario (UserContext) son estados globales que requiere tanto la Navbar (en el Header) como las páginas profundas (como el Detalle de Producto o el Perfil). Al centralizarlos en un Contexto, cualquier componente puede consumirlos directamente con useContext, haciendo el código más limpio y escalable."

2. Si te pregunta: "Explicame cómo funcionan tus Custom Hooks"
Tu respuesta: "Para cumplir con la separación de responsabilidades, decidí aislar la lógica de conexión a la API. El componente de la página no sabe cómo funciona fetch; solo llama a useProducts(). Este Custom Hook se encarga de gestionar de forma interna los useState para los datos, el loading y el error, y se dispara automáticamente mediante un useEffect cuando el componente se monta. Así, si el día de mañana cambiamos la API por otra, solo tocamos el hook y las vistas siguen funcionando igual."

3. Si te pregunta: "¿Por qué usaste un useEffect con dependencias en la página de Productos?"
Tu respuesta: "En la página de /productos usamos un useEffect que escucha los cambios de searchQuery (el buscador) y selectedCategory (el filtro). Cada vez que el usuario teclea una letra o cambia la categoría, React detecta ese cambio de estado, ejecuta el useEffect y recalcula de forma combinada e instantánea los productos filtrados en el cliente, logrando una experiencia de usuario súper fluida."

4. Si te pregunta: "Veo que calculás el Total del carrito con un useEffect en el Context, ¿por qué no guardás el total en otro useState separado?"
Tu respuesta: "Porque en React es una mala práctica duplicar estados que se pueden derivar. El total es una consecuencia de los productos que están en el carrito. Por lo tanto, usamos un useEffect que observa al array cart. Cada vez que el carrito muta (se agrega o elimina un producto), el efecto corre un .reduce() y actualiza el valor del total. Es una única fuente de verdad."

🗂️ Checklist final antes de mostrar la pantalla:
Hacé un par de pruebas locas: intentá entrar a /perfil sin estar logueado para mostrarle al profesor cómo salta el cartel de bloqueo (el renderizado condicional).

Escribí cualquier cosa en la URL (como /productos/inventado) para que vea cómo tu enrutador lo manda directo a la página 404 - NotFound.

Agregá un par de productos al carrito y mostrale cómo se actualiza el contador de la Navbar al instante gracias al estado global compartido.

---------------------------------------------------
```
