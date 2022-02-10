export const newPrice=(price,dscto)=>{
    let discount=(100-dscto)/100
    return (price*discount).toFixed(1)

}