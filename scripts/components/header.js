import DOMHandler from "../../dom_handler.js"
import Main from "../pages/home.js"
import { ProductsFetcher } from "../services/products_fetcher.js"
import STORE from "../store.js"


const Header= function(){
    async function onHandleSearch(e){
        e.preventDefault()
        STORE.page=1
        STORE.categorySelected=null
        STORE.byPrice=false
        const { input } = e.target
        const searchProducts=  await ProductsFetcher.search(input.value)
        STORE.setProducts(searchProducts)
        STORE.inputText=input.value
        DOMHandler.render(Main)
    }
    function onhandleStart(e){
        STORE.page=1
        let products=JSON.parse(sessionStorage.getItem('product'))
        STORE.setProducts(products)
        STORE.inputText=""
        STORE.categorySelected=null
        STORE.byPrice=false
        DOMHandler.render(Main)
        
    }
    return {
        toString: function(){
            return `
            <nav class="navbar navbar-light bg-info">
                <div class="container">
                    <img class="logo-store"src="../assets/images/logo.png" alt="">
                    <form class="search-product">
                        <div class="d-flex">
                            <input class="form-control me-2" name="input" type="search" placeholder="Encuentra tu producto" aria-label="Search">
                            <button class="btn-search" type="submit"><img src="./assets/icons/search.svg" alt="" width="20px"></button>
                        </div>
                    </form>
                </div>
            </nav>
            `
        },
        addEventListeners: function(){
            const form= document.querySelector(".search-product")
            const logo=document.querySelector(".logo-store")
            if (form){
                form.addEventListener('submit',onHandleSearch)
            }
            if (logo){
                logo.addEventListener('click',onhandleStart)
            }
        }
    }
}

export default Header