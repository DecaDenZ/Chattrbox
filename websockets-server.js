
'use strict';

var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
// var chatBot = require('./src/chatbot');
var port = 3001;
var ws = new WebSocketServer({
   port: port
});

var password = 'swordfish'; // общий пароль доступа к чату
var messages = []; // хранилище сообщений
var activeUsers = []; //хранилище списка активных юзеров

console.log('websockets server started');

function sendMessagesArchive(socket) { //рассылаем архив сообщений новому подключению
   messages.forEach((msg) => {
      socket.send(msg);
   });
};

ws.on('connection', (socket) => {
   console.log('client connection established');

   // chatBot.sayHelloToNewUser(socket);
   // socket.send('enter the password');

   // if (socket.isAuthorized) {
   sendMessagesArchive(socket);
   // };

   // эхо сервер
   socket.on('message', (data) => { // при получении сообщения добавляем его в хранилище

// временно убрал требование авторизации для подключения, потом завернуть этот кусок в функцию
      // if (!socket.isAuthorized) {
      //    if (data === password) {
      //       socket.isAuthorized = true;
      //       socket.send('Welcome to CHATTRBOX!');
      //       sendMessagesArchive(socket);
      //    } else {
      //       socket.send('you are not Authorized, please enter the password:');
      //    };
      // } else
      {
         // console.log('message received: ' + data);

         //вытягиваем из сообщения имя пользователя, если в списке активных его нет, добавляем
         let user = JSON.parse(data).user;
         if (activeUsers.indexOf(user) === -1) {
            activeUsers.push(user);
         }

         messages.push(data);
         ws.clients.forEach((clientSocket) => {
            // if (clientSocket.isAuthorized) {
            clientSocket.send(data);
            // };
         });
         // если в сообщении есть обращение к боту, сообщение передается
         // на обработку чатботу, и данные пользователя, которому нужно направить ответ
         if (data.indexOf('Robo') !== -1){
            chatBot.listenMessage(data, socket);
         }

      };
   });

   socket.on('close', (event) => {
      console.log('connection is closed' + event);
   });

});
