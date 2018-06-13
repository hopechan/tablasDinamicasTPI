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
        this.dispatchEvent(new CustomEvent("newdata", {detail: {data: data}}))
      })
    })
  }
}
window.customElements.define('search-wc', SearchWC)