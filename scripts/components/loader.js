// Componente Loader que renderiza un spin mientras se esta realizando la peticion a la API.
export const Loader=(()=>{
    return {
        render: function(){
            return `
            <div class="loader"></div>
            `
        },
        initEventListeners: function(){
            //pass
        }
    }
})()