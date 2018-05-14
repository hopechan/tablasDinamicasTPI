class TablaBusqueda extends HTMLElement {
  constructor() {
    super();
    this.maxPage = 1;
    this.actualPage = 1;
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "closed" });
    const contenedorTabla = document.createElement("div");
    const tablaEntidad = document.createElement("table");
    contenedorTabla.appendChild(tablaEntidad);
    shadowRoot.appendChild(contenedorTabla);

    let accion = (entidad, metodo, paginado) => {
      fetch(`https://jsonplaceholder.typicode.com/albums`)
        .then(response => response.json())
        .then(JSONObject => {
          this.maxPage = Math.ceil(JSONObject.length / paginado);
        });
    };

    let crearTablaEntidad = (JSONObject, paginado) => {};

    let changePage = option => {
      switch (option) {
        case "<<":
          actualPage = 1;
          break;
        case "<":
          if (actualPage != 1) {
            actualPage--;
          }
          break;
        case ">":
          if (actualPage != maxPage) {
            actualPage++;
          }
          break;
        default:
          actualPage = maxPage;
      }
      renderPaginado();
    };

    let renderPaginado = JSONObject => {};
  }
}
customElements.define("tabla-dinamica", TablaBusqueda);
