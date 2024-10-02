const express = require('express')
const PORT = 3000
const HOSTNAME = '127.0.0.1'

const { alumnos } = require('./src/alumnos.js')
const { validarCorrelativa, inscribirAlumno } = require('./controller.js')

const app = express()

app.get("/", (req, res) => {
    console.log("Estoy ingresando a la ruta raiz de mi servidor")
    res.send("<h1>INGRESANDO A LA RUTA RAIZ</h1>")
})

app.get("/api/", (req, res) => {
    console.log("Estoy ingresando a /api/")
    res.send("<h1>INGRESANDO A /API</h1>")
})

app.get("/api/alumnos/", (req, res) => {
    console.log("Estoy ingresando a /api/")
    res.end(JSON.stringify(alumnos))
})

app.get("/api/alumnos/frontend", (req, res) => {
    console.log("Estoy ingresando a /api/alumnos/frontend")
    res.end(JSON.stringify(alumnos.frontend))
})

app.get("/api/alumnos/backend", (req, res) => {
    console.log("Estoy ingresando a /api/alumnos/backend")
    res.end(JSON.stringify(alumnos.backend))
})

const miFuncionFiltro = (alumno) => {
    alumno.turno.toLocaleLowerCase() === turno
    console.log("Alumno: " + alumno)
}

app.get("/api/alumnos/frontend/:turno", (req, res) => {
    const turno = req.params.turno.toLocaleLowerCase();
    console.log("Turno " + turno)
    console.log("Estoy ingresando a /api/alumnos/frontend")
    const filtrado = alumnos.frontend.filter(
        (alumno) => alumno.turno.toLocaleLowerCase() == turno
    );

    if(filtrado.length === 0){
        res.status(404).end(`No se encontraron alumnos en el turno ${turno}`)
    }else{
        console.log(filtrado)
        //res.status(200).end(JSON.stringify(filtrado))
        res.status(200).send(JSON.stringify(filtrado))
    }
    
})

/* app.get("/api/alumnos/frontend/validarCorrelativa/:id", (req, res) => {
    const id = req.params.id
    console.log(`id: ${id}`)
    const alumnoEncontrado = alumnos.frontend.find(
        alumno => {
            console.log(`alumno: ${alumno}`)
            return alumno.id == id
        })
        
        if( alumnoEncontrado != undefined){
            validarCorrelativa(alumnoEncontrado)
                .then( response => { 
                    console.log(response)
                    res.send(response)
                })
                .catch( error => {
                    console.log("catch() - entre al catch")
                    console.log(error)
                    res.send(error)
                }
                )
        }else {
            res.status(404).send(`No se encontró ningún alumno con el id: ${id} `)
        }
}) */

app.get("/api/alumnos/frontend/inscribir_examen/:id/:materia", (req, res) => {
    const id = req.params.id
    const materia = req.params.materia
    console.log(`id: ${id}`)
    const alumnoEncontrado = alumnos.frontend.find(
        alumno => {
            console.log(`alumno: ${alumno}`)
            return alumno.id == id
        })
        
        if( alumnoEncontrado != undefined){
            validarCorrelativa(alumnoEncontrado, materia)
                .then( response => { 
                    console.log(response)
                    //res.send(response)
                    return inscribirAlumno(alumnoEncontrado, materia)
                })
                .then( response => {
                    console.log(`response de inscribirAlumno: ${response}`)
                    res.send(response)
                })
                .catch( error => {
                    console.log("catch() - entre al catch")
                    console.log(error)
                    res.send(error)
                }
                )
        }else {
            res.status(404).send(`No se encontró ningún alumno con el id: ${id} `)
        }
})

app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}/`)
})




