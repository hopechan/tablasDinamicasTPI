class TablaBusqueda extends HTMLElement{
    constructor(){
        super();
        this._busquedas = null;
        this._metodo = null;
    }

    connectedCallback(){
        //sd -> shadowDom
        const sd = this.attachShadow({mode:'open'});
        sd.innerHTML = `<style>
        table{
          width: 100%;
          background-color: #ffffff;
          border-collapse: collapse;
          border-width: 2px;
          border-color: #636bf3;
          border-style: solid;
          color: #000000;
        }

        td, th {
          border-width: 2px;
          border-color: #636bf3;
          border-style: solid;
          padding: 3px;
        }

        th {
          background-color: #479600;
        }
        tr:hover {background-color:#f5f5f5;}
        </style>
        <div>
            <slot entidad = 'entidad'></slot>
        </div>`

        const contenedor = document.createElement('div');
        contenedor.id = 'tablaContenedor';

        let tabla = document.createElement('table');
        tabla.id = 'tablaEntidad'

        let cabecera = document.createElement('th');
        cabecera.id = 'cabeceraEntidad'

        let celda = document.createElement('td');
        celda.id = 'celdaEntidad';

        //Recibe un json con la busqueda deseada
        let crearTablaEntidad = function(busquedas, paginacion){
          let maxPage = Math.ceil(busquedas.length / paginacion); //AA
          let actualPageNumber = 1; //AA

          var renderPagination = function() {
            sd.innerHTML = `<style>
            table{
              width: 100%;
              background-color: #ffffff;
              border-collapse: collapse;
              border-width: 2px;
              border-color: #636bf3;
              border-style: solid;
              color: #000000;
            }

            td, th {
              border-width: 2px;
              border-color: #636bf3;
              border-style: solid;
              padding: 3px;
            }

            th {
              background-color: #479600;
            }
            tr:hover {background-color:#f5f5f5;}
            </style>
            <div>
                <slot entidad = 'entidad'></slot>
            </div>`
            
            let changePage = function(option) {
              if (this.innerText == '<<') {
                actualPageNumber = 1;
                renderPagination();
                this.disabled = true;
              } else if (this.innerText == '<') {
                if (actualPageNumber != 1) {
                  actualPageNumber--;
                  renderPagination();
                }
              } else if (this.innerText == '>') {
                if (actualPageNumber != maxPage) {
                  actualPageNumber++;
                  renderPagination();
                }
              } else {
                actualPageNumber = maxPage;
                renderPagination();
                this.disabled = true;
              }
            }

            let contenedor = document.createElement('div');
            contenedor.id = 'tablaContenedor';

            let tabla = document.createElement('table');
            tabla.id = 'tablaEntidad'

            let cabecera = document.createElement('th');
            cabecera.id = 'cabeceraEntidad'

            let celda = document.createElement('td');
            celda.id = 'celdaEntidad';

            let columna = [];

            for(var i = 0; i < busquedas.length; i++){
                for(var key in busquedas[i]){
                    if(columna.indexOf(key) === -1){
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

        let maxIndex = actualPageNumber == maxPage ? busquedas.length : paginacion * actualPageNumber;

        for(var i = paginacion * actualPageNumber - paginacion; i < maxIndex; i++){ //AA
            tr = tabla.insertRow(-1);
            for(var j = 0; j < columna.length; j++){
                var newCelda = tr.insertCell(-1);
                newCelda.innerHTML = busquedas[i][columna[j]];
            }
        }
        contenedor.appendChild(tabla);
        let buttonFirst = document.createElement("button"); //AA
        let buttonPrevious = document.createElement("button"); //AA
        let buttonNext = document.createElement("button"); //AA
        let buttonLast = document.createElement("button"); //AA
        let span = document.createElement("span");
        buttonFirst.innerText = "<<"; //AA
        buttonFirst.onclick = changePage;
        buttonPrevious.innerText = "<"; //AA
        buttonPrevious.onclick = changePage;
        buttonNext.innerText = ">" //AA
        buttonNext.onclick = changePage;
        buttonLast.innerText = ">>"; //AA
        buttonLast.onclick = changePage;
        span.innerText = "Page " + actualPageNumber + " of " + maxPage; //AA
        contenedor.appendChild(buttonFirst); //AA
        contenedor.appendChild(buttonPrevious); //AA
        contenedor.appendChild(span); //AA
        contenedor.appendChild(buttonNext); //AA
        contenedor.appendChild(buttonLast); //AA
        sd.appendChild(contenedor);
          }

            renderPagination();
        }

        let accion = function(entidad, metodo, paginacion){// AA
            fetch(`http://localhost:8080/SistemaTPI135-web-1.0-SNAPSHOT/webresources/${entidad}/${metodo}`).then(function(respuesta) {
                // Convertir a JSON
                return respuesta.json();
              }).then(function(j) {
                // Ahora 'j' es un objeto JSON
                crearTablaEntidad(j, paginacion); //AA
                console.log(j);
              });
        }
        accion(this.getAttribute("busqueda"), this.getAttribute("metodo"), this.getAttribute("paginacion")); //AA
    }
}
window.customElements.define('tabla-dinamica', TablaBusqueda);
