class GetForm {
    /** 
     * clase para tomar datos del formulario
    */

    recolectarDatos(etiquetas, texto){
        for(var i = 0; i < etiquetas.length; i++){
            console.log(etiquetas[i]);
        }
        for(var i = 0; i < texto.length; i++){
            console.log(texto[i]);
        }
    }
    
}
export default new GetForm;