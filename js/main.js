const mercaderia = [
    {
        id: 1,
        nombre: "ADIDAS FORUM",
        precio: 70000,
        imagen: "img/zapa1.jpg",
    },
    {
        id: 2,
        nombre: "NIKE SB GRIS",
        precio: 60000,
        imagen: "img/zapa2.jpg",
    },
    {
        id: 3,
        nombre: "ADIDAS SAMBA",
        precio: 65000,
        imagen: "img/zapa3.jpg",
    },
]

const Carrito = JSON.parse(localStorage.getItem('Carrito')) || [];

function RenderMercaderia() {
    const ListaProductos = document.getElementById('ListaProductos');
    mercaderia.forEach(producto => {
        const productosDiv = document.createElement('div');
        productosDiv.className = 'producto';
        productosDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
            <button onclick="AgregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        ListaProductos.appendChild(productosDiv);
    });
}

function RenderCarrito() {
    const CarritoProductos = document.getElementById('CarritoProductos');
    CarritoProductos.innerHTML = '';
    Carrito.forEach(item => {
        const ProductosEnCarrito = document.createElement('li');
        ProductosEnCarrito.textContent = `${item.nombre} - $${item.precio}`;
        CarritoProductos.appendChild(ProductosEnCarrito);
    });
    localStorage.setItem('Carrito', JSON.stringify(Carrito));
}

function AgregarAlCarrito(IDproducto) {
    const producto = mercaderia.find(el => el.id === IDproducto);
    Carrito.push(producto);
    RenderCarrito();
}

// Limpia el carrito una vez finalizada la compra y te sale el total a pagar

document.getElementById('ChequeoCompra').addEventListener('click', () => {
    const total = Carrito.reduce((suma, producto) => suma + producto.precio, 0);
    alert(`Total a pagar: $${total}`);
    localStorage.removeItem('Carrito');
    while (Carrito.length) {
        Carrito.pop();
    }
    RenderCarrito();
});

RenderMercaderia();
RenderCarrito();