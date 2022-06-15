const app = require('./app')
const {conn} = require('./db.js')

conn.sync({force:false}).then(()=>{
    app.listen(app.get('port'))
    console.log('server on port', app.get('port'))
})