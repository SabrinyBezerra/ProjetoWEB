 // Recursos para criar nosso servidor
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const postgres = require('pg-hstore')

const sequelize = new Sequelize({
  host: 'localhost',
  username: 'postgres',
  password: 'sabriny123',
  database: 'Test',
  dialect: 'postgres',
  port: 65362,
  operatorsAliases: false
});

// Teste de comunicação com o banco de dados
sequelize
  .authenticate()
  .then(
    console.log('Connection has been established successfully.')
  )
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  // definindo nossa primeira tabela
  const acidente = sequelize.define('acidente', 
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
   pesid: {
      type: Sequelize.STRING
    },
    data_inversa: {
      type: Sequelize.STRING
    },
     dia_semana: {
      type: Sequelize.STRING
    },
    horario: {
      type: Sequelize.STRING
    },
    uf: {
      type: Sequelize.STRING
    },
    br: {
      type: Sequelize.STRING
    },
    km: {
      type: Sequelize.STRING
    },
    municipio: {
      type: Sequelize.STRING
    },
  causa_principal: {
      type: Sequelize.STRING
    },
    causa_acidente: {
      type: Sequelize.STRING
    },
    ordem_tipo_acidente: {
      type: Sequelize.INTEGER
    },
   tipo_acidente: {
      type: Sequelize.STRING
    },
    classificacao_acidente: {
      type: Sequelize.STRING
    },
    fase_dia: {
      type: Sequelize.STRING
    },
   sentido_via: {
      type: Sequelize.STRING
    },
    condicao_metereologica: {
      type: Sequelize.STRING
    },
    tipo_pista: {
      type: Sequelize.STRING
    },
    tracado_via: {
      type: Sequelize.STRING
    },
    uso_solo: {
      type: Sequelize.STRING
    },
    id_veiculo: {
      type: Sequelize.STRING
    },
    tipo_veiculo: {
      type: Sequelize.STRING
    },
    marca: {
      type: Sequelize.STRING
    },
    ano_fabricacao_veiculo: {
      type: Sequelize.STRING
    },
    tipo_envolvido: {
      type: Sequelize.STRING
    },
    estado_fisico: {
      type: Sequelize.STRING
    },
    idade: {
      type: Sequelize.STRING
    },
    sexo: {
      type: Sequelize.STRING
    },
    ilesos: {
      type: Sequelize.INTEGER
    },
    feridos_leves: {
      type: Sequelize.INTEGER
    },
    feridos_graves: {
      type: Sequelize.INTEGER
    },
    mortos: {
      type: Sequelize.INTEGER
    },
    latitude: {
      type: Sequelize.STRING
    },
    longitude: {
      type: Sequelize.STRING
    }
  });

  // acidente.schema("public");
  sequelize.sync({
    force: true,
    options: {
      schema: "public"
    }
  }).then(() => acidente.create({
    longitude: "0"
  })).then(() => {
    console.log("criou")
  }).done();
// ponto de partida da aplicação
const app = express();

// definir a porta da aplicação
// const port = 3000;
const port = '3000';

// configurar a porta
app.set('port', port);

// convertendo o corpo da requisição para JSON
app.use(bodyParser.json());

// criando o servidor http
const server = http.createServer(app);

// Definindo a porta que o servidor vai ouvir
server.listen(port);

// definindo arquivo de rotas de acesso da aplicação
const router = express.Router();

// criando a primeira rota
// Método GET (READ)
// URL padrão /
// Parâmetros request, response e next
// Envia uma resposta com status OK com um objeto
const getAll = router.get('/', (req, res, next) => {
  MyData.findAll().then(users => {
        res.status(200).send(users);
      });
});

// Adicionando a rota criada a aplicação
app.use('/', getAll);

// criando a pesquisa de um aluno apenas
const getById = router.get('/:id?', (req, res, next) => {
  const id = req.params.id;
  let filter = '';
  User.findById(id).then(users => {
      res.status(200).send(users);
  })
    // if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    // execSQLQuery('SELECT * FROM Alunos' + filter, res);
});

// Adicionando a rota criada a aplicação
app.use('/MyData', getById);

// criando a inserção de um novo aluno
//const insertAluno = router.post('/', (req, res, next) => {
  //const sql = `INSERT INTO Alunos(Nome,Endereco,Email,Senha) VALUES ('${req.body.Nome}','${req.body.Endereco}','${req.body.Email}','${req.body.Senha}')`;
  //execSQLQuery(sql, res);
  //res.status(201).send();
//});

//app.use('/aluno', insertAluno);

// criando a atualização de um aluno
//const updateAluno = router.patch('/:id?', (req, res, next) => {
  //  const id = parseInt(req.params.id);
    //execSQLQuery(`UPDATE Alunos SET Nome='${req.body.Nome}', Endereco='${req.body.Endereco}', Email='${req.body.Email}', Senha='${req.body.Senha}' WHERE ID=${id}`, res);
//});

//app.use('/aluno', updateAluno);

// criando a exclusão de um aluno
//const deleteAluno = router.delete('/:id?', (req, res, next) => {
//  const id = parseInt(req.params.id);
  //execSQLQuery(`DELETE FROM Alunos WHERE ID=${id}`, res);
//})

//app.use('/aluno', deleteAluno);

console.log("SERVIDOR RODANDO!")
