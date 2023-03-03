const tasasDeCambio = [
    { moneda: "usd", tasa: 380, simbolo: "$", nombre: "Dólar Estadounidense" },
    { moneda: "euro", tasa: 410, simbolo: "€", nombre: "Euro" },
    { moneda: "real", tasa: 83, simbolo: "R$", nombre: "Real Brasileño" },
    { moneda: "gbp", tasa: 450, simbolo: "£", nombre: "Libra Esterlina" },
];

const monedasAceptadas = ["usd", "euro", "real", "gbp"];

const cotizarButton = document.getElementById("cotizar");
const resultadoDiv = document.getElementById("resultado");
const errorDiv = document.getElementById("error");
const historialDiv = document.getElementById("historial");
const cotizaciones = [];

function guardarDatos() {
    localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones));
}

function cargarDatos() {
    const data = localStorage.getItem("cotizaciones");
    if (data) {
        cotizaciones.push(...JSON.parse(data));
        actualizarHistorial();
    }
}

cargarDatos();

cotizarButton.addEventListener("click", () => {
    const moneda = document.getElementById("moneda").value;
    const monto = parseInt(document.getElementById("monto").value);

    if (isNaN(monto) || monto <= 0) {
        errorDiv.innerText = "Monto no válido, el monto debe ser un número y positivo";
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
        errorDiv.innerText = "Ha ocurrido un error. Inténtalo de nuevo.";
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

    resultadoDiv.innerHTML = `
      <p>Nueva cotización:</p>
      <p>Monto a cotizar: ${tasa.simbolo}${monto}</p>
      <p>Moneda: ${tasa.nombre}</p>
      <p>Total en pesos: $${total}</p>
    `;

    errorDiv.innerHTML = "";

    actualizarHistorial();
});

function actualizarHistorial() {
    historialDiv.innerHTML = "";
    cotizaciones.forEach((cotizacion, index) => {
        const cotizacionDiv = document.createElement("div");
        cotizacionDiv.innerHTML = `
        <p>Cotización anterior:</p>
        <p>Monto cotizado: ${cotizacion.monto} ${cotizacion.moneda}</p>
        <p>Total en pesos: $${cotizacion.total}</p>
        <p>Fecha: ${cotizacion.fecha.toLocaleString()}</p>
      `;
        const borrarHistorialButton = document.getElementById("borrarHistorial");
        borrarHistorialButton.addEventListener("click", () => {
            cotizaciones.length = 0;
            actualizarHistorial();
        });

        const limpiarBtn = document.createElement("button");
        limpiarBtn.innerText = "Limpiar";
        limpiarBtn.addEventListener("click", () => {
            cotizaciones.splice(index, 1);
            guardarDatos();
            actualizarHistorial();
        });

        cotizacionDiv.appendChild(limpiarBtn);
        historialDiv.appendChild(cotizacionDiv);
    });
}

actualizarHistorial();