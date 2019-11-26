var http = require('http');
var fs = require('fs');
var extract = require('./extract');

var handleError = function (err, res) {
   res.writeHead(404);
   res.end();
};

var server = http.createServer((req, res) => {
   console.log('Responding to a request.');
   var filePath = extract(req.url);
   fs.readFile(filePath, function (err, data){
     console.log(data);
      if (err) {
         handleError(err, res);
         return;
         // filePath = '404';
      } else {
         res.end(data);
      }
   });
});

server.listen(3000);
