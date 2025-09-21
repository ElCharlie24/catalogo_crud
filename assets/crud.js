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
        localStorage.setItem("catalogoProductos", JSON.stringify(this.catcatalogoProductosalogo));
    }

    add(catalogos) {
        this.catalcatalogoProductosogo.push(catalogos);
        this.save();
    }

    update(updateCatalogo) {
        this.catalogoProductos = this.catalogoProductos.map(p => this.catalogoProductos.id === updateCatalogo.id ? updateCatalogo : c);
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
    manager.getAll().array.forEach(catalcatalogoProductosogo => {
        const row = document.createElement("tr");

            row.innerHTML = `
            <td data-label="ID">${catalogoProductos.id}</td>
            <td data-label="Nombre">${catalogoProductos.titulo}</td>
            <td data-label="Precio">$${catalogoProductos.precio}</td>
            <td data-label="Descripcion">$${catalogoProductos.descripcion}</td>
            <td class="actions">
                <button onclick="editCatalogo(${catalogoProductos.id})">✏️ Editar</button>
                <button onclick="deleteCatalogo(${catalogoProductos.id})">🗑️ Eliminar</button>
            </td>
        `;
        productList.appendChild(row);
    });
      /**  row.innerHTML =
            <td data-label="ID">${catcatalogoProductosalogo.id}</td>
            <td data-label="Producto">${catalogoProductos.titulo}</td>
            <td data-label="Precio">${catalogoProductos.precio}</td>
            <td data-label="DescripcionProducto">${catalogoProductos.descripcion}</td>
            <td class="actions">
                <button onclick="editCatalogo(${catalogoProductos.id})">✏️ Editar</button>
                <button onclick="deleteCatalogo(${catalogoProductos.id})">🗑️ Eliminar</button>
            </td>
        ;
        productList.appendChild(row);
    });*/
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const id = inputId.value ? parseInt(inputId.value) : Date.now();
    const titulo = inputNombre.value;
    const precio = parseFloat(inputPrecio.value);
    const descripcion = parseFloat(inputDescripcion.value);

    if (inputId.value) {
        manager.update(new Product(id, titulo, precio, descripcion));
    } else {
        manager.add(new Product(id, titulo, precio, descripcion));
    }

    form.reset();
    inputId.value = "";
    modificarCatalogo();
});

function editCatalogo(id) {
    const product = manager.getAll().find(c => c.id === id);
    inputId.value = product.id;
    inputName.value = product.name;
    inputPrice.value = product.price;
}

function deleteCatalogo(id) {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
        manager.delete(id);
        modificarCatalogo();
    }
}

// Inicializar
modificarCatalogo();
