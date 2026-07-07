// Variable global para almacenar todos los productos
let listaProductos = [];

// Función para renderizar los productos: Formato directo sin prefijos innecesarios
function renderizarProductos(productos) {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = ''; 
    
    if (!productos || productos.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; width:100%;">No se encontraron productos con ese código.</p>';
        return;
    }
    
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = `producto ${producto.estado}`;
        
        // Mensaje directo y profesional
        const mensaje = `Hola, me interesa el producto con código: ${producto.id}. ¿Podrían ayudarme?`;
        const enlaceWp = `https://wa.me/34633531674?text=${encodeURIComponent(mensaje)}`;
        
        // Visualización limpia (sin "Ref.") tal como lo exige el flujo de la factura
        div.innerHTML = `
            <img src="assets_botines/${producto.imagen}" alt="Código ${producto.id}">
            <h3>${producto.id}</h3>
            <p>Modelo: ${producto.nombre}</p>
            <p><strong>Estado: ${producto.estado.toUpperCase()}</strong></p>
            <a href="${enlaceWp}" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp</a>
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
        // Buscamos coincidencia exacta con el valor ingresado (alfanumérico)
        const termino = e.target.value.trim().toLowerCase();
        
        if (termino === "") {
            renderizarProductos(listaProductos);
            return;
        }

        // Filtramos buscando que el ID contenga lo que el usuario digita
        const filtrados = listaProductos.filter(p => 
            String(p.id).toLowerCase().includes(termino)
        );
        
        renderizarProductos(filtrados);
    });
}