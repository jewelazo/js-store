import STORE from "../store.js"

const Pagination= function(){
    function onHandlePagination(e){
        let btnNext=e.target.closest(".next")
        if (btnNext){
            STORE.page +=1
            checkPaginate()
            showItems()
        }
        let btnPrev=e.target.closest(".prev")
        if (btnPrev){
            STORE.page -=1
            checkPaginate()
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
    function checkPaginate(){
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
        toString: function(){
            return `
            <div class="pagination">
                <div class="prev">Anterior</div>
                <div>Página <span class="page-number"></span></div>
                <div class="next">Siguiente</div>
            </div>
            `
        },
        addEventListeners: function(){
            const btnPage=document.querySelector(".pagination")
            if (btnPage){
                btnPage.addEventListener('click',onHandlePagination)
            }
        },
        showItems,
        checkPaginate,
    }
}

export default Pagination