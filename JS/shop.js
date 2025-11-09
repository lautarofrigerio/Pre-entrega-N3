// Declaración de constantes y arrays para los productos disponibles
const TASA_IVA = 0.21; // 21% de IVA
const DESCUENTO_POR_MONTO = 0.10; // 10% de descuento si el monto supera cierto valor

// Array de objetos para representar los productos de la tienda
const productos = [
    { id: 1, nombre: "Mancuernas 1kg", precio: 2500, stock: 10 },
    { id: 2, nombre: "Guantes de Entrenamiento", precio: 1500, stock: 15 },
    { id: 3, nombre: "Shaker 600ml", precio: 800, stock: 20 },
    { id: 4, nombre: "Proteína en Polvo 1kg", precio: 7000, stock: 5 },
    { id: 5, nombre: "Bandas de Resistencia", precio: 1200, stock: 25 }
];

// Array para almacenar los productos que el usuario agrega al carrito
let carrito = [];
// Variable para llevar el total del carrito
let totalCarrito = 0;

console.log("¡Bienvenido al simulador de compras de FUERZA-TOTAL!");
console.log("--------------------------------------------------");
console.log("Productos disponibles:");
productos.forEach(producto => {
    console.log(`ID: ${producto.id} - ${producto.nombre} - Precio: $${producto.precio} - Stock: ${producto.stock}`);
});
console.log("--------------------------------------------------");
// --- FUNCIONES ---

// 1. Función para mostrar productos y obtener la selección del usuario (Entrada de datos)
function obtenerSeleccionProducto() {
    let mensajeProductos = "Estos son nuestros productos disponibles:\n\n";
    productos.forEach(prod => {
        mensajeProductos += `ID: ${prod.id} - ${prod.nombre} - Precio: $${prod.precio} (Stock: ${prod.stock})\n`;
    });
    mensajeProductos += "\nIngresa el ID del producto que quieres agregar al carrito o '0' para finalizar:";

    let idProducto = prompt(mensajeProductos);
   
    while (isNaN(idProducto) || (idProducto !== '0' && !productos.some(p => p.id == idProducto))) {
        alert("Por favor, ingresa un ID de producto válido o '0' para salir.");
        idProducto = prompt(mensajeProductos);
    }
    return parseInt(idProducto);
}

// 2. Función para agregar producto al carrito y calcular subtotales (Procesamiento de datos)
function agregarProductoAlCarrito(idProducto) {
    const productoEncontrado = productos.find(prod => prod.id === idProducto);

    if (productoEncontrado) {
        let cantidad = parseInt(prompt(`¿Cuántas unidades de "${productoEncontrado.nombre}" quieres agregar? (Stock disponible: ${productoEncontrado.stock})`));

        while (isNaN(cantidad) || cantidad <= 0 || cantidad > productoEncontrado.stock) {
            alert(`Cantidad inválida. Por favor, ingresa un número mayor a 0 y no superior al stock (${productoEncontrado.stock}).`);
            cantidad = parseInt(prompt(`¿Cuántas unidades de "${productoEncontrado.nombre}" quieres agregar?`));
        }

        const itemExistente = carrito.find(item => item.producto.id === idProducto);
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
            itemExistente.subtotal = itemExistente.cantidad * productoEncontrado.precio;
        } else {
            carrito.push({
                producto: productoEncontrado,
                cantidad: cantidad,
                subtotal: cantidad * productoEncontrado.precio
            });
        }
        productoEncontrado.stock -= cantidad; 
        console.log(`Se agregaron ${cantidad} unidades de "${productoEncontrado.nombre}" al carrito.`);
        console.log(`Stock restante de "${productoEncontrado.nombre}": ${productoEncontrado.stock}`);
    } else {
        alert("Producto no encontrado. Intenta de nuevo.");
    }
}

// 3. Función para mostrar el carrito y el total (Salida de datos)
function mostrarCarritoYTotal() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        console.log("Carrito vacío.");
        totalCarrito = 0;
        return;
    }

    let mensajeCarrito = "--- TU CARRITO DE COMPRAS ---\n\n";
    totalCarrito = 0;

    carrito.forEach(item => {
        mensajeCarrito += `${item.producto.nombre} x ${item.cantidad} = $${item.subtotal}\n`;
        totalCarrito += item.subtotal;
    });

    mensajeCarrito += `\nSubtotal: $${totalCarrito.toFixed(2)}`;

    // Aplicar descuento si aplica
    if (totalCarrito > 5000) { 
        const descuento = totalCarrito * DESCUENTO_POR_MONTO;
        totalCarrito -= descuento;
        mensajeCarrito += `\nDescuento (10% por compra > $5000): -$${descuento.toFixed(2)}`;
    }

    // Calcular IVA
    const iva = totalCarrito * TASA_IVA;
    totalCarrito += iva;

    mensajeCarrito += `\nIVA (21%): +$${iva.toFixed(2)}`;
    mensajeCarrito += `\n\nTOTAL FINAL: $${totalCarrito.toFixed(2)}`;

    alert(mensajeCarrito);
    console.log(mensajeCarrito);
    console.log("-----------------------------------------");
}

// 4. Función para preguntar si desea continuar comprando
function preguntarContinuar() {
    return confirm("¿Deseas agregar otro producto al carrito?");
}
// --- INTERACCIÓN PRINCIPAL DEL SIMULADOR ---
let continuarComprando = true;

while (continuarComprando) {
    const idSeleccionado = obtenerSeleccionProducto();

    if (idSeleccionado === 0) {
        continuarComprando = false;
    } else {
        agregarProductoAlCarrito(idSeleccionado);
        // Preguntamos si quiere seguir comprando SOLO si no ha decidido salir con '0'
        if (continuarComprando) {
             continuarComprando = preguntarContinuar();
        }
    }
}

// Al finalizar la compra, mostramos el resumen del carrito
mostrarCarritoYTotal();

alert("¡Gracias por visitar FUERZA-TOTAL! Vuelve pronto.");
console.log("Simulador finalizado.");

