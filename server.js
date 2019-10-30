const express = require('express'); // importing a CommonJS module
const helmet = require ('helmet');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// the three amigos
function datelogger(req,res,next){
console.log(new Date().toISOString());

next();
}

function gateKeeper(req, res, next) {
  // data can come in the body, url parameters, query string, headers
  // new way of reading data sent by the client
  const password = req.headers.password || '';
  if (password.toLowerCase() === 'mellon') {
    next();
  } else {
    res.status(400).json({ you: 'cannot pass!!' });
  }
}

function logger(req, res, next){
  console.log(
    `The Logger:[${new Date().toISOString()}] ${ req.method} to $(req.url)`
  );
  next()
}

function gateKeeper(req,res,next){
  //data can come in the body, url parameter, query string, headers
  //new way of reading data sent by the client
  const password = req.headers.password;

  if(password.toLowerCase()=== 'melon'){
    next();

  }else{
    res.status(400).json({you:'cannot pass!!!'});
  }
}

/ change the gatekeeper to return a 400 if no password is provided and a message
// that says please provide a password
// if a password is provided and it is mellon, call next, otherwise return a 401
// and the you shall not pass message

//global middleware
server.use(helmet); //third party
server.use(express.json());//built-in

server.use(datelogger);//custom middleware
server.use(logger);
server.use(morgan());

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
