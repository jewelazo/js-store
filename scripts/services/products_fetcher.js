import { apiFetch } from "./api_fetch.js"
// Function IIFE que retorna 2 funciones para realizar requests a la api,una para adquirir todos los productos
// y la otra para buscar un determinado producto en funcion del texto ingresado por el usuario
export const ProductsFetcher= (function(){
    return {
        getAll: ()=>
            apiFetch(
                "products",
            ),
        search: (text)=>
            apiFetch(
                `products/search/?q=${text}`,
            )
    }
})()