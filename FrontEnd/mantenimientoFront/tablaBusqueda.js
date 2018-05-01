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
      let maxPage = Math.ceil(busquedas.length / paginacion);
      let actualPageNumber = 1;

      var renderPagination = function () {
        sd.innerHTML = style;

        let changePage = function (option) {
          if (this.innerText == '<<') {
            actualPageNumber = 1;
            this.disabled = true;
          } else if (this.innerText == '<') {
            if (actualPageNumber != 1) {
              actualPageNumber--;
            }
          } else if (this.innerText == '>') {
            if (actualPageNumber != maxPage) {
              actualPageNumber++;
            }
          } else {
            actualPageNumber = maxPage;
            this.disabled = true;
          }

          renderPagination();
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

        for (var i = paginacion * actualPageNumber - paginacion; i < maxIndex; i++) {
          tr = tabla.insertRow(-1);
          for (var j = 0; j < columna.length; j++) {
            var newCelda = tr.insertCell(-1);
            newCelda.innerHTML = busquedas[i][columna[j]];
             newCelda.onclick = function(){
                var fila = tabla.rows.length;
                for(var k = 0; k < fila; k++){
                    var filaSelect = tabla.rows[k].rowIndex;
                    for(var m = 0; m < filaSelect; m++){
                        var filaElegida = tabla.rows[m].innerText;
                        console.log(filaElegida);
                    }
                    }
                };
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

        let buttonFirst = document.createElement("button");
        let buttonPrevious = document.createElement("button");
        let buttonNext = document.createElement("button");
        let buttonLast = document.createElement("button");
        let span = document.createElement("span");
        buttonFirst.innerText = "<<";
        buttonFirst.onclick = changePage;
        buttonPrevious.innerText = "<";
        buttonPrevious.onclick = changePage;
        buttonNext.innerText = ">"
        buttonNext.onclick = changePage;
        buttonLast.innerText = ">>";
        buttonLast.onclick = changePage;
        span.innerText = "Page " + actualPageNumber + " of " + maxPage;
        paginacionBar.appendChild(buttonFirst);
        paginacionBar.appendChild(buttonPrevious);
        paginacionBar.appendChild(span);
        paginacionBar.appendChild(buttonNext);
        paginacionBar.appendChild(buttonLast);

        sd.appendChild(tableTitleBar);
        sd.appendChild(contenedor);
        sd.appendChild(paginacionBar);
      }

      renderPagination();
    }

    let accion = function (entidad, metodo, paginacion) {// AA
      fetch(`https://jsonplaceholder.typicode.com/albums`).then(function (respuesta) {
        // Convertir a JSON
        return respuesta.json();
      }).then(function (j) {
        // Ahora 'j' es un objeto JSON
        crearTablaEntidad(j, paginacion);
      });
    }
    accion(this.getAttribute("busqueda"), this.getAttribute("metodo"), this.getAttribute("paginacion"));
  }
}
window.customElements.define('tabla-dinamica', TablaBusqueda);
