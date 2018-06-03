import OrigenResource from "./origenResource.js";
import GetDatos from "./getData.js";
/**
 * Clase para consumir rest
 */
class RestController extends OrigenResource{
    constructor() {
        super();
        this.url_base = `http://localhost:8080/SistemaTPI135-web-1.0-SNAPSHOT/webresources`;
        this.json_prueba = [{
            "activo": true,
            "id": 20,
            "modeloCollection": [],
            "nombre": "MacBook Pro",
            "observaciones": "Este es un campo de prueba"
        }];
    }

    findAll(entidad){
        return GetDatos.getDatos(`${this.url_base}/${entidad}/findAll`).then(data => {
            return data
        });
    }

    findById(entidad, id){
        return GetDatos.getDatos(`${this.url_base}/${entidad}/${id}`).then(id_data => {
            return id_data
        });
    }
/**
 * a => limite inferior
 * b => limite superior 
 */
    findByRange(entidad, a, b){
        return GetDatos.getDatos(`${this.url_base}/${entidad}/${a}/${b}`).then(rango =>{
            return rango
        });
    }

    count(entidad){
        return GetDatos.getDatos(`${this.url_base}/${entidad}/count`).then(cantidad => {
            return cantidad
        });
    }

    create(entidad){
        return GetDatos.setDatos(this.json_prueba, `${this.url_base}/${entidad}/crear`).then(estadoCreado => {
            return estadoCreado
        });
    }

    edit(entidad, id){
        return GetDatos.setDatos(this.json_prueba, `${this.url_base}/${entidad}/id`).then(estadoEditado => {
            return estadoEditado
        });
    }

    remove(entidad, id){
        return GetDatos.setDatos(this.json_prueba, `${this.url_base}/${entidad}/id`).then(estadoBorrado => {
            return estadoBorrado
        });
    }


}
export default new RestController;