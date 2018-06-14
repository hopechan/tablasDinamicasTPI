import RestController from "./restController.js"

class DinamicTableWC extends HTMLElement {
  constructor() {
    super();
    this.entidad = this.getAttribute('entidad')
    this.data = null;
    let linkThis = this
    RestController.findAll(this.entidad).then((data) => {
      linkThis.data = data
    })
  }

  connectedCallback() {
    let linkThis = this

    const sd = this.attachShadow({mode: "open"})
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
        </style>`

        sd.innerHTML = style

    const table = document.createElement("table")
    const pagerWC = this.parentNode.querySelector("pager-wc")

    pagerWC.addEventListener("clickchange", (e) => {
      renderData(e.detail.data)
    })

    var columns = []

    function renderData(data) {
      if (data && data.length !== 0) {
        table.innerHTML = ''

        for (var i = 0; i < data.length; i++) {
          for (var key in data[i]) {
            if (columns.indexOf(key) === -1 && !(key.indexOf("Collection") !== -1)) {
              columns.push(key)
            }
          }
        }

        var tr = table.insertRow(-1)

        for (var i = 0; i < columns.length; i++) {
          var th = document.createElement('th')
          th.innerHTML = columns[i]
          tr.appendChild(th)
        }

        for (var i = 0; i < data.length; i++) {
          tr = table.insertRow(-1)
          for (var j = 0; j < columns.length; j++) {
            var newCelda = tr.insertCell(-1)
            newCelda.innerHTML = data[i][columns[j]]
            tr.onclick = function(){
              console.log(this.innerText)
            }
          }
        }
      } else {
        RestController.findAll(linkThis.entidad).then((data) => {
          linkThis.dispatchEvent(new CustomEvent("newdata", {detail: {data: data}}))
        })
      }
      sd.appendChild(table)
    }

    RestController.findAll(this.entidad).then((data) => {
      this.dispatchEvent(new CustomEvent("newdata", {detail: {data: data}}))
    })
  }


}

window.customElements.define("dinamictable-wc", DinamicTableWC)