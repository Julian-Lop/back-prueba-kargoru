const {Cotizaciones, Usuarios, Vehiculos} = require('../db.js')

async function getUserId(email){
    const userId = await Usuarios.findOne({where:{email:email}})
    return userId.id
}

exports.createQuote = async (req,res) => {
    const {email,origen,
        destino,fechaSalida,fechaLlegada,
        vehiculo,costo} = req.body

    try {
        if(!email || !origen
            || !destino || !fechaSalida || !fechaLlegada
            || !vehiculo || !costo) return res.status(400).json({message:'faltan datos'})
        
        let quote = await Cotizaciones.create({
            origenId:origen,
            destinoId:destino,
            fechaSalida:fechaSalida,
            fechaLlegada:fechaLlegada,
            costo:costo,
            usuarioId: await getUserId(email),
            vehiculoId:vehiculo
        })
        return res.status(201).json({message:'creado', cotizacion:quote})  
    } catch (error) {
       return res.status(500).json({message:error})
    }
}

exports.editQuote = async (req,res) => {
    const {id,email,origen,
        destino,fechaSalida,fechaLlegada,
        vehiculo,costo} = req.body
    try {
        if(!id) return res.status(400).json({message:'faltan datos'})
        let quoteEdited = await Cotizaciones.findOne({where:{id:id}})
        quoteEdited.set({
            origenId:origen,
            destinoId:destino,
            fechaSalida,
            fechaLlegada,
            costo,
            usuarioId:await getUserId(email),
            vehiculoId:vehiculo
        })

        quoteEdited = await quoteEdited.save()
        return res.status(201).json({message:'cotizacion editada', cotizacion:quoteEdited})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

exports.deleteQuote = async (req,res) => {
    const {id} = req.body
    try {
        if(!id) return res.status(400).json({message:'falta el id',borrado:false})
        const quoteDeleted = await Cotizaciones.findOne({where:{id:id}})
        await quoteDeleted.destroy()
        return res.status(201).json({message:"cotizacion eliminada", borrado:true})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

exports.getQuote = async (req,res) => {
    const{id} = req.params
    try {
        if(!id) return res.status(400).json({message:'faltan datos', cotizacion:false})
        const quote = await Cotizaciones.findOne({where:{id:id}})
        return res.status(200).json({message:'cotizacion obtenida', cotizacion:quote})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

exports.getAllQuotes = async (req,res) => {
    try {
        const quotes = await Cotizaciones.findAll({include: 
            [Usuarios,Vehiculos]
        })
        
        if(!quotes.length > 0) return res.status(400).json({message:'no hay cotizaciones', cotizaciones:false})
        return res.status(200).json({message:'cotizaciones obtenidas', cotizaciones:quotes})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}