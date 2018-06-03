import OrigenResource from "./origenResource.js";
import GetDatos from "./getData.js";
/**
 * Clase para consumir rest
 * Los metodos POST, GET, PUT DELETE son puestos de manera "HardCode"
 */
class RestController extends OrigenResource{
    constructor() {
        super();
        this.url_base = `http://localhost:8080/SistemaTPI135-web-1.0-SNAPSHOT/webresources`;
    }

    findAll(entidad){
        return GetDatos.getDatos(`${this.url_base}/${entidad}/findAll`).then(data => {
            return data
        });
    }

    findById(entidad, id){
        return GetDatos.getDatos(`${this.url_base}/${entidad}/${id}`).then(data => {
            return id_data
        });
    }
/**
 * a => limite inferior
 * b => limite superior 
 */
    findByRange(entidad, a, b){
        return GetDatos.getDatos(`${this.url_base}/${entidad}/${a}/${b}`).then(data =>{
            return rango
        });
    }

    count(entidad){
        return GetDatos.getDatos(`${this.url_base}/${entidad}/count`).then(data => {
            return totalDatos
        });
    }


}
export default new RestController;