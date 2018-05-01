class TablaBusqueda extends HTMLElement {
  constructor() {
    super();
    this._busquedas = null;
    this._metodo = null;
  }

  connectedCallback() {
    //sd -> shadowDom
    const sd = this.attachShadow({ mode: 'open' });
    let style = `<style>
        * {
          font-family: "Gill Sans", sans-serif;
        }

        table{
          width: 100%;
          background-color: #FDF0D5;
        }

        td, th {
          text-align: center;
          padding: 3px;
        }

        th {
          background-color: #F0544F;
        }

        tr:hover {
          background-color:#C6D8D3;
        }

        #paginacionBar {
          text-align: center;
          margin-top: 20px;
        }

        #paginacionBar * {
          margin: 3px;
        }

        button {
          background-color: #C6D8D3;
          border-style: solid;
          border-width: 2px;
          border-color: #331832;
          border-radius: 5px;
          font-weight: bold;
          padding: 7px;
        }

        button:hover {
          background-color: #D81E5B;
        }
        </style>
        <div>
            <slot entidad = 'entidad'></slot>
        </div>`

    sd.innerHTML = style;

    const contenedor = document.createElement('div');
    contenedor.id = 'tablaContenedor';

    let tabla = document.createElement('table');
    tabla.id = 'tablaEntidad'

    let cabecera = document.createElement('th');
    cabecera.id = 'cabeceraEntidad'

    let celda = document.createElement('td');
    celda.id = 'celdaEntidad';

    //Recibe un json con la busqueda deseada
    let crearTablaEntidad = function (busquedas, paginacion) {
      let maxPage = Math.ceil(busquedas.length / paginacion); //AA
      let actualPageNumber = 1; //AA

      var renderPagination = function () {
        sd.innerHTML = style;

        let changePage = function (option) {
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

        for (var i = 0; i < busquedas.length; i++) {
          for (var key in busquedas[i]) {
            if (columna.indexOf(key) === -1) {
              columna.push(key);
            }
          }
        }

        var tr = tabla.insertRow(-1);

        for (var i = 0; i < columna.length; i++) {
          var th = document.createElement('th');
          th.innerHTML = columna[i];
          tr.appendChild(th);
        }

        let maxIndex = actualPageNumber == maxPage ? busquedas.length : paginacion * actualPageNumber;

        for (var i = paginacion * actualPageNumber - paginacion; i < maxIndex; i++) { //AA
          tr = tabla.insertRow(-1);
          for (var j = 0; j < columna.length; j++) {
            var newCelda = tr.insertCell(-1);
            newCelda.innerHTML = busquedas[i][columna[j]];
             tr.addEventListener("click", function(){
                var fila = tabla.rows.length;
                for(var k = 0; k < fila; k++){
                    var filaSelect = tabla.rows[k].rowIndex;
                    for(var m = 0; m < filaSelect; m++){
                        var filaElegida = tabla.rows[m].innerText;
                        console.log(filaElegida);
                    }
                    }
                },true);
          }
        }

        contenedor.appendChild(tabla);
        let paginacionBar = document.createElement("div");
        let tableTitleBar = document.createElement("div");
        paginacionBar.id = "paginacionBar";
        tableTitleBar.id = "tableTitleBar";

        let tableTitle = document.createElement("h1");
        //tableTitle.innerText = this.getAttribute("busqueda");
        tableTitleBar.appendChild(tableTitle);

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
        paginacionBar.appendChild(buttonFirst); //AA
        paginacionBar.appendChild(buttonPrevious); //AA
        paginacionBar.appendChild(span); //AA
        paginacionBar.appendChild(buttonNext); //AA
        paginacionBar.appendChild(buttonLast); //AA

        sd.appendChild(tableTitleBar);
        sd.appendChild(contenedor);
        sd.appendChild(paginacionBar);
      }

      renderPagination();
    }

    let accion = function (entidad, metodo, paginacion) {// AA
      fetch(`http://localhost:8080/SistemaTPI135-web-1.0-SNAPSHOT/webresources/${entidad}/${metodo}`).then(function (respuesta) {
        // Convertir a JSON
        return respuesta.json();
      }).then(function (j) {
        // Ahora 'j' es un objeto JSON
        crearTablaEntidad(j, paginacion); //AA
        console.log(j);
      });
    }
    accion(this.getAttribute("busqueda"), this.getAttribute("metodo"), this.getAttribute("paginacion")); //AA
  }
}
window.customElements.define('tabla-dinamica', TablaBusqueda);
