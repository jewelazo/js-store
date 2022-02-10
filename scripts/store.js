const STORE = (function (){
    let products=[]

    function setProducts(products_data){
        products=products_data
    }
    function getAllProducts(){
        return [...products]
    }

    return {
        setProducts,
        getAllProducts,
        categorySelected:null,
    }


})()

export default STORE