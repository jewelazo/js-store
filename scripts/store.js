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
    }


})()

export default STORE