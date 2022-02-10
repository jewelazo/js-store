// Funcion IIFE que retorna funciones y atributos para la gestion de la data proveida por la api.
const STORE = (function (){
    let products=[]

    function setProducts(products_data){
        products=products_data
    }
    function getAllProducts(){
        return [...products]
    }
    function orderByPrice(){
        products.sort((a,b) => b.price - a.price)
    }

    return {
        setProducts,
        getAllProducts,
        orderByPrice,
        categorySelected:null,
        byPrice:false,
        inputText:"",
        page:1,
        maxPage:null,
    }


})()

export default STORE