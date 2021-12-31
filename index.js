const restify = require('restify');
const errs = require('restify-errors');


const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        user : 'flavio',
        password : '1234',
        database : 'ovo'
    }
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());



server.listen(2000, function () {
    console.log('%s listening at %s', server.name, server.url);
});


server.get('/', function (req, res, next) {
    
    knex('vendas').then((dados)=>{
        res.send(req.params);
    })
    
    return next();
});

server.post('/create', function (req, res, next) {
    
    knex('vendas')
    .insert(req.body)
    .then((dados)=>{
        if(!dados) return res.send(new errs.BadRequestError('dadso não encontrado'))
        res.send('dados criados');
    }, next)
    
    
});

server.put('/update/:dia', function (req, res, next) {
    const{id}=req.params
    knex('vendas')
    .where('dia',dia)
    .update(req.body)
    .then((dados)=>{
        if(!dados) return res.send(new errs.BadRequestError('dados não encontrado'))
        res.send('dados atualizados');
    }, next)
    
    
});

server.get('/show/:dia', function (req, res, next) {
    const{id}=req.params
    knex('vendas')
    .where('dia',dia)
    .first()
    .then((dados)=>{
        if(!dados) return res.send(new errs.BadRequestError('dadso não encontrado'))
        res.send(dados);
    }, next)
    
    
});

server.del('/delete/:dia', function (req, res, next) {
    const {id}=req.params
    knex('vendas')
    .where('dia',dia)
    .delete()
    .then((dados)=>{
        if(!dados) return res.send(new errs.BadRequestError('dadso não encontrado'))
        res.send('dados deletados');
    }, next)
    
    
});