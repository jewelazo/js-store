import DOMHandler from "./dom_handler.js"
import Main from "./scripts/pages/home.js"
import { ProductsFetcher } from "./scripts/services/products_fetcher.js"

const getProducts = async ()=>{
    const products= await ProductsFetcher.getAll()
    console.log(products)
    DOMHandler.render(Main)
}
getProducts()