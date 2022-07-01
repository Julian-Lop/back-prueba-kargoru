const {Vehiculos,Lugares} = require('../db')

const vehicles = [{nombre:'terrestre'},{nombre:'aereo'}]
const locations = [
    {nombre:'Bogota'},{nombre:'Cali'},{nombre:'Medellin'},
    {nombre:'Manizales'},{nombre:'Barranquilla'},{nombre:'Buenaventura'},
    {nombre:'Pasto'},{nombre:'Popayan'}
]

exports.loadTables = () => {

    vehicles.map(vehicle => {
        const createv = async () => {
            let v = await Vehiculos.findOrCreate({
                where:{nombre: vehicle.nombre}
            })
        }
        createv()
    })

    locations.map(location => {
        const createl = async () => {
            let l = await Lugares.findOrCreate({
                where:{nombre: location.nombre}
            })
        }
        createl()
    })
}