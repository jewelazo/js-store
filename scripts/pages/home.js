const Main=(()=>{
    return {
        render: function (){
            return `
                <nav class="navbar navbar-light bg-info">
                    <div class="container">
                    <img src="../assets/images/logo.png" alt="">
                    <form>
                        <div class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Encuentra tu producto" aria-label="Search">
                            <button class="btn-search" type="submit"><img src="../assets/icons/search.svg" alt="" width="20px"></button>
                        </div>
                    </form>
                </div>
                </nav>`
        },
        initEventListeners: function(){
            console.log('ok')
        }
        
    }
})()

export default Main