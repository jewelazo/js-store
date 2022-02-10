import DOMHandler from "../../dom_handler.js"
import { ProductsFetcher } from "../services/products_fetcher.js"
import STORE from "../store.js"

const Main=(()=>{
    async function onHandleSearch(e){
        e.preventDefault()
        STORE.categorySelected=null
        STORE.byPrice=false
        const { input } = e.target
        const searchProducts=  await ProductsFetcher.search(input.value)
        STORE.setProducts(searchProducts)
        STORE.inputText=input.value
        DOMHandler.render(Main)
    }

    function onHandleCategory(e){
        const category=e.target.closest(".select-category")
        if (category){
            let products=JSON.parse(sessionStorage.getItem("product"))
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
            }
            DOMHandler.render(Main)
        
        }  
    }

    function onhandleStart(e){
        let logo=e.target.closest(".logo-store")
        if (logo){
            let products=JSON.parse(sessionStorage.getItem('product'))
            STORE.setProducts(products)
            STORE.inputText=""
            STORE.categorySelected=null
            STORE.byPrice=false
            DOMHandler.render(Main)
        }
    }
    return {
        render: function (){
            let products=STORE.getAllProducts()
            let listProducts=products.map( product =>
                `<div class="card text-center" style="width: 18rem;">
                    ${product.discount ? `<div class="dscto">-${product.discount}%</div>` : ""}
                    <img src=${ product.url_image ? product.url_image: "./assets/images/no-image.png"} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <hr>
                        <div>
                            <div class="precio-dscto">
                                <span class=${product.discount ? "tachado":""}>$${product.price}</span>
                                ${product.discount ? `<span>$${(product.price*(100-product.discount)/100).toFixed(1)}</span>` : ""}
                            </div>
                            <img src="../assets/icons/car.svg" alt="">
                        </div>
                    </div>
                </div>`)
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
                </div>
                <div class="cards-container">
                ${listProducts.length ? listProducts.join(""): "No se encontraron productos"}
                </div>
                `
        },
        initEventListeners: function(){
            const form= document.querySelector(".search-product")
            const filter=document.querySelector(".filter")
            const logo=document.querySelector(".logo-store")
            if (form){
                document.addEventListener('submit',onHandleSearch)
            }
            if (filter){
                document.addEventListener('change',onHandleCategory)
                document.addEventListener('click',onHandleOrderPrice)
            }
            if (logo){
                document.addEventListener('click',onhandleStart)
            }
        }
        
    }
})()

export default Main