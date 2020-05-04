const express = require('express');
const app = express();
const Account = require("./../models/account")
const port = 3008;

app.use(express.json())

app.get("/account/:id", async (req, res) => {
   try{
      const account = await Account.getById(req.params.id)
      res.send(account)

   }catch(err){
      res.status(400).send(err.message)

   }
})

app.post("/account", (req, res) => {
   try{
      let account = {name: req.body.name, balance: req.body.balance}
      let validatedAccount = Account.validate(account)
      let savedAccount = Account.save(validatedAccount)
      console.log(savedAccount)
      res.send(savedAccount)

   }catch(err){
      res.status(400).send(err.message)

   }
})

app.post("/account/withdraw", (req, res) => {
   try{
      let withdraw = {id: req.body.id, value: req.body.value}
      let account = Account.withdraw(withdraw)
      res.send(account)

   }catch(err){
      res.status(400).send(err.message)

   }
})

app.post("/account/deposit", (req, res) => {
   try{
      let deposit = {id: req.body.id, value: req.body.value}
      let account = Account.deposit(deposit)
      res.send(account)

   }catch(err){
      res.status(400).send(err.message)

   }
})

app.all('/', (request, response) => {
   switch (request.method) {
      case 'GET':
         response.send("Hello World - AEWWWWWW você utilizou o verbo " + request.method)
         break;
      case 'POST':
         response.send("Hello World - Show de bola, você utilizou o verbo " + request.method)
         break;
      case 'DELETE':
         response.send("Hello World - O verbo utilizado (" + request.method + ") serve para... Deletar!!!!")
         break;
      case 'PATCH':
         response.send("Hello World - Muito top você utilizou o verbo " + request.method)
         break;
      default:
         response.send("Hello World - o método utilizado foi o " + request.method)
         break;
   }

});

app.get('/teste?', (request, response) => {
   response.send('/teste?')
});

app.get('/buzz+', (request, response) => {
   response.send('/buzz+')
});

app.get('/one*Blue', (request, response) => {
   response.send('/one*Blue')
});

app.get('/testParam/:id', (request, response) => {
   response.send(request.params.id)
});

app.get(/.*Red/, (request, response) => {
   response.send('/.*Red/')
});

app.post('/test(ing)?', (request, response) => {
   response.send('/test(ing)?')
});

app.get('/testMultipleHandlers', (request, response, next) => {
   console.log('First method')
   next()
}, (_, res) => {
   console.log('Second method')
   res.send('/testMultipleHandlers')
   res.end()
});

const callback1 = (request, response, next) => {
   console.log('callback1')
   next()
}

const callback2 = (request, response, next) => {
   console.log('callback2')
   response.send('callback')
   response.end()
}

app.get('/testMultipleHandlersArray', [callback1, callback2])

app.route('/testRoute')
    .get((req, res) => {
       res.end();
    })
    .post((req, res) => {
       res.end()
    })
    .delete((req, res) => {
       res.end()
    })

app.listen(port, () => {
   console.log(`App listening on port ${port}`);
});