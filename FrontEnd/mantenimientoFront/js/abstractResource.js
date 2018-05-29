class AbstractResource{
    constructor(){
        this._entidad = _entidad;
        this._metodo = _metodo;
    }
    //getters
    get getEntidad(){
        return this._entidad;
    }

    get getMetodo(){
        return this._metodo;
    }

    //setters
    set setEntidad(_entidad){
        this._entidad = _entidad;
    }

    set setMetodo(_metodo){
        this._metodo = _metodo;
    }

}

export default AbstractResource;