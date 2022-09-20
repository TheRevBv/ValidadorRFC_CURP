/*
    ===== Código de TypeScript =====
*/
//======================================================================
// Variables globales y constantes
//======================================================================
const botonGuardarCurp: HTMLButtonElement = document.querySelector('#btnCurp');
const botonGuardarRfc: HTMLButtonElement = document.querySelector('#btnRfc');
const curp: HTMLInputElement = document.querySelector('#curp-input');
const erroresRfc: HTMLSpanElement = document.querySelector('#errorR');
const erroresCurp: HTMLSpanElement = document.querySelector('#errorC');
const formularioCurp: HTMLFormElement = document.querySelector('#formCurp');
const formularioRfc: HTMLFormElement = document.querySelector('#formRfc');
const rfc: HTMLInputElement = document.querySelector('#rfc-input');
const spanCurp: HTMLDivElement = document.querySelector('#spanCurp');
const spanRfc: HTMLDivElement = document.querySelector('#spanRfc');

//======================================================================
// FUNCIONES
//======================================================================

/**
 * Método que valida y enviar el formulario
 */
const enviarFormularioCurp = (): void => {

    // Variables
    let errores: string[] = []

    //// Es obligatorio
    if (curp.value === '') errores.push('El CURP es obligatorio')
    if (curp.value.length < 18) errores.push('El CURP debe tener 18 caracteres, son menos de 18 : ' + curp.value.length)

    // Mostramos los errores
    imprimirErroresCurp(errores)

    // Enviamos formulario
    if (errores.length === 0) alert('Curp correcto y valido')
}

const enviarFormularioRfc = (): void => {

    // Variables
    let errores: string[] = []

    //// Es obligatorio
    if (rfc.value === '') errores.push('El CURP es obligatorio')
    if (rfc.value.length < 18) errores.push('El RFC debe tener 12 caracteres, son menos de 12 : ' + rfc.value.length)

    // Mostramos los errores
    imprimirErroresRfc(errores)

    // Enviamos formulario
    if (errores.length === 0) console.log('Rfc correcto y valido')
}

/**
 * Imprime todos los errores en el UL
 * @param errores Array - Frases de error
 */
function imprimirErroresCurp(errores: string[]): void {
    // Limpiamos los errores anteriores en HTML
    erroresCurp.textContent = ''
    if (errores.length > 0) {
        spanCurp.classList.remove('hidden');
        spanCurp.classList.add('block');
        // Generamos todos LI con su mensaje
        errores.forEach(function (mensaje) {
            // Creamos nuevo LI
            // let nuevoLi = document.createElement('br')
            erroresCurp.textContent = mensaje + '\n';
            console.log(mensaje);
        })
    }
}
/**
 * Imprime todos los errores en el UL
 * @param errores Array - Frases de error
 */
function imprimirErroresRfc(errores: string[]): void {
    // Limpiamos los errores anteriores en HTML
    erroresRfc.textContent = ''
    if (errores.length > 0) {
        spanRfc.classList.remove('hidden');
        spanRfc.classList.add('block');
        // Generamos todos LI con su mensaje
        errores.forEach(function (mensaje) {
            // Creamos nuevo LI
            // let nuevoLi = document.createElement('br')
            erroresRfc.textContent = mensaje + '\n';
            console.log(mensaje);
        })
    }
}
//======================================================================
// EVENTOS
//======================================================================

botonGuardarCurp.addEventListener('click', enviarFormularioCurp)
botonGuardarRfc.addEventListener('click', enviarFormularioRfc)
