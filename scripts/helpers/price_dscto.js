// Funcion para obtener un nuevo precio al recibir como parametros el precio inicial y su respectivo descuento.
export const newPrice=(price,dscto)=>{
    let discount=(100-dscto)/100
    return (price*discount).toFixed(1)

}