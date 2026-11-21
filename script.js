
let cantidadCarrito = 0;
let totalCarrito = 0;
let productosCarrito = [];

function registrarEvento(nombreEvento, datos) {
    if (typeof gtag === "function") {
        gtag("event", nombreEvento, datos);
    }
}

function agregarCarrito(nombre, precio, codigo) {

    cantidadCarrito++;
    totalCarrito += precio;

    const producto = productosCarrito.find(
        item => item.item_id === codigo
    );

    if (producto) {
        producto.quantity++;
    } else {
        productosCarrito.push({
            item_id: codigo,
            item_name: nombre,
            price: precio,
            quantity: 1
        });
    }

    actualizarCarrito();

    document.getElementById("mensaje").textContent =
        `¡${nombre} agregado correctamente al carrito!`;

    registrarEvento("add_to_cart", {
        currency: "PEN",
        value: precio,
        items: [{
            item_id: codigo,
            item_name: nombre,
            price: precio,
            quantity: 1
        }]
    });

    console.log("Producto agregado:", nombre);
}

function actualizarCarrito() {
    document.getElementById("contador").textContent =
        cantidadCarrito;

    document.getElementById("cantidad").textContent =
        cantidadCarrito;

    document.getElementById("total").textContent =
        totalCarrito.toFixed(2);
}

function vaciarCarrito() {

    if (cantidadCarrito === 0) {
        document.getElementById("mensaje").textContent =
            "El carrito ya está vacío.";
        return;
    }

    const productosEliminados = productosCarrito.map(
        item => ({ ...item })
    );

    registrarEvento("remove_from_cart", {
        currency: "PEN",
        value: Number(totalCarrito.toFixed(2)),
        items: productosEliminados
    });

    cantidadCarrito = 0;
    totalCarrito = 0;
    productosCarrito = [];

    actualizarCarrito();

    document.getElementById("mensaje").textContent =
        "El carrito se vació correctamente.";
}
