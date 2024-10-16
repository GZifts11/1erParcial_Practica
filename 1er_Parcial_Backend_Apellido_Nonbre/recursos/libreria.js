const Libreria = { 
    articulos: [
        {
            id: 1,
            disponible: true,
            cantidad: 30,
            nombre: 'lapiz',
            color: 'negro',
            marca: 'stadler'
        },
        {
            id: 2,
            disponible: false,
            cantidad: 0,
            nombre: 'lapiz rojo',
            color: 'rojo',
            marca: 'pirulo'
        },
        {
            id: 3,
            disponible: true,
            cantidad: 35,
            nombre: 'lapicera',
            color: 'azul',
            marca: 'maped'
        },
        {
            id: 4,
            disponible: true,
            cantidad: 3,
            nombre: 'escuadra',
            color: 'verde transparente',
            marca: 'pizzini'
        }
    ]
}

//module.exports = { Libreria : Libreria} // Esto está bien - uso propiedad y valor
//module.exports = { Libreria } // Como uso mismo nombre para propiedad y valor no hace falta repetirlo y con
                                //uno solo alcanza pero tengo que respetar el nombre de lo que quiero exportar
//module.exports = { libreria : Libreria} // Esto está bien - uso propiedad y valor, a la propiedad le puedo poner el nombre que yo quiero
module.exports = { Libreria }