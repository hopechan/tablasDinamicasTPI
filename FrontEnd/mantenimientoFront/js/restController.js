import OrigenResource from "./origenResource";
//Clase para manejar todos los rest del middleware :v
class RestController extends OrigenResouce{
    constructor(entidad, metodo) {
        super();
        let entidad = null;
        let metodo = null;
        let url = super.getUrl;
    }
    //en teoria crea la url completa (aun en testing)
    create(entidad){
        if (entidad =! null) {
            super.setEntidad(entidad);
            super.setMetodo("create");
            url = super.getUrl();
            return url;
        } else {        
            console.log("no funciona :'v")
        }
    }

    findAll(entidad){
        if (entidad =! null) {
            super.setEntidad(entidad);
            super.setMetodo("create");
            url = super.getUrl();
            return url;
        } else {        
            console.log("no funciona :'v")
        }
    }

    crear = function(){
        url = super.getUrl();
        //return url;
        return "funciona :v";
    }
}
export default RestController;




