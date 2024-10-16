const express = require('express')
const PUERTO = 3000
const HOST = '127.0.0.1' 
const { Libreria } = require('./recursos/libreria.js')
//const libreria  = require('./recursos/libreria.js')
const { validarDisponibilidad, descontarStock } = require('./controller.js')

const server = express()

server.get('/', (req, res) => {
    res.send('<h1>Bienvenido al servidor del primer parcial de Apellido Nombre</h1>')
})

server.get('/api/libreria', (req, res) => {
    res.send(JSON.stringify(Libreria.articulos))
})

server.get('/api/libreria/:id', (req, res) => {
    const id = req.params.id
    const elementoEncontrado = Libreria.articulos.find( elemento => {
        console.log(elemento)
        return elemento.id == id
    })

    if( elementoEncontrado != undefined){
        res.status(200).send( JSON.stringify(elementoEncontrado))
    }else {
        res.status(404).send(`No se encontró ningun elemento con el id: ${id}`)
    }
})

server.get('/api/libreria/:id/:cantidad', (req, res) => {
    const id = req.params.id
    const cantidad = req.params.cantidad
    const elementoEncontrado = Libreria.articulos.find( elemento => {
        return elemento.id == id
    })

    if( elementoEncontrado != undefined){
        validarDisponibilidad(elementoEncontrado, cantidad)
            .then( response => {
                console.log(response)
                return descontarStock(response)
            })
            .then( response => {
                console.log(response)
                res.status(200).send( JSON.stringify(elementoEncontrado))
            })
            .catch( error => {
                console.log(error)
                res.status(404).send(error)
            })
        
    }else {
        res.status(404).send(`Erro no se encontró articulos con el id: ${id}`)
    }

})

server.listen(PUERTO, HOST, () => {
    console.log(`servidor corriendo en localhost en: http://${HOST}:${PUERTO}`)
})