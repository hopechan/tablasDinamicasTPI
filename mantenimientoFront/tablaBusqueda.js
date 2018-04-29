class TablaBusqueda extends HTMLElement{
    constructor(){
        super();
        this._busquedas = null;
        this._metodo = null;
    }

    connectedCallback(){
        //sd -> shadowDom
        const sd = this.attachShadow({mode:'open'});
        const contenedor = document.createElement('div');
        contenedor.id = 'tablaContenedor';

        let tabla = document.createElement('table');
        tabla.id = 'tablaEntidad'

        let cabecera = document.createElement('th');
        cabecera.id = 'cabeceraEntidad'

        let celda = document.createElement('td');
        celda.id = 'celdaEntidad';

        let jsonEntidad = []

//Codigo basado en
//http://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm
        //Recibe un json con la busqueda deseada
        let crearTablaEntidad = function(busquedas){
            //extrayendo cabecera
            var columna = [];
            for(var i = 0; i < busquedas.length; i++){
                for(var key in busquedas[i]){
                    if(columna.indexOf(key) === -1){ //con -1 se obtiene la cabecera del array
                        columna.push(key);
                    }
                }
            }
        
            var tr = tabla.insertRow(-1);
        
        for(var i = 0; i < columna.length; i++){
            var th = document.createElement('th');
            th.innerHTML = columna[i];
            tr.appendChild(th);
        }

        for(var i = 0; i < busquedas.length; i++){
            tr = tabla.insertRow(-1);
            for(var j = 0; j < columna.length; j++){
                var celda = tr.insertCell(-1);
                celda.innerHTML = busquedas[i][columna[j]];
            }
        }
        contenedor.appendChild(tabla);
        sd.appendChild(contenedor);
        }

        let accion = function(entidad, metodo){
            fetch(`http://localhost:8080/SistemaTPI135-web-1.0-SNAPSHOT/webresources/${entidad}/${metodo}`).then(function(respuesta) {
                // Convertir a JSON
                return respuesta.json();
              }).then(function(j) {
                // Ahora 'j' es un objeto JSON
                crearTablaEntidad(j);
                console.log(j);
              });
        }
        accion(this.getAttribute('busqueda'), this.getAttribute('metodo'));
    }
}
window.customElements.define('tabla-dinamica', TablaBusqueda);