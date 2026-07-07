// Variable global para almacenar todos los productos
let listaProductos = [];

// Función para renderizar los productos
function renderizarProductos(productos) {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = ''; 
    
    if (!productos || productos.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; width:100%;">No se encontraron productos con ese código.</p>';
        return;
    }
    
    productos.forEach(producto => {
        const div = document.createElement('div');
        // Clase dinámica para el estilo CSS (disponible/agotado)
        div.className = `producto ${producto.estado.toLowerCase()}`;
        
        const esDisponible = producto.estado.toUpperCase() === 'DISPONIBLE';
        
        // Mensaje directo de intención de compra
        const mensaje = `Hola, quiero reservar el producto con código: ${producto.id}. ¡Hey, quiero este calzado!`;
        
        // La variable es necesaria para construir el enlace dinámico correctamente
        const enlaceWp = `https://wa.me/34633531674?text=${encodeURIComponent(mensaje)}`;
        
        // Lógica del botón: "Reservar" para disponibles, botón deshabilitado para agotados
        const botonHTML = esDisponible 
            ? `<a href="${enlaceWp}" target="_blank" class="btn-reservar">Reservar</a>`
            : `<button class="btn-agotado" disabled>Agotado</button>`;
        
        div.innerHTML = `
            <img src="assets_botines/${producto.imagen}" alt="Código ${producto.id}">
            <h3>${producto.id}</h3>
            <p>Modelo: ${producto.nombre}</p>
            <p><strong>Estado: ${producto.estado.toUpperCase()}</strong></p>
            ${botonHTML}
        `;
        contenedor.appendChild(div);
    });
}

// Carga del catálogo
fetch('catalogo_botines.json')
    .then(response => response.json())
    .then(data => {
        listaProductos = data.productos || data; 
        renderizarProductos(listaProductos);
    })
    .catch(error => console.error('Error en carga de catálogo:', error));

// Buscador alfanumérico robusto
const buscador = document.getElementById('buscador');
if (buscador) {
    buscador.addEventListener('input', (e) => {
        const termino = e.target.value.trim().toLowerCase();
        if (termino === "") {
            renderizarProductos(listaProductos);
            return;
        }
        const filtrados = listaProductos.filter(p => 
            String(p.id).toLowerCase().includes(termino)
        );
        renderizarProductos(filtrados);
    });
}
