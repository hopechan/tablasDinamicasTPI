import AbstractResource from "./abstractResource";

class OrigenResource extends AbstractResource{
    constructor(){
        super();
        entidad = super.getEntidad();
        metodo = super.getMetodo();
        this._url = `http://localhost:8080/SistemaTPI135-web-1.0-SNAPSHOT/webresources/${entidad}/${metodo}`
    }

    get getUrl(){
        return this._url;
    }

    set setUrl(_url){
        this._url = _url;
    }
}

export default OrigenResouce;