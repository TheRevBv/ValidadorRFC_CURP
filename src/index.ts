/*
    ===== Código de TypeScript =====
*/
//Importaciones
import { EstadosInterface } from "./interface/estadosInterface";

//======================================================================
// Variables globales y constantes
//======================================================================
const btnValidar: HTMLButtonElement = document.querySelector("#btnValidar");
const curp: HTMLInputElement = document.querySelector("#curp-input");
const divValidar: HTMLDivElement = document.querySelector("#divValidar");
const rfc: HTMLInputElement = document.querySelector("#rfc-input");
const spanError: HTMLSpanElement = document.querySelector("#spanError");
const uri: string = "http://localhost:8081/src/api/estados-mexico.json";
//======================================================================
// FUNCIONES
//======================================================================

/**
 * Método que valida y enviar el formulario
 */
const sendForm = (): void => {
    // Variables
    let errors: string[] = [];
    let curpValue: any = curp.value.toUpperCase();
    let rfcValue: any = rfc.value.toUpperCase();

    //// Es obligatorio
    //CURP Validations
    if (curpValue === "") errors.push("El CURP es obligatorio");
    if (curpValue.length < 18)
        errors.push(
            "El CURP debe tener 18 caracteres, son menos de 18 : " + curpValue.length
        );
    if (curpValue.substring(10, 11) != "M" && curpValue.substring(10, 11) != "H")
        errors.push("El sexo o genero no es valido");
    getEstados().then((data) => {
        data.forEach((estado) => {
            estado.clave == curpValue.substring(11, 13) ?
                'Estados Valido'
                : errors.push("El estado no es valido");
        });
    });
    if (isNaN(curpValue.substring(0, 3)))

        //RFC Validations
        if (rfcValue === "") errors.push("El RFC es obligatorio");
    if (rfcValue.length < 12)
        errors.push(
            "El RFC debe tener 12 caracteres, son menos de 12 : " + rfcValue.length
        );

    // Mostramos los errors
    // Enviamos formulario
    if (!handleErrors(errors)) alert("Curp y RFC valido");
};
/**
 * Imprime todos los errores en el Span
 * @param errores Array - Frases de error
 */
function handleErrors(errores: string[]): boolean {
    // Limpiamos los errores anteriores en HTML
    spanError.textContent = "";
    if (errores.length > 0) {
        divValidar.classList.remove("hidden");
        divValidar.classList.add("block");
        // Generamos todos LI con su mensaje
        errores.forEach(function (mensaje) {
            // Creamos nuevo LI
            let nuevoLi = document.createElement("li");
            spanError.appendChild(nuevoLi);
            nuevoLi.textContent = mensaje + "\n";
            console.log(mensaje);
        });
        return true;
    }
    return false;
}

async function getEstados(): Promise<EstadosInterface[]> {
    const response = await fetch(uri);
    const data = await response.json();
    return data;
}
//======================================================================
// EVENTOS
//======================================================================

btnValidar.addEventListener("click", sendForm);
// async function apiEstados<EstadosInterface>(url: string): Promise<EstadosInterface> {
//     const response = await fetch(url);
//     // const data = await response.json();
//     // console.log(response.json());
//     return await response.json();

// }
