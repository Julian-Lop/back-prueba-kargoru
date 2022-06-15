const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/index.js')

require('./db.js');

const app = express()

app.set('port', process.env.PORT || 3001)


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/', (req,res) => {
    res.status(200).json({message:'api funciona'})
})

app.use('/', routes)

module.exports = app