const {Cotizaciones, Usuarios, Vehiculos} = require('../db.js')

async function getUserId(email){
    const userId = await Usuarios.findOne({where:{email:email}})
    return userId.id
}

exports.createQuotation = async (req,res) => {
    const {email,origen,
        destino,fechaSalida,fechaLlegada,
        vehiculo,costo} = req.body

    try {
        if(!email || !origen
            || !destino || !fechaSalida || !fechaLlegada
            || !vehiculo || !costo) return res.status(400).json({message:'faltan datos'})
        
        let quotation = await Cotizaciones.create({
            origenId:origen,
            destinoId:destino,
            fechaSalida:fechaSalida,
            fechaLlegada:fechaLlegada,
            costo:costo,
            usuarioId: await getUserId(email),
            vehiculoId:vehiculo
        })
        return res.status(201).json({message:'creado', cotizacion:quotation})  
    } catch (error) {
       return res.status(500).json({message:error})
    }
}

exports.editQuotation = async (req,res) => {
    const {id,email,origen,
        destino,fechaSalida,fechaLlegada,
        vehiculo,costo} = req.body
    try {
        if(!id) return res.status(400).json({message:'faltan datos'})
        let quotationEdited = await Cotizaciones.findOne({where:{id:id}})
        quotationEdited.set({
            origenId:origen,
            destinoId:destino,
            fechaSalida,
            fechaLlegada,
            costo,
            usuarioId:await getUserId(email),
            vehiculoId:vehiculo
        })

        quotationEdited = await quotationEdited.save()
        return res.status(201).json({message:'cotizacion editada', cotizacion:quotationEdited})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

exports.deleteQuotation = async (req,res) => {
    const {id} = req.params
    try {
        if(!id) return res.status(400).json({message:'falta el id',borrado:false})
        const quotationDeleted = await Cotizaciones.findOne({where:{id:id}})
        await quotationDeleted.destroy()
        return res.status(201).json({message:"cotizacion eliminada", borrado:true})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

exports.getQuotation = async (req,res) => {
    const{id} = req.params
    try {
        if(!id) return res.status(400).json({message:'faltan datos', cotizacion:false})
        const quotation = await Cotizaciones.findOne({include:[Usuarios,Vehiculos],where:{id:id}})
        return res.status(200).json({message:'cotizacion obtenida', cotizacion:quotation})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

exports.getAllQuotations = async (req,res) => {
    try {
        const quotations = await Cotizaciones.findAll({include: 
            [Usuarios,Vehiculos]
        })
        
        if(!quotations.length > 0) return res.status(400).json({message:'no hay cotizaciones', cotizaciones:false})
        return res.status(200).json({message:'cotizaciones obtenidas', cotizaciones:quotations})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}