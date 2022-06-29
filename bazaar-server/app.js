const Game = require("./game");
const Player = require('./player');
const Express = require("express");
const Http = require('http').Server(Express)
const SocketIo = require("socket.io")(Http, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
})
var randomWords = require('random-words');

var rooms = []

SocketIo.on('connection', socket => {
    socket.on('createroom', () => {
        let roomname = randomWords({
            exactly: 3,
            join: '',
            formatter: (word) => {
                return word.slice(0, 1).toUpperCase().concat(word.slice(1))
            }
        });
        rooms.forEach(existingroom => {
            if (roomname == existingroom) {
                roomname = randomWords({
                    exactly: 3,
                    join: '',
                    formatter: (word) => {
                        return word.slice(0, 1).toUpperCase().concat(word.slice(1))
                    }
                });
            }
        })
        rooms.push(roomname);
        socket.join(roomname);
        console.log('le socket ' + socket.id + ' a rejoit le salon ' + roomname);
        SocketIo.to(roomname).emit("roomjoined", { room: roomname });
    })

    socket.on('joinroom', data => {
        let roomname = data.room
        let exists = false;
        rooms.forEach(existingroom => {
            if (existingroom == roomname) {
                exists = true;
                if (SocketIo.of("/").adapter.rooms.get(roomname).size < 2) {
                    socket.join(roomname);
                    console.log('le socket ' + socket.id + ' a rejoint le salon ' + roomname);
                    SocketIo.to(roomname).emit("roomjoined", { room: roomname });
                    if (SocketIo.of("/").adapter.rooms.get(roomname).size == 2) {
                        console.log(SocketIo.of("/").adapter.rooms.get(roomname).values())
                    }
                } else {
                    socket.emit("alert", { message: "Il y a déjà 2 joueurs dans ce salon" })
                }
                return;
            }
        })
        if (exists == false) {
            socket.emit("noroom", { room: roomname })
            console.log('le socket ' + socket.id + ' a essayé de rejoindre le salon ' + roomname + ' mais elle n\'existe pas');
        }
    })
})


Http.listen(3000, () => {
    console.log('listening at 3000');
})

let game = new Game()
game.createGame()