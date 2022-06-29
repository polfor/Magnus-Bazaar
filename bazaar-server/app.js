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
const { electron } = require("webpack");

var rooms = []

SocketIo.on('connection', socket => {
    socket.on('createroom', data => {
        let roomname = randomWords({
            exactly: 3,
            join: '',
            formatter: (word) => {
                return word.slice(0, 1).toUpperCase().concat(word.slice(1))
            }
        });

        while (rooms[roomname] != undefined) {
            roomname = randomWords({
                exactly: 3,
                join: '',
                formatter: (word) => {
                    return word.slice(0, 1).toUpperCase().concat(word.slice(1))
                }
            });
        }

        rooms[roomname] = { player1: data.name, player2: "" };
        socket.join(roomname);
        console.log('le joueur ' + playername + ' (socket ' + socket.id + ') a rejoit le salon ' + roomname);
        SocketIo.to(roomname).emit("roomjoined", { room: roomname });
    });

    socket.on('joinroom', data => {
        let roomname = data.room
        let playername = data.name;

        if (rooms[roomname] != undefined) {
            if (SocketIo.of("/").adapter.rooms.get(roomname).size < 2) {
                rooms[roomname].player2 = playername;
                socket.join(roomname);
                console.log('le joueur ' + playername + ' (socket ' + socket.id + ') a rejoint le salon ' + roomname);
                SocketIo.to(roomname).emit("roomjoined", { room: roomname });
                if (SocketIo.of("/").adapter.rooms.get(roomname).size == 2) {
                    console.log(SocketIo.of("/").adapter.rooms.get(roomname).values())
                    console.log(rooms[roomname]);
                }
            } else {
                socket.emit("alert", { type: "error", message: "Il y a déjà 2 joueurs dans ce salon" })
            }
        } else {
            socket.emit("noroom", { room: roomname })
            console.log('le joueur ' + playername + ' (socket ' + socket.id + ') a essayé de rejoindre le salon ' + roomname + ' mais il n\'existe pas');
        }
    })
})


Http.listen(3000, () => {
    console.log('listening at 3000');
})

let game = new Game()
game.createGame()