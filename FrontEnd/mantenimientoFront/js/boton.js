import GetForm from "./getForm.js";

class Boton extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const sd = this.attachShadow({mode: 'closed'});

        const contenedor = document.createElement('div');
        contenedor.id = 'id_contenedor';

        const nuevoBoton = document.createElement('input')
        nuevoBoton.id = 'id_boton';
        nuevoBoton.type = 'button';

        let estiloBoton = function(texto){
            nuevoBoton.value = texto;
            nuevoBoton.style.fontFamily = '#Gill Sans", sans-serif';
            //nuevoBoton.onclick = GetForm.recolectarDatos();
            contenedor.appendChild(nuevoBoton);
            sd.appendChild(contenedor);
        }

        estiloBoton(this.getAttribute('texto'));
    }
}
window.customElements.define('boton-tpi', Boton);
export default Boton;