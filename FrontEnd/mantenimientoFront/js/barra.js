class Barra extends HTMLElement{
    /**
     * Custom Element que crea una barra
     */
    constructor(){
        super();
    }

    connectedCallback(){
        const sd = this.attachShadow({mode: 'closed'}); 
        const contenedor = document.createElement('div');
        contenedor.id = 'id_barra';
        const lista_horizontal = document.createElement('ul');
        lista_horizontal.id = 'id_lista_horizontal';
        let lista_vertical = document.createElement('ul');
        lista_vertical.id = 'id_lista_vertical';
        let hover = `<style>
            * {
                font-family: "Gill Sans", sans-serif;
            }
            li a:hover {
                background-color: #A5A5AF;
                color: white;
            }
            li a {
                display: block;
                color: #000;
                padding: 32px 16px;
                text-decoration: none;
            }            
            </style>`;
            sd.innerHTML = hover;
        let estiloVertical = function(){
            lista_vertical.style.listStyleType = 'none';
            lista_vertical.style.margin = '0';
            lista_vertical.style.padding = '0';
            lista_vertical.style.width = '100px';
            lista_vertical.style.backgroundColor = '#57BC90';
            lista_vertical.style.position = 'fixed';
            lista_vertical.style.height = '100%';
            lista_vertical.style.overflow = 'auto';
            lista_vertical.style.boxShadow = '0 0 25px 0 #57BC90';
        }
        let barraVertical = function(){
            estiloVertical();
            var opciones = opcionesBarra();
            for (let index = 0; index < opciones.length; index++) {
                console.log(opciones[index]);
                lista_vertical.appendChild(opciones[index]);
            }
            contenedor.appendChild(lista_vertical);
        }
        
        let opcionesBarra = function(){
            var opcionPrincipal = document.createElement('li');
            var opcionSolicitud = document.createElement('li');
            var opcionHistorial = document.createElement('li');
            
            //Enlances 
            var enlacePrincipal = document.createElement('a');
            enlacePrincipal.href = 'index.html';
            enlacePrincipal.innerText = 'Principal';
            opcionPrincipal.appendChild(enlacePrincipal);
            
            var enlaceSolicitud = document.createElement('a');
            enlaceSolicitud.href = 'solicitud.html';
            enlaceSolicitud.innerText = 'Solicitud';
            opcionSolicitud.appendChild(enlaceSolicitud);

            var enlaceHistorial = document.createElement('a');
            enlaceHistorial.href = 'historial.html';
            enlaceHistorial.innerText = 'Historial';
            opcionHistorial.appendChild(enlaceHistorial);
            
            let opciones = [];
            opciones.push(opcionPrincipal);
            opciones.push(opcionSolicitud);
            opciones.push(opcionHistorial);
            return opciones;
        }
        //barraHorizontal();
        barraVertical();
        sd.appendChild(contenedor);
    }
}

window.customElements.define('barra-tpi', Barra);
export default Barra;