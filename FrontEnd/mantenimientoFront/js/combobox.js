import RestController from "./restController.js";

class ComboBox extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const sd = this.attachShadow({mode : 'closed'});
        const contenedor = document.createElement('div');
        contenedor.id = 'id_contenedor';

        const combobox = document.createElement('select');
        combobox.id = 'id_combobox';

        let estiloCombobox = function(elemento){
            //var elemento = document.createElement('option');
            elemento.style.width = '500px';
            elemento.style.border = '2px solid #ccc';
            elemento.style.borderRadius = '15px';
            elemento.style.fontSize = '20px';
            elemento.style.padding = '4px 7px';
            elemento.style.outline = '0';
            elemento.style.borderColor = '#A5A5AF';
        }
        
        //Recibe un json y lo que se desea mostrar en el combobox
        let crearComboBox = function(jsonData, busqueda){
            //var datos = jsonToArray(jsonData);
            estiloCombobox(combobox);
            for (const key in jsonData) {
                var opcion = document.createElement('option');
                opcion.innerHTML = jsonData[key][busqueda];
                combobox.appendChild(opcion);
                console.log(opcion);
            }
            contenedor.appendChild(combobox);
            sd.appendChild(contenedor);
        }

        
        let accion = function(entidad, busqueda){
            //ejemplo marca y nombre
            var respuestaPromesa = RestController.findAll(entidad).then(data =>{
                return crearComboBox(data, busqueda);
            })
        }
        accion(this.getAttribute('entidad'), this.getAttribute('busqueda'));
    }

}
window.customElements.define('combobox-tpi', ComboBox);
export default ComboBox;