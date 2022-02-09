import { ProductsFetcher } from "./scripts/services/products_fetcher.js"

const getProducts = async ()=>{
    const products= await ProductsFetcher.getAll()
    console.log(products)
}
getProducts()