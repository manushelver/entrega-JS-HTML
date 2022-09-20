const formulario = document.getElementById("formulario");
const historial = [];
class conversion{
    constructor(tipoIn,numero,result){
        this.tipoIn = tipoIn;
        this.numero = numero;
        this.resultado = result;
    }
}



formulario.addEventListener("submit",(e) => {
    e.preventDefault(); //Se evita que el boton refresque pagina.
    const Tipo = document.getElementById("Tipo").value; // por si quiero guardar los datos ingresados
    console.log(Tipo.valor);
    const In = document.getElementById("In").value;
    const resultado = convertir(In,Tipo);
    const operacion = new conversion(Tipo,In,resultado);
    historial.push(operacion);
    console.log("Submit");
    formulario.reset(); // Para que el formulario se borre
});

const contenedorHistorial = document.getElementById("contenedorHistorial");

const verHistorial = document.getElementById("verHistorial");

verHistorial.addEventListener("click",() => {
    mostrarHistorial();
});

function mostrarHistorial() {
    contenedorHistorial.innerHTML = ""; //Para que se resetee el contenedor
    historial.forEach(operacion => {
        const div = document.createElement("div");
        div.innerHTML = `
                        <div>
                            <p>Tipo de entrada: ${operacion.tipoIn}</p>
                            <p>Numero ingresado: ${operacion.numero}</p>
                            <p>Numero resultado: ${operacion.resultado}</p>
                        </div>
                        `;
        contenedorHistorial.appendChild(div);
    })
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