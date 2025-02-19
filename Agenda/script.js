const apiURL = 'http://www.raydelto.org/agenda.php';


function cargarHora() {
    setInterval(() => {
        const now = new Date().toLocaleTimeString('es-DO', { timeZone: 'America/Santo_Domingo' });
        document.getElementById('clock').innerText = now;
    }, 1000);
}


async function cargarContactos() {
    try {
        const respuesta = await fetch(apiURL);
        const contactos = await respuesta.json();
        const tbody = document.getElementById('contactos');
        tbody.innerHTML = '';

        contactos.forEach(contacto => {
            const fila = `<tr>
                            <td>${contacto.nombre}</td>
                            <td>${contacto.apellido}</td>
                            <td>${contacto.telefono}</td>
                          </tr>`;
            tbody.innerHTML += fila;
        });
    } catch (error) {
        console.error('Error al cargar los contactos:', error);
    }
}


document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;

    const nuevoContacto = { nombre, apellido, telefono };
    
    try {
        await fetch(apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoContacto)
        });
        cargarContactos();
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error('Error al guardar contacto:', error);
    }
});


function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}


const modal = document.getElementById("contactModal");
const btn = document.getElementById("verContactos");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
    cargarContactos();
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


document.getElementById("searchInput").addEventListener("keyup", function() {
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll("#contactos tr");

    rows.forEach(row => {
        let nombre = row.cells[0].textContent.toLowerCase();
        let apellido = row.cells[1].textContent.toLowerCase();
        let telefono = row.cells[2].textContent.toLowerCase();
        if (nombre.includes(filter) || apellido.includes(filter) || telefono.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});


cargarHora();
