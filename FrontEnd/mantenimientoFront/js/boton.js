class Boton extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const sd = this.attachShadow({mode: 'closed'});

        const contenedor = document.createElement('div');
        contenedor.id = 'id_contenedor';

        const nuevoBoton = document.createElement('button');
        nuevoBoton.id = 'id_boton';

        let estiloBoton = function(texto){
            nuevoBoton.innerHTML = texto;
            nuevoBoton.style.fontFamily = '#Gill Sans", sans-serif';
            nuevoBoton.style.color ="#A5A5AF";
            nuevoBoton.style.padding = '4px 7px';
            nuevoBoton.style.borderRadius = '15px';
            nuevoBoton.style.border = '2px solid #ccc';
            contenedor.appendChild(nuevoBoton);
            sd.appendChild(contenedor);
        }

        estiloBoton(this.getAttribute('texto'));
    }
}
window.customElements.define('boton-tpi', Boton);
export default Boton;