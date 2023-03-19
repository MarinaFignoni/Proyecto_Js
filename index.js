// Array de objetos
const tasasDeCambio = [
    { moneda: "usd", tasa: 380, simbolo: "$", nombre: "Dólares" },
    { moneda: "euro", tasa: 410, simbolo: "€", nombre: "Euros" },
    { moneda: "real", tasa: 83, simbolo: "R$", nombre: "Reales" },
    { moneda: "gbp", tasa: 450, simbolo: "£", nombre: "Libras" },
];

// Array monedas aceptadas
const monedasAceptadas = ["usd", "euro", "real", "gbp"];

const cotizarBtn = document.getElementById("cotizar");
const resultadoDiv = document.getElementById("resultado");
const errorDiv = document.getElementById("error");
const historialDiv = document.getElementById("historial");
const cotizaciones = [];

//storage&json
function guardarDatos() {
    localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones));
}

function cargarDatos() {
    const data = localStorage.getItem("cotizaciones");
    if (data) {
        cotizaciones.push(...JSON.parse(data));
        actualizarHist();
    }
}

//Monto a cotizar

cargarDatos();

cotizarBtn.addEventListener("click", () => {
    const moneda = document.getElementById("moneda").value;
    const monto = parseInt(document.getElementById("monto").value);

    if (isNaN(monto) || monto <= 0) {
        errorDiv.innerText = "Monto inválido";
        resultadoDiv.innerHTML = "";
        return;
    }

    if (!monedasAceptadas.includes(moneda)) {
        errorDiv.innerText = "Moneda no válida";
        resultadoDiv.innerHTML = "";
        return;
    }

    const tasa = tasasDeCambio.find((tasa) => tasa.moneda === moneda);

    if (!tasa) {
        errorDiv.innerText = "Ha ocurrido un error. Intenta nuevamente";
        resultadoDiv.innerHTML = "";
        return;
    }

    const total = monto * tasa.tasa;
    const cotizacion = {
        moneda: tasa.nombre,
        monto: monto,
        total: total,
        fecha: new Date()
    };
    cotizaciones.push(cotizacion);

    guardarDatos();

    //Resultado
    resultadoDiv.innerHTML = `
<p>Cotización</p>
<p>Monto a cotizar: ${tasa.simbolo}${monto}</p>
<p>Moneda: ${tasa.nombre}</p>
<p>Total en pesos: $${total}</p>
    `;

    errorDiv.innerHTML = "";

    actualizarHist();
});

// Historial
function actualizarHist() {
    historialDiv.innerHTML = "";
    cotizaciones.forEach((cotizacion, index) => {
        const cotizacionDiv = document.createElement("div");
        cotizacionDiv.style.marginTop = "20px"
        cotizacionDiv.innerHTML = `
        <p>Cotización anterior</p>
        <p>Monto cotizado: ${cotizacion.monto} ${cotizacion.moneda}</p>
        <p>Total en pesos: $${cotizacion.total}</p>
        <p>Fecha: ${cotizacion.fecha.toLocaleString()}</p>`;
        const borrarHistorialBtn = document.getElementById("borrarHistorial");

        //Librerias : Cartel de eliminar historial
        borrarHistorialBtn.addEventListener("click", () => {
            Swal.fire({
                title: '¿Estás seguro de borrar el historial?',
                text: "No podrás recuperarlo",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'green',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar'
            }).then((result) => {
                if (result.isConfirmed) {
                    cotizaciones.length = 0;
                    guardarDatos();
                    actualizarHist();
                    Swal.fire(
                        'Eliminado',
                        'El historial fue eliminado',
                        'success'
                    )
                }
            })


        });

        const limpiarBtn = document.createElement("button");
        limpiarBtn.innerText = "Eliminar";
        limpiarBtn.addEventListener("click", () => {
            cotizaciones.splice(index, 1);
            guardarDatos();
            actualizarHist();
        });

        cotizacionDiv.appendChild(limpiarBtn);
        historialDiv.appendChild(cotizacionDiv);
    });
}

actualizarHist();

//fetch-api

function mostrar_posicion(posicion) {
    let lat = posicion.coords.latitude;
    let long = posicion.coords.longitude;
    let key = "e16c76ddf0b4cdffb0e02afcbc07672e";

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("api_clima").innerHTML = `<p>${data.name}</p>
                                    <p>Temp:${data.main.temp}</p>
                                    <p>Clima:${data.weather[0].description}</p>`
        })
}

navigator.geolocation.getCurrentPosition(mostrar_posicion)