class Catalogo {
    constructor (id, titulo, precio, descripcion) {
        this.id = id;
        this.titulo = titulo;
        this.precio = precio;
        this.descripcion = descripcion;
    }
        
}

class CatalogoManager {
    constructor() {
        this.catalogoProductos = JSON.parse(localStorage.getItem("catalogoProductos")) || [];
    }

    save() {
        localStorage.setItem("catalogoProductos", JSON.stringify(this.catalogoProductos));
    }

    add(catalogos) {
        this.catalogoProductos.push(catalogos);
        this.save();
    }

    update(updateCatalogo) {
        this.catalogoProductos = this.catalogoProductos.map(c => c.id === updateCatalogo.id ? updateCatalogo : c);
        console.log("Actualizando:", updateCatalogo);
        this.save();
    }

    delete(id) {
        this.catalogoProductos = this.catalogoProductos.filter(c => c.id !== id);
        this.save();
    }

    getAll() {
        return this.catalogoProductos;
    }
}

const manager = new CatalogoManager();
const form = document.getElementById("formulario");
const productList = document.getElementById("listaProducto");
const inputId = document.getElementById("id");
const inputNombre = document.getElementById("titulo");
const inputPrecio = document.getElementById("precio");
const inputDescripcion = document.getElementById("descripcion");

function modificarCatalogo() {
    productList.innerHTML = "";
    manager.getAll().forEach(catalogos => {
        const row = document.createElement("tr");

            row.innerHTML = `
            <td data-label="ID">${catalogos.id}</td>
            <td data-label="Nombre">${catalogos.titulo}</td>
            <td data-label="Precio">$${catalogos.precio}</td>
            <td data-label="Descripcion">${catalogos.descripcion}</td>
            <td class="actions">
                <button onclick="editCatalogo(${catalogos.id})">✏️ Editar</button>
                <button onclick="deleteCatalogo(${catalogos.id})">🗑️ Eliminar</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const id = inputId.value ? parseInt(inputId.value) : Date.now();
    const titulo = inputNombre.value;
    const precio = parseFloat(inputPrecio.value);
    const descripcion = inputDescripcion.value;

    if (inputId.value) {
        manager.update(new Catalogo(id, titulo, precio, descripcion));
    } else {
        manager.add(new Catalogo(id, titulo, precio, descripcion));
    }

    form.reset();
    inputId.value = "";
    modificarCatalogo();
});

function editCatalogo(id) {
    const catalogos = manager.getAll().find(c => c.id === id);
    inputId.value = catalogos.id;
    inputNombre.value = catalogos.titulo;
    inputPrecio.value = catalogos.precio;
    inputDescripcion.value = catalogos.descripcion;
    
}

function deleteCatalogo(id) {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
        manager.delete(id);
        modificarCatalogo();
    }
}

// Inicializar
modificarCatalogo();
