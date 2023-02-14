
alert("Bienvenido a MF Cambio, conversor de Divisas");

// Map tasas de cambio
const tasasDeCambio = new Map();
tasasDeCambio.set("usd", { tasa: 380, simbolo: 'U$D', nombre: "Dolar" });
tasasDeCambio.set("euro", { tasa: 410, simbolo: '€', nombre: "Euro" });
tasasDeCambio.set("real", { tasa: 83, simbolo: 'R$', nombre: "Real" });


// Array monedas aceptadas
const monedasAceptadas = ["usd", "euro", "real"];

// Función  calcular 
function cotizacion(monto, moneda) {
    if (tasasDeCambio.has(moneda)) {
        let tasa = tasasDeCambio.get(moneda);
        return `${monto * tasa.tasa}`;
    } else {
        return "Moneda no aceptada";
    }
}


let cotizar = "si";

while (cotizar === "si") {
    // Pedir moneda y monto a cotizar
    let moneda = prompt("Elige la moneda que quieres cotizar: usd, euro, real");
    moneda = moneda.toLowerCase();
    while (moneda != "usd" && moneda != "euro" && moneda != "real") {
        alert("Ingresa una moneda valida");
        moneda = prompt("Elige la moneda que quieres cotizar: usd, euro, real");
    }

    let monto = prompt("Ingresa el monto:");
    while (isNaN(monto)) {
        alert("Debe ingresar un monto en numeros");
        monto = prompt("Ingresa el monto");
    }
    monto = parseInt(monto);


    // Llama a la función cotizacion
    let total = cotizacion(monto, moneda);
    console.log("Nueva cotizacion");
    console.log(`Monto a cotizar: ${tasasDeCambio.get(moneda).simbolo} ${monto} `);
    console.log(`Moneda: ${tasasDeCambio.get(moneda).nombre} `);
    console.log("El total en pesos es:$", total);
    console.log("");

    // Pregunta si quiere cotizar de nuevo
    cotizar = prompt("¿Quieres cotizar de nuevo? si/no");
    cotizar = cotizar.toLowerCase();
    while (cotizar != "si" && cotizar != "no") {
        alert("Ingresa una opción valida");
        cotizar = prompt("¿Quieres cotizar de nuevo? si/no");
    }
}

alert("Gracias por usar el conversor");