# Shopping Cart Application

Esta aplicación cumple con los requisitos solicitados para listar productos, añadirlos al carrito de compras y manejar la funcionalidad de favoritos.

---

## **Características Implementadas**

1. **Vista de Lista de Productos**:

   - Muestra una lista de productos obtenidos desde la API proporcionada.
   - Indica la disponibilidad de stock para cada producto.
   - Incluye un botón para agregar productos al carrito.
   - Incluye un botón para marcar productos como favoritos o eliminarlos de favoritos.

2. **Funcionalidad del Carrito**:

   - Muestra los artículos agregados al carrito.
   - Permite aumentar o disminuir la cantidad de productos en el carrito.
   - Elimina automáticamente productos del carrito cuando su cantidad se reduce a cero.
   - Calcula y muestra el precio total del carrito de manera dinámica.

3. **Funcionalidad de Favoritos**:

   - Se agregó un botón de alternancia (`⭐`/`☆`) en la tarjeta del producto para marcar/desmarcar un producto como favorito.
   - Los productos se pueden filtrar dinámicamente para mostrar todos los productos o solo los favoritos. Esta funcionalidad fue improvisada para ofrecer una solución práctica y clara, ya que los requisitos no especificaban cómo manejar los favoritos.

4. **Diseño Responsivo**:
   - La aplicación se adapta a diseños de escritorio y móvil según los mockups proporcionados:
     - **Escritorio**: Los productos se muestran en una cuadrícula de 4 columnas, con el carrito visible al lado.
     - **Móvil**: Los productos se muestran en una cuadrícula de 2 columnas, y el carrito es accesible mediante la navegación.

---

## **Funcionalidades Improvisadas**

Atento a que los requisitos solicitaban listar y agregar productos a favoritos, pero no especificaban cómo debía mostrarse esta funcionalidad:

- Se agregó un **filtro** en la lista de productos para alternar entre "Todos" y "Favoritos".
- Se incluyó un botón en cada tarjeta de producto para agregar o quitar favoritos.

### Limitaciones del API en Producción

Este proyecto utiliza **JSON Server** para servir datos desde un archivo estático (`db.json`).

#### Limitaciones:

- **Persistencia de datos**: Cambios realizados en los datos mediante operaciones como `PATCH` (para agregar o quitar de favoritos) no se conservarán debido a las características del sistema de archivos.
- **Reinicio del servicio**: Los datos volverán al estado original del archivo `db.json` cada vez que el servicio se reinicie.
