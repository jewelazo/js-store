import Filter from "../components/filter.js"
import Header from "../components/header.js"
import Pagination from "../components/pagination.js"
import { newPrice } from "../helpers/price_dscto.js"
import STORE from "../store.js"

const Main=(()=>{
    let header = Header()
    let filter = Filter()
    let pagination = Pagination()
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
                                ${product.discount ? `<span>$${newPrice(product.price,product.discount)}</span>` : ""}
                            </div>
                            <img src="../assets/icons/car.svg" alt="">
                        </div>
                    </div>
                </div>`)
            return `
                ${header}
                ${filter}
                <div class="cards-container">
                ${listProducts.length ? listProducts.join(""): "No se encontraron productos"}
                </div>
                ${pagination}
                `
        },
        initEventListeners: function(){

            header.addEventListeners()
            filter.addEventListener()
            pagination.addEventListeners()
            pagination.showItems()
            pagination.checkPaginate()

        }
        
    }
})()

export default Main