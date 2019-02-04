const express = require('express')
const cors = require('cors')
const app = express()
const port = 2000

//CORS 
app.use(cors());

// GET CONTEUDOS
  function getConteudos(){
  return Conteudos.findAll({
    attributes : ['id', 'img', 'tituloBloco', 'texto', 'link', 'alt']
  })
  .then(data => data.map( c => c.dataValues))
}

app.get('/conteudos',function(req, res, next){ 
    getConteudos()
      .then((d) => res.send(d))
})
// END OF GET CONTEUDOS


// Sequelize Configuratins //
const Sequelize = require('sequelize')
const sequelize = new Sequelize('tcc','root','',{
  host:'localhost',
  dialect: 'mysql',
  operatorAliases:false,

  pool:{
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})

sequelize
    .authenticate()
    .then(() => {
      console.log('Conectado.')
    })
    .catch(err => {
      console.error('NÃO FUNCIONOU.')
    })





const Conteudos = sequelize.define('conteudos', {
  id:{
    type : Sequelize.INTEGER,
    primaryKey :true
  },
  img:{
    type : Sequelize.STRING
  },
  tituloBloco:{
    type : Sequelize.STRING
  },
  texto:{
    type : Sequelize.STRING
  },
  link:{
    type : Sequelize.STRING
  },
  alt:{
    type : Sequelize.STRING
  },
  visualizacoes:{
    type : Sequelize.INTEGER
  },
  createdAt:{
    type : Sequelize.DATE,
  },
  updatedAt:{
    type : Sequelize.DATE,
  }
})

// End of Sequelize Configuratins //




// app.patch('/form', (req, res)).then(res.send(data))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
