import RestController from "./restController.js"

class SearchWC extends HTMLElement {
  constructor() {
    super()
    this.entidad = this.getAttribute("entidad")
  }

  connectedCallback() {
    const sd = this.attachShadow({mode: 'open'})

    const input = document.createElement("input")
    input.setAttribute("type", "text")

    sd.appendChild(input)

    input.addEventListener("input", (e) => {
      RestController.findByName(this.entidad, e.target.value).then((data) => {
        input.dispatchEvent(new CustomEvent("newdata", {detail: data}))
        console.log(event.detail)
      })
    })

    var entidad = this.entidad

    /*function updateJSON(e) {
      RestController.findByName(entidad, e.target.value).then(data => {
        dispatchNewData(data)
      })
    }

    function dispatchNewData(data) {
      let event = new CustomEvent('newdata', {detail: data, bubbles: true})
      input.dispatchEvent(event)
      console.log(event)
      //console.log(event.currentTarget)
    }*/
  }
}

window.customElements.define('search-wc', SearchWC)
export default SearchWC