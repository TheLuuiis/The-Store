'used strict'
// <    >  =>

    // Datos de productos
    const productos = [
        { nombre: 'Bicicleta 4x4', precio: '$26.000', imagen: './img/Bicicleta.jpg' },
        { nombre: 'Lentes de sol', precio: '$12.000', imagen: './img/Lentes de sol.jpg' },
        { nombre: 'Iphone 12', precio: '$38.000', imagen: './img/Iphone 12.jpg' },
        { nombre: 'Juego comedor', precio: '$140.000', imagen: './img/Juego comedor.jpg' }
    ];

    // Función para crear una card
    function crearCard(producto) {
        const cardContainer = document.getElementById('cardContainer');

        const card = document.createElement('div');
        card.className = 'card';

        const imagen = document.createElement('img');
        imagen.src = producto.imagen;
        imagen.alt = 'Avatar';
        imagen.width = '200';
        imagen.height = '200';

        const containerInfo = document.createElement('div');
        containerInfo.className = 'container-info';

        const titulo = document.createElement('h4');
        titulo.textContent = producto.nombre;

        const precio = document.createElement('p');
        precio.textContent = producto.precio;

        const boton = document.createElement('button');
        boton.textContent = 'Add car';

        // Agregar elementos al DOM
        containerInfo.appendChild(titulo);
        containerInfo.appendChild(precio);
        containerInfo.appendChild(boton);

        card.appendChild(imagen);
        card.appendChild(containerInfo);

        cardContainer.appendChild(card);
    }

    // Iterar sobre los productos y crear las cards
    productos.forEach(crearCard);

/* Responsive Desing Menú */
const bar = document.querySelector(".fa-bars");
const menu = document.querySelector(".menu");

bar.addEventListener("click", () => {
  menu.classList.toggle("show-menu");
});

/* Validar formulario */
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

/* Expreisones regulares */
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
    precio: /^.{1,20}$/, 
    inventario: /^.{1,20}$/,
}

const campos = {
    nombre: false,
    precio: false,
    inventario: false,
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "precio":
            validarCampo(expresiones.precio, e.target, 'precio');
            break;
        case "inventario":
            validarCampo(expresiones.inventario, e.target, 'inventario');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos');
    if (campos.nombre && campos.precio && campos.inventario && terminos.checked) {
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});
