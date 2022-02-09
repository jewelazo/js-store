import { apiFetch } from "./api_fetch.js"

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