const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 2000
const md5 = require('md5');

//APP 
app.use(cors());
app.use(bodyParser.json())


//-------------------------------- CONTEUDOS --------------------------------

// GET CONTEUDOS
  function getConteudos(){
  return Conteudos.findAll({
    attributes : ['id', 'img', 'tituloBloco', 'texto', 'link', 'alt']
  })
  .then(data => data.map( c => c.dataValues))
}

// CONTEUDOS TELA INICIAL
app.get('/conteudos',function(req, res, next){ 
    getConteudos()
      .then((d) => res.send(d))
})

//CADASTRO CONTEÚDO
app.post('/form',function(req, res, next){ 
  const {imagem,titulo,texto} = req.body;
  sequelize.query("INSERT INTO conteudos (tituloBloco,texto,img) VALUES ('" + titulo + "','" + texto + "','" + imagem + "')",function(err){})
})

//ATUALIZAÇÃO CONTEÚDO
app.post('/update',function(req, res, next){ 
  const {id,imagem,titulo,texto} = req.body;
  sequelize.query("UPDATE conteudos set tituloBloco = '" + titulo + "', texto = '" + texto + "', img = '" + imagem + "' where conteudos.id = " + id,function(err){})
})

//EXCLUSÃO CONTEÚDO
app.post('/delete',function(req, res, next){ 
  const {id} = req.body;
  sequelize.query("DELETE from conteudos where conteudos.id = " + id,function(err){})
})

//-------------------------------- USUARIOS --------------------------------

function getUsuarios(){
  return Usuarios.findAll({
    attributes : ['nome', 'email', 'senha']
  })
  .then(data => data.map( e => e.dataValues))
}


function confirmaUser(req){
  const {emailLogin,passLogin} = req.body;
  const senhaCript = md5(passLogin)

  return Usuarios.find({
    attributes : ['nome', 'email', 'senha','tipo_usuario'],
    where:{
      email : emailLogin,
      senha: senhaCript
    }
  })
  .then(data => data.dataValues)
}



//CADASTRO DE USUÁRIO
app.post('/newuser',function(req, res, next){
  const {nome,pass,email,} = req.body;
  sequelize.query("INSERT INTO usuarios (nome,email,senha) VALUES ('" + nome + "','" + email + "', MD5('" + pass + "'))",function(err){})
})

//BUSCAR USUÁRIO
app.get('/usuarios',function(req, res, next){
  getUsuarios()
      .then((f) => res.send(f))
})

//CONFIRMAÇÃO LOGIN USUÁRIO
app.post('/confirmaUser',function(req, res, next){
  confirmaUser(req)
  .then((n) => res.send(n))
})


// Sequelize Configurations 
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

const Usuarios = sequelize.define('usuarios', {
  id:{
    type : Sequelize.INTEGER,
    primaryKey :true
  },
  nome:{
    type : Sequelize.STRING
  },
  email:{
    type : Sequelize.STRING
  },
  pass:{
    type : Sequelize.INTEGER
  },
  tipo_usuario:{
    type : Sequelize.STRING
  },
  alt:{
    type : Sequelize.STRING
  },
  visualizacoes_usuario:{
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
