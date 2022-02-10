import DOMHandler from "./dom_handler.js"
import Main from "./scripts/pages/home.js"
import { ProductsFetcher } from "./scripts/services/products_fetcher.js"
import STORE from "./scripts/store.js";

(async () => {
    if (!sessionStorage.getItem("product")){
        try{
            let products= await ProductsFetcher.getAll()
            STORE.setProducts(products)
            sessionStorage.setItem("product",JSON.stringify(products))
            DOMHandler.render(Main)
        }catch(e){
            alert("error to get products :(")
        }
    }else{
        const products=JSON.parse(sessionStorage.getItem("product"))
        STORE.setProducts(products)
        DOMHandler.render(Main)
    }
    
  
})();
