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
    if (!validateState(curpValue.substring(11, 13))) errors.push("El estado no es valido");
    // console.log(estado);
    // if (estado) errors.push("El estado no es valido");
    // let a: number = curpValue.substring(4, 6);
    // let m: number = curpValue.substring(6, 8);
    // let d: number = curpValue.substring(8, 10);
    // let bornDate: Date = new Date(a, m - 1, d);
    // console.log(bornDate);
    // if (bornDate > new Date()) errors.push("La fecha de nacimiento no es valida");

    validateTxt(curpValue.substring(0, 4)) ? console.log('Es texto') : errors.push("El primer grupo de caracteres no es texto");

    //RFC Validations
    if (rfcValue === "") errors.push("El RFC es obligatorio");
    if (rfcValue.length < 12)
        errors.push(
            "El RFC debe tener 12 caracteres, son menos de 12 : " + rfcValue.length
        );

    // Mostramos los errors y Enviamos formulario
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
        errores.map((mensaje) => {
            // Creamos nuevo LI
            let nuevoLi = document.createElement("li");
            spanError.appendChild(nuevoLi);
            nuevoLi.textContent = mensaje;
            console.log(mensaje);
        });
        return true;
    }
    return false;
}
/**
 * Retorna los estados de México
 * @function api - Estados[ {clave: string, nombre: string} ]
 */
async function getEstados(): Promise<EstadosInterface[]> {
    const response = await fetch(uri);
    const data = await response.json();
    return data;
}

function validateState(state: string): boolean {
    let estado: boolean;
    getEstados().then(async (data) => {
        data.map(({ clave }) => {
            if (clave === state) {
                estado = true;
            }
        });
    });
    console.log(estado);
    return estado;
}


/**
 * Retorna los estados de México
 * @function Valida los primeros textos del CURP
 */
function validateTxt(txt: string): boolean {
    let cadenaNumero: number;
    cadenaNumero = parseInt(txt);
    if (isNaN(cadenaNumero)) return true;
}
//======================================================================
// EVENTOS
//======================================================================

btnValidar.addEventListener("click", sendForm);
