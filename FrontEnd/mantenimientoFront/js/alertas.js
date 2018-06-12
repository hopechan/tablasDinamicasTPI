class Alerta extends HTMLElement{
    /**
     * Alertas personalizadas
     */
    constructor(){
        super();
    }

    connectedCallback(){
        const sd = this.attachShadow({mode: 'closed'});

        const contenedor = document.createElement('div');
        contenedor.id = 'id_contenedor';

        const alerta = document.createElement('div');
        alerta.id = 'id_alerta';

        const hover = `<style>
            .cerrar:hover {
                color: black;
            }
            </style>`;
        sd.innerHTML = hover;
        /**
         * 
         * @param {String} tipoAlerta
         * @param {String} resaltado => palabra que se mostrara en negrita
         * @param {String} mensaje => Descripcion de lo que se desea comunicar
         */
        let setTipoAlerta = function(tipoAlerta, resaltado, mensaje){
            var span = document.createElement('span');
            estiloAlerta();
            alerta.innerHTML = cerrarAlerta();
            estiloBoton(span);
            span.className = 'cerrar';
            span.innerHTML = '&times';
            switch (tipoAlerta) {
                case 'exito':
                    alerta.style.backgroundColor = '#4CAF50';
                    alerta.className = 'alertaExito';
                    alerta.innerHTML = `<strong>${resaltado}</strong>&nbsp${mensaje}`;
                    break;
                case 'info':
                    alerta.style.backgroundColor = '#2271b3';
                    alerta.className = 'alertaInfo';
                    alerta.innerHTML = `<strong>${resaltado}</strong>&nbsp${mensaje}`;
                    break;
                case 'error':
                    alerta.style.backgroundColor = '#f44336';
                    alerta.className = 'alertaError';
                    alerta.innerHTML = `<strong>${resaltado}</strong>&nbsp${mensaje}`;
                    break;
                default:
                    break;
            }
            alerta.appendChild(span);
            contenedor.appendChild(alerta);
            sd.appendChild(contenedor);
        }

        let estiloAlerta= function(){
            alerta.style.padding = '20px';
            alerta.style.color = 'white';
            alerta.style.opacity = '1';
            alerta.style.transition = 'opacity 0.6s';
            alerta.style.marginBottom = '15px';
            alerta.style.fontFamily = '"Gill Sans", sans-serif';
        }

        let estiloBoton = function(etiqueta){
            etiqueta.style.marginLeft = '15px';
            etiqueta.style.color = 'white';
            etiqueta.style.fontWeight = 'bold';
            etiqueta.style.cssFloat = 'right';
            etiqueta.style.fontSize = '22px';
            etiqueta.style.lineHeight = '20px';
            etiqueta.style.cursor = 'pointer';
            etiqueta.style.transition = '0.3s';
        }

        let cerrarAlerta = function(){
            var cerrar = document.getElementsByClassName('cerrar');
            for (let index = 0; index < cerrar.length; index++) {
                cerrar[index].onclick = function(){
                    var div = this.parentElement;
                    div.style.opacity = '0';
                    setTimeout(function(){div.style.display = 'none';}, 600);
                }
            }
        }

        setTipoAlerta(this.getAttribute("tipo"), this.getAttribute("resaltado"), this.getAttribute("mensaje"));
    }
}
window.customElements.define('alerta-tpi', Alerta);
export default Alerta;