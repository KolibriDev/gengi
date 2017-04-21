const app = require('./app')

app.listen(app.get('port'), () => {
  console.log(`Gengi API listening on port ${app.get('port')}`)
})

module.exports = app
