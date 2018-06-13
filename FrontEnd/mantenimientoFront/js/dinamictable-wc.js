class DinamicTableWC extends HTMLElement {
  constructor() {
    super();
    this.data = [
      {"activo":true,"id":2,"modeloCollection":[],"nombre":"ASUS","observaciones":"  "},
      {"activo":false,"id":4,"modeloCollection":[],"nombre":"VAIO","observaciones":"  "},
      {"activo":true,"id":5,"modeloCollection":[],"nombre":"SAMSUNG","observaciones":"  "},
      {"activo":true,"id":6,"modeloCollection":[],"nombre":"TOSHIBA","observaciones":"  "},
      {"activo":true,"id":7,"modeloCollection":[],"nombre":"MAC","observaciones":"  "},
      {"activo":true,"id":8,"modeloCollection":[],"nombre":"ACER","observaciones":"  "},
      {"activo":true,"id":10,"modeloCollection":[],"nombre":"ALIENWARE","observaciones":"  "}
    ]
  }

  connectedCallback() {
    const sd = this.attachShadow({mode: "open"})

    const table = document.createElement("table")
    const header = document.createElement("th")
    const cell = document.createElement("td")

    let papa = this.parentNode.querySelector("search-wc")

    console.log(papa)

    papa.addEventListener("newdata", function(){
      console.log("New data received!!")
    })

    papa.addEventListener("click", function(){
      console.log("You clicked me >:v")
    })

    var self = this.data
    //console.log(self)
    function renderData() {
      let columnas = [];

      for (var i = 0; i < self.length; i++) {
        for (var key in self[i]) {
          if (columnas.indexOf(key) === -1) {
            columnas.push(key);
          }
        }
      }

      var tr = table.insertRow(-1);

      for (var i = 0; i < columnas.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = columnas[i];
        tr.appendChild(th);
      }

      for (var i = 0; i < self.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < columnas.length; j++) {
          var newCelda = tr.insertCell(-1);
          newCelda.innerHTML = self[i][columnas[j]];
          tr.onclick = function(){

            console.log(this.innerText);
          };
        }
      }

      sd.appendChild(table)
    }

    renderData()
  }


}

window.customElements.define("dinamictable-wc", DinamicTableWC)
export default DinamicTableWC