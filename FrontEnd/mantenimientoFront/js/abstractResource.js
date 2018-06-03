class AbstractResource{
    /**
     * 
     * Clase que define que entidad y metodo se esta utilizando
     * El orden de funcionamiento en teoria seria:
     * 1.-abstractResource => se define entidad y metodo
     * 2.-origenResource   => se forma la url
     * 3.-restController   => se consume el rest
     * 
     */
    constructor(entidad, metodo){
        this.entidad = entidad;
        this.metodo = metodo;
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

export default AbstractResource;