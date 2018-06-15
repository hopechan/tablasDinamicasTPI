import RestController from "./restController.js";

class TextBox extends HTMLElement{
    /**
     * Webcomponet con mayor utilidad que el de Barra :v
     * Crea un campo de texto con el tipo de validacion
     * que se desee
     */
    constructor(){
        super();
    }

    connectedCallback(){
        const sd = this.attachShadow({mode:'closed'});
        const contenedor = document.createElement('div');
        contenedor.id = 'id_contenedor';

        const estilo = `
        <style>
            input:invalid {
                border: 1px solid red;
            }
            input:valid {
                border: 1px solid green;
            }

            input:required:invalid {
                border: 1px solid red;
            }
            input:required:valid {
            border: 1px solid green;
            }

            input{
                font-family: "Gill Sans", sans-serif;
            }
            </style>`;
        sd.innerHTML = estilo;
        //Metodo que crea el input validado
        let crearEntrada = function(opcion){
            switch (opcion) {
                case 'numerico':
                var nuevoInput = esNumero();
                contenedor.appendChild(nuevoInput);
                sd.appendChild(contenedor);
                    break;
                case 'alfabetico':
                var nuevoInput = esLetra();
                contenedor.appendChild(nuevoInput);
                sd.appendChild(contenedor);
                    break;
                case 'telefono':
                var nuevoInput = esTelefono();
                contenedor.appendChild(nuevoInput);
                sd.appendChild(contenedor);
                    break;
                case 'correo':
                var nuevoInput = esCorreo();
                contenedor.appendChild(nuevoInput);
                sd.appendChild(contenedor);
                    break;
                case 'boton':
                var nuevoInput = esBoton();
                nuevoInput.value = 'Enviar';
                nuevoInput.addEventListener("click", e=>{
                    datosFormulario();
                });
                contenedor.appendChild(nuevoInput);
                sd.appendChild(contenedor);
                    break;
                default:
                    break;
            }
        }

        let esNumero = function(){
            const entrada = document.createElement('input');
            entrada.type = 'number';
            entrada.step = 0;
            entrada.pattern = /[0-9]+/;
            entrada.title = 'Solo se puede ingresar numeros';
            estiloEntrada(entrada);
            return entrada;
        }

        let esLetra = function(){
            const entrada = document.createElement('input');
            entrada.type = 'text';
            entrada.pattern = /[a-zA-Z]+/;
            entrada.title = 'Solo se puede ingresar letras';
            estiloEntrada(entrada);
            return entrada;
        }

        let esTelefono = function(){
            const entrada = document.createElement('input');
            entrada.type = 'number';
            entrada.pattern = /^[2|6|7][0-9]{7}/;
            entrada.title = 'El numero de telefono debe empezar por 2,6 ó 7 y debe ser de 8 digitos';
            estiloEntrada(entrada);
            return entrada;
        }

        let esCorreo = function(){
            const entrada = document.createElement('input');
            entrada.type = 'text';
            entrada.pattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
            entrada.title = 'Se debe ingresar un email valido';
            estiloEntrada(entrada);
            return entrada;
        }

        let esBoton = function(){
            const entrada = document.createElement('input');
            entrada.type = 'button';
            return entrada;
        }

        let estiloEntrada = function(elemento){
            //var elemento = document.createElement('input');
            elemento.style.width = '500px';
            elemento.style.border = '2px solid #ccc';
            elemento.style.borderRadius = '15px';
            elemento.style.fontSize = '20px';
            elemento.style.padding = '4px 7px';
            elemento.style.outline = '0';
            elemento.style.borderColor = '#A5A5AF';
        }

        let datosFormulario = function(){
            let peticionID
            let origenPeticion = document.querySelector('combobox-tpi[entidad="origenPeticion"]').value
            let fechaPeticion = document.querySelector(`input[type="date"]`).value
            //var solicitante_data = document.getElementByName('solicitante').value;
            let observaciones = document.getElementById("observaciones").value
            //var area_data = document.getElementByName('area').value;
            let equipo = document.querySelector('combobox-tpi[entidad="equipo"]').value
            let tipoMtto = document.querySelector('combobox-tpi[entidad="tipoMantenimiento"]').value
            let encargadoMtto = document.querySelector('combobox-tpi[entidad="personalMantenimiento"]').value
            //var tipo_data = document.getElementByName('tipo_mantenimiento').value;
            let ordenTrabajoID

            let origen = () => {
                RestController.findByName('origen', origenPeticion).then((data) => {
                    console.log(data)
                    origenPeticion = data.id
                })
            }

            let getTipoMtto = () => {
                RestController.findByName('tipoMantenimiento', tipoMtto).then((data) => {
                    console.log(data)
                    tipoMtto = data.id
                })
            }

            let getEncargadoMtto = () => {
                RestController.findByName('personalMantenimiento', encargadoMtto).then((data) => {
                    console.log(data)
                    encargadoMtto = data.id
                })
            }

            let getPeticionID = () => {
                RestController.findAll('peticion').then((data) => {
                    peticionID = data[data.length].id + 1
                })
            }

            let getOrdenTrabajoID = () => {
                RestController.findAll('ordenTrabajo').then((data) => {
                    console.log(data)
                    ordenTrabajoID = data[data.length].id + 1
                })
            }

            origen()
            getTipoMtto()
            getEncargadoMtto()
            getPeticionID()
            getOrdenTrabajoID()

            let peticion = {
                id : peticionID,
                idOrigen: origenPeticion,
                fecha: fechaPeticion,
                observaciones: observaciones
            }

            let detallePeticionJSON = {
                idPeticion: peticionID,
                idEquipo: equipo,
                observaciones: observaciones
            }

            let ordenTrabajo = {
                id: ordenTrabajoID,
                idPeticion: peticionID,
                idEquipo: equipo,
                fechaEntrada: fechaPeticion,
                fechaSalida: null,
                idEncargadoMtto: encargadoMtto,
                idTipoMtto: tipoMtto,
                idEstado: 1
            }

            console.log(peticion)
            console.log(detallePeticionJSON)
            console.log(ordenTrabajo)
            RestController.create(peticion, 'peticion')
            RestController.create(detallePeticionJSON, 'detallePeticion')
            RestController.create(ordenTrabajo, 'ordenTrabajo')
        }

        crearEntrada(this.getAttribute("tipo"));
    }

}
window.customElements.define('input-tpi', TextBox);
export default TextBox;