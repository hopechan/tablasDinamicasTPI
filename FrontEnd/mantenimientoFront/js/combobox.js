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
        
        //Recibe un json y lo que se desea mostrar en el combobox
        let crearComboBox = function(jsonData, busqueda){
            //var datos = jsonToArray(jsonData);
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