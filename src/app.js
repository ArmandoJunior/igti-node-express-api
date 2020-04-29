const express = require('express');
const app = express();
const port = 3008;

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
});

app.listen(port, () => {
   console.log(`App listening on port ${port}`);
});