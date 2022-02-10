// Funcion IIFE, es el que gestiona el renderizado de los componentes,paginas y tambien activa sus eventos.
const DOMHandler = (()=>({
    render: (element)=>{
      const container = document.querySelector('.js-content');
      container.innerHTML = element.render();
      element.initEventListeners();
    }
  }))();
  
export default DOMHandler;