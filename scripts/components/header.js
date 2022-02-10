import DOMHandler from "../../dom_handler.js"
import Main from "../pages/home.js"
import { ProductsFetcher } from "../services/products_fetcher.js"
import STORE from "../store.js"

// Componente Header que renderiza el html del header(logo y buscador) y gestiona las funciones-eventListeners para
// reiniciar la aplicación y hacer peticiones a la API en relacion al texto ingresado por el usuario.
const Header= function(){
    // Funcion asincrona que realiza peticiones a la api con el endpoint /products/search/?q=texto,
    // la API ya esta protegida de SQL injection.
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

    // Funcion para reiniciar la aplicacion
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