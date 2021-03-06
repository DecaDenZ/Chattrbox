'use strict';

class Store {
   constructor(storageApi) {
      this.api = storageApi;
   }
   get() {
      return this.api.getItem(this.key);
   }

   set(value) {
      this.api.setItem(this.key, value);
   }
}

//класс для создания хранилища списка активных юзеров в sessionStorage
export class UserStore extends Store {
   constructor(key) {
      super(sessionStorage);
      this.key = key;
   }
}

//класс для создания хранилища списка сообщений в sessionStorage
export class MessageStore extends Store {
   constructor(key) {
      super(sessionStorage);
      this.key = key;
   }
}

//класс для хранения значения комнаты в котрой находится юзер
export class RoomStore extends Store {
  constructor(key) {
    super(sessionStorage);
    this.key = key;
  }
}
