function validarDisponibilidad(elemento, cantidadDescontar){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(elemento.disponible && elemento.cantidad >= cantidadDescontar){
                resolve(`Se puede descontar la cantidad: ${cantidadDescontar} de ${elemento.nombre}`)
            }else {
                reject(`Error! ${elemento.nombre} no está disponible o no alcanza la cantidad. Cantidad disponible: ${elemento.cantidad}`)
            }
        }, 1000) 
    })
}

function descontarStock(respuesta){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                resolve(`Se puede descontar: ${respuesta}`)
        }, 3000) 
    })
}

/* function descontarStock(respuesta){
        setTimeout(() => {
                console.log(`Se puede descontar: ${respuesta}`)
        }, 3000) 
} */

/* function descontarStock(respuesta){
    return setTimeout(() => {
                `Se puede descontar: ${respuesta}`
        }, 3000) 
}
 */

module.exports = { validarDisponibilidad, descontarStock }