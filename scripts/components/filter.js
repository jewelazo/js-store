import DOMHandler from "../../dom_handler.js"
import Main from "../pages/home.js"
import { ProductsFetcher } from "../services/products_fetcher.js"
import STORE from "../store.js"

// Componente Filter que renderiza el html de la paginacion y gestiona las funciones-eventListeners para
// mostrar los productos en funcion de la categoria seleccionada asi como tambien ordenar los productos por su precio en forma descendente.
const Filter=function(){
    // Funcion para filtrar por categoria los productos
    function onHandleCategory(e){
        const category=e.target.closest(".select-category")
        if (category){
            let products=JSON.parse(sessionStorage.getItem("product"))
            STORE.page=1
            STORE.byPrice=false
            STORE.inputText=""
            STORE.categorySelected=category.value
            STORE.setProducts(products)
            if (category.value!=='all'){
                let productsByCategory=STORE.getAllProducts().filter( product => product.category.name===category.value)
                STORE.setProducts(productsByCategory)
            }
       
            DOMHandler.render(Main)

        }
    }
    // Funcion para order los productos por su precio y cuando es desactivado, regresar a su estado anterior
    function onHandleOrderPrice(e){
        const checkPrice= e.target.closest('.js-price')
        if (checkPrice){
            if (checkPrice.checked){
                STORE.byPrice=true
                STORE.orderByPrice()
            }else if (!checkPrice.checked){
                STORE.byPrice=false
                if (STORE.categorySelected){
                    const products=JSON.parse(sessionStorage.getItem("product"))
                    const productByCategory=products.filter(product => product.category.name===STORE.categorySelected)
                    STORE.setProducts(productByCategory)
                }
                if (STORE.inputText){
                    (async () =>{
                        let newProducts = await ProductsFetcher.search(STORE.inputText)
                        STORE.setProducts(newProducts)
                        DOMHandler.render(Main)
                        return;
                    
                    })()
                }
                if (!STORE.inputText && !STORE.categorySelected ){
                    let products=JSON.parse(sessionStorage.getItem('product'))
                    STORE.setProducts(products)
                }
            }
            DOMHandler.render(Main)
        
        }  
    }
    return {
        toString: function(){
            return`
                <div class="filter">
                    <select class="select-category" name="category" aria-label=".form-select-sm example">
                        <option value="all" >Compra por categoría </option>
                        <option value="bebida energetica" ${STORE.categorySelected==="bebida energetica" ? "selected" : ""}>bebida energetica</option>
                        <option value="pisco" ${STORE.categorySelected==="pisco" ? "selected" : ""}>pisco</option>
                        <option value="ron" ${STORE.categorySelected==="ron" ? "selected" : ""}>ron</option>
                        <option value="bebida" ${STORE.categorySelected==="bebida" ? "selected" : ""}>bebida</option>
                        <option value="snack" ${STORE.categorySelected==="snack" ? "selected" : ""}>snack</option>
                        <option value="cerveza" ${STORE.categorySelected==="cerveza" ? "selected" : ""}>cerveza</option>
                    </select>
                    <div class="js-checkbox">
                        <div>
                            <label>Ordenar por:</label>
                        </div>
                        <div class="byPrice">
                            <input class="js-price" ${STORE.byPrice ? "checked": ""} type="checkbox">
                            <span>Precio</span>
                        </div>
                    </div> 
                </div>`
        },
        addEventListener: function(){
            const filter=document.querySelector(".filter")
            if (filter){
                filter.addEventListener('change',onHandleCategory)
                filter.addEventListener('click',onHandleOrderPrice)
            }
        }
    }
}

export default Filter