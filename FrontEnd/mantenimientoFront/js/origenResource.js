/**
 * Clase que forma la url que se va a consumir
 */
class OrigenResource{
    constructor(entidad, metodo, url){
        this.entidad = entidad;
        this.metodo = metodo;
        this.url = `http://localhost:8080/SistemaTPI135-web-1.0-SNAPSHOT/webresources/${this.getEntidad}/${this.getMetodo}`;
    }

    get getUrl(){
        return this.url;
    }

    set setUrl(url){
        this._url = url;
    }

     //getters
     get getEntidad(){
        return this.entidad;
    }

    get getMetodo(){
        return this.metodo;
    }

    //setters
    set setEntidad(entidad){
        this.entidad = entidad;
    }

    set setMetodo(metodo){
        this.metodo = metodo;
    }
}

export default OrigenResource;