const formulario = document.getElementById("formulario");
const historial = [];
class conversion{
    constructor(tipoIn,numero,result,tipoOut){
        this.tipoIn = tipoIn;
        this.numero = numero;
        this.resultado = result;
        this.tipoOut = tipoOut;
    }
}

//Planeo modificar para poder elegir entrada y resultado pero por ahora dejo asi como esta para probar si uso bien el localstorage.
// Tambien voy a agregar posibilidad de hacer sort y demas cosas con el historial

formulario.addEventListener("submit",(e) => {
    e.preventDefault(); //Se evita que el boton refresque pagina.
    
    const Tipo = document.getElementById("Tipo").value; 
    const In = document.getElementById("In").value;
    const resultado = convertir(In,Tipo);
    const tipoOut = opuesto(Tipo);
    const operacion = new conversion(Tipo,In,resultado,tipoOut);
    
    historial.push(operacion);
    localStorage.setItem("historial",JSON.stringify(historial));
    mostrarResultado(operacion);
    formulario.reset(); // Para que el formulario se borre
});

const contenedorHistorial = document.getElementById("contenedorHistorial");

const verHistorial = document.getElementById("verHistorial");

verHistorial.addEventListener("click",() => {
    mostrarHistorial();
});

borrarHistorial.addEventListener("click", () =>{
    localStorage.clear();
    historial.splice(0,historial.length);
    contenedorHistorial.innerHTML = "";
});

function mostrarHistorial() {
    contenedorHistorial.innerHTML = ""; //Para que se resetee el contenedor
    const historialLocal = JSON.parse(localStorage.getItem("historial"));
    historialLocal.forEach(operacion => {
        const div = document.createElement("div");
        div.innerHTML = `
                        <div style="border: thick solid black">
                            <p>Tipo de entrada: ${operacion.tipoIn}</p>
                            <p>Numero ingresado: ${operacion.numero}</p>
                            <p>Tipo de resultado: ${operacion.tipoOut}</p>
                            <p>Numero resultado: ${operacion.resultado}</p>
                        </div>
                        `;
        contenedorHistorial.appendChild(div);
    })
}

const resultado = document.getElementById("resultado");

const mostrarResultado = (operacion) => {
    let aux ="";
    aux += `<p class="resultado"> Resultado: </p>
            <p class="resultado"> ${operacion.tipoOut}: ${operacion.resultado} </p>`
    resultado.innerHTML = aux;
}

function convertir (valor, tipo){
    let res;
    switch (tipo){
        case "Gramo":
            res = valor/453.6;
            break;
        case "Milla":
            res = valor*1609;
            break;
        case "Metro":
            res = valor/1609
            break;
        case "Libra":
            res = valor *453.6;
            break;
    }
    return res;
}

function opuesto (tipo){
    let res;
    switch (tipo){
        case "Gramo":
            res = "Libra"
            break;
        case "Milla":
            res = "Metro"
            break;
        case "Metro":
            res = "Milla"
            break;
        case "Libra":
            res = "Gramo"
            break;
    }
    return res;
}