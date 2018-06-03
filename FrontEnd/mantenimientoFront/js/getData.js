class GetDatos{
    async getDatos(url) {
        let data = await (await(fetch(url)
        .then(respuesta => {
            return respuesta.json()
            })
        .catch(error => {
            console.log('Hubo un error: ' + error)
            })
        ))
        return data;
    }
}
export default new GetDatos;