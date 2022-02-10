import Filter from "../components/filter.js"
import Header from "../components/header.js"
import { newPrice } from "../helpers/price_dscto.js"
import STORE from "../store.js"

const Main=(()=>{
    let header = Header()
    let filter = Filter()
    function onHandlePagination(e){
        let btnNext=e.target.closest(".next")
        if (btnNext){
            STORE.page +=1
            check()
            showItems()
        }
        let btnPrev=e.target.closest(".prev")
        if (btnPrev){
            STORE.page -=1
            check()
            showItems()
        }

    }
    function showItems(){
        const galleryItems=document.querySelector(".cards-container").children;
        const maxItem=6;
        STORE.maxPage=Math.ceil(galleryItems.length/maxItem);
        let numberPage=document.querySelector(".page-number")
        let index=STORE.page;
        function show() {
            for(let i=0;i<galleryItems.length; i++){
                galleryItems[i].classList.remove("show");
                galleryItems[i].classList.add("hide");
     
     
               if(i>=(index*maxItem)-maxItem && i<index*maxItem){
               galleryItems[i].classList.remove("hide");
               galleryItems[i].classList.add("show");
               }
            }
            numberPage.innerHTML=index  
       }
       show()
    }
    function check(){
            if(STORE.page===STORE.maxPage || STORE.getAllProducts().length===0){
                document.querySelector(".next").classList.add("disabled");
            }
            else{
                document.querySelector(".next").classList.remove("disabled");	
            }
    
            if(STORE.page===1){
                document.querySelector(".prev").classList.add("disabled");
            }
            else{
                document.querySelector(".prev").classList.remove("disabled");	
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
                <div class="pagination">
                    <div class="prev">Anterior</div>
                    <div>Página <span class="page-number"></span></div>
                    <div class="next">Siguiente</div>
                </div>
                `
        },
        initEventListeners: function(){
            
            header.addEventListeners()
            filter.addEventListener()
            showItems()
            check()
            const btnPage=document.querySelector(".pagination")
            if (btnPage){
                btnPage.addEventListener('click',onHandlePagination)
            }
            
            
        }
        
    }
})()

export default Main