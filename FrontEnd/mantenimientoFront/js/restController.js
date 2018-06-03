import OrigenResource from "./origenResource.js";
import GetDatos from "./getData.js";
/**
 * Clase para consumir rest
 * Los metodos POST, GET, PUT DELETE son puestos de manera "HardCode"
 */
class RestController extends OrigenResource{
    constructor() {
        super();
        this.url_findAll = `http://localhost:8080/SistemaTPI135-web-1.0-SNAPSHOT/webresources/marca/findAll`;
        this.url_findById = `http://localhost:8080/SistemaTPI135-web-1.0-SNAPSHOT/webresources/marca/1`;
        this.url_findByRange = `http://localhost:8080/SistemaTPI135-web-1.0-SNAPSHOT/webresources/marca/0/3`;
        this.url_count = `http://localhost:8080/SistemaTPI135-web-1.0-SNAPSHOT/webresources/marca/count`;
    }

    findAll(){
        return GetDatos.getDatos(this.url_findAll).then(data => {
            return data
        });
    }

    findById(){
        return GetDatos.getDatos(this.url_findById).then(data => {
            return id_data
        });
    }

    findByRange(){
        return GetDatos.getDatos(this.url_findByRange).then(data =>{
            return rango
        });
    }

    count(){
        return GetDatos.getDatos(this.url_count).then(data => {
            return totalDatos
        });
    }


}
export default new RestController;