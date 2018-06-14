import OrigenResource from "./origenResource.js";
import GetDatos from "./getData.js";
/**
 * Clase para consumir rest
 */
class RestController extends OrigenResource{
    constructor() {
        super();
        this.url_base = `http://localhost:8080/SistemaTPI135-web-1.0-SNAPSHOT/webresources`;
        this.datos_prueba = {
            activo : true,
            id : 20,
            modelloCollection : [],
            nombre : "MacBook Air",
            descripcion : "hola desde ES6"
        };
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

    findByName(entidad, nombre){
        return GetDatos.getDatos(`${this.url_base}/${entidad}/findByName/${nombre}`).then(busquedaNombre => {
            return busquedaNombre
        });
    }

    count(entidad){
        return GetDatos.getDatos(`${this.url_base}/${entidad}/count`).then(cantidad => {
            return cantidad
        });
    }
    //recibe un object {}, no un Json
    create(datos, entidad){
        return GetDatos.postDatos(datos, `${this.url_base}/${entidad}/crear`).then(estadoCreado => {
            return estadoCreado
        });
    }

    edit(datos, entidad, id){
        return GetDatos.setDatos(datos, `${this.url_base}/${entidad}/${id}`).then(estadoEditado => {
            return estadoEditado
        });
    }

    remove(entidad, id){
        return GetDatos.setDatos(this.datos_prueba, `${this.url_base}/${entidad}/${id}`).then(estadoBorrado => {
            return estadoBorrado
        });
    }
}
export default new RestController;