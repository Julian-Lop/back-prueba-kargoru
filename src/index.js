const app = require('./app')
const {conn} = require('./db.js')
const {loadTables} = require('./utils/index')

conn.sync({force:false}).then(()=>{
    loadTables()
    app.listen(app.get('port'))
    console.log('server on port', app.get('port'))
})