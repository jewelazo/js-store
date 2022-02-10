import DOMHandler from "./dom_handler.js"
import { Loader } from "./scripts/components/loader.js";
import Main from "./scripts/pages/home.js"
import { ProductsFetcher } from "./scripts/services/products_fetcher.js"
import STORE from "./scripts/store.js";

(async () => {
    if (!sessionStorage.getItem("product")){
        DOMHandler.render(Loader)
        try{
            let products= await ProductsFetcher.getAll()
            STORE.setProducts(products)
            sessionStorage.setItem("product",JSON.stringify(products))
            DOMHandler.render(Main)
        }catch(e){
            console.log('error')
            alert("error to get products :(")
        }
    }else{
        const products=JSON.parse(sessionStorage.getItem("product"))
        STORE.setProducts(products)
        DOMHandler.render(Main)
    }
    
  
})();
