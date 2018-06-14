
import RestController from "./restController.js"

class PagerWC extends HTMLElement {
  constructor() {
    super()
    this.paginado = this.getAttribute("paginado")
    this.actualPage = 1
    this.maxPage = null
    this.data = null
  }

  connectedCallback() {
    let linkThis = this

    const sd = this.attachShadow({mode: 'open'})
    const dinamicTableWC = this.parentNode.querySelector("dinamictable-wc")
    const searchWC = this.parentNode.querySelector("search-wc")

    let sendDataPaged = (e) => {
      linkThis.data = e.detail.data
      linkThis.actualPage = 1
      linkThis.maxPage = Math.ceil(linkThis.data.length / linkThis.paginado)
      let dataChunk = []
      for (var i = 0; i < (linkThis.paginado >= linkThis.data.length ? linkThis.data.length : linkThis.paginado); i++) {
        dataChunk.push(linkThis.data[i])
      }
      console.log(dataChunk)
      this.dispatchEvent(new CustomEvent("clickchange", {detail: {data: dataChunk}}))
      sd.querySelector("span").textContent = `Page ${this.actualPage} of ${this.maxPage}`
    }

    dinamicTableWC.addEventListener("newdata", sendDataPaged)

    searchWC.addEventListener("newdata", sendDataPaged)

    const elements = [
    {type: 'button', text: '<<'},
    {type: 'button', text: '<'},
    {type: 'span', text: `Page ${this.actualPage} of ${this.maxPage}`},
    {type: 'button', text: '>'},
    {type: 'button', text: '>>'}
    ]


    let changePage = (e) => {
      let dataChunk = []
      switch(e.target.textContent) {
        case "<<":
        linkThis.actualPage = 1
        for (var i = 0; i < (linkThis.paginado >= linkThis.data.length ? linkThis.data.length : linkThis.paginado); i++) {
          dataChunk.push(linkThis.data[i])
        }
        break
        case "<":
        if (linkThis.actualPage !== 1 ) {
          linkThis.actualPage -= 1
        }
        for (var i = (linkThis.paginado * linkThis.actualPage) - linkThis.paginado; i < (linkThis.paginado >= linkThis.data.length ? linkThis.data.length : linkThis.paginado * linkThis.actualPage); i++) {
          dataChunk.push(linkThis.data[i])
        }
        break
        case ">":
        if (linkThis.actualPage !== linkThis.maxPage) {
          linkThis.actualPage += 1
        }

        for (var i = (linkThis.paginado * linkThis.actualPage) - linkThis.paginado; i < (linkThis.actualPage === linkThis.maxPage ? linkThis.data.length : linkThis.paginado * linkThis.actualPage); i++) {
          dataChunk.push(linkThis.data[i])
        }
        break
        case ">>":
        linkThis.actualPage = linkThis.maxPage
        for (var i = (linkThis.paginado * linkThis.actualPage) - linkThis.paginado; i < linkThis.data.length; i++) {
          dataChunk.push(linkThis.data[i])
        }
      }
      console.log(dataChunk)
      this.dispatchEvent(new CustomEvent("clickchange", {detail: {data: dataChunk}}))
      sd.querySelector("span").textContent = `Page ${this.actualPage} of ${this.maxPage}`
    }

    for (var element of elements) {
      let toAppend = document.createElement(element.type)
      toAppend.textContent = element.text
      toAppend.addEventListener("click", changePage)
      sd.appendChild(toAppend)
    }
  }
}
window.customElements.define("pager-wc", PagerWC)