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
const IAGame = require("./ia-game");

var rooms = []

var games = []

var iaIndex = []

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

        rooms[roomname] = { player1: { name: data.name, socket: socket }, player2: {} };
        socket.join(roomname);
        console.log('le joueur ' + data.name + ' (socket ' + socket.id + ') a rejoint le salon ' + roomname);
        SocketIo.to(roomname).emit("roomjoined", { room: roomname, roomReady: false });
    });

    socket.on('joinroom', data => {
        let roomname = data.room
        let playername = data.name;

        if (rooms[roomname] != undefined) {
            if (SocketIo.of("/").adapter.rooms.get(roomname).size < 2) {
                if (!Object.getOwnPropertyNames(rooms[roomname].player2).length) {
                    if (rooms[roomname].player1.name != playername) {
                        rooms[roomname].player2 = { name: playername, socket: socket };
                        socket.join(roomname);
                        console.log('le joueur ' + playername + ' (socket ' + socket.id + ') a rejoint le salon ' + roomname);
                        SocketIo.to(roomname).emit("roomjoined", { room: roomname });
                        if (SocketIo.of("/").adapter.rooms.get(roomname).size == 2) {
                            startGame(roomname);
                        }
                    } else {
                        socket.emit("alert", { type: "error", message: "Ce nom est déjà pris" })
                    }
                } else {

                    if (rooms[roomname].player1.name == playername && !games[roomname].isPlayerConnected(0)) {
                        socket.join(roomname);
                        games[roomname].changePlayerSocket(0, socket);

                    } else {
                        if (rooms[roomname].player2.name == playername && !games[roomname].isPlayerConnected(1)) {
                            socket.join(roomname);
                            games[roomname].changePlayerSocket(1, socket);
                        } else {
                            socket.emit("alert", { type: "error", message: "Il y a déjà 2 joueurs dans ce salon (et tu n'es pas l'un d'eux)" })
                        }
                    }

                }
            } else {
                socket.emit("alert", { type: "error", message: "Il y a déjà 2 joueurs dans ce salon" })
            }
        } else {
            socket.emit("noroom", { room: roomname })
            console.log('le joueur ' + playername + ' (socket ' + socket.id + ') a essayé de rejoindre le salon ' + roomname + ' mais il n\'existe pas');
            socket.emit("alert", { type: "error", message: "Le salon " + roomname + " n'existe pas" })

        }
    })

    socket.on('ia-create', () => {
        games['ia-' + iaIndex++] = new IAGame(SocketIo, new Player(socket, "Vous"));
    })

    socket.on('leave', data => {
        socket.leave(data.room);
    })

    socket.on('rank', () => {
        let endedGames = games.map(game => {
            if (game.isEnded()) {
                return game
            }
        })

        endedGames.sort((a, b) => {
            return a.getScores().score - b.getScores().score
        })

        let scoreBoard = endedGames.map(game => {
            return {
                name: game.getScores().name,
                score: game.getScores().score
            }
        })

        socket.emit('leaderboard', scoreBoard);
    })

})


SocketIo.of('/').adapter.on('delete-room', (room) => {
    rooms.splice(rooms.indexOf(rooms[room]))
})

SocketIo.of('/').adapter.on('leave-room', (room, id) => {
    if (rooms[room]) {
        SocketIo.to(room).emit('opponent-left');
        SocketIo.to(id).emit('player-left');
    }
})


Http.listen(3000, () => {
    console.log('listening at 3000');
})



function startGame(roomName) {
    games[roomName] = new Game(SocketIo, roomName, new Player(rooms[roomName].player1.socket, rooms[roomName].player1.name), new Player(rooms[roomName].player2.socket, rooms[roomName].player2.name));
    let waitingRestart = 0;
    let restarts = 1;
    rooms[roomName].player1.socket.on('restart', () => {
        if (waitingRestart == 0) {
            SocketIo.to(roomName).emit('waiting-restart');
            waitingRestart = 1;
        } else {
            games[roomName + restarts++] = new Game(SocketIo, roomName, new Player(rooms[roomName].player1.socket, rooms[roomName].player1.name), new Player(rooms[roomName].player2.socket, rooms[roomName].player2.name))
            waitingRestart = 0;
        }
    })

    rooms[roomName].player2.socket.on('restart', () => {
        if (waitingRestart == 0) {
            SocketIo.to(roomName).emit('waiting-restart');
            waitingRestart = 1;
        } else {
            games[roomName + restarts++] = new Game(SocketIo, roomName, new Player(rooms[roomName].player1.socket, rooms[roomName].player1.name), new Player(rooms[roomName].player2.socket, rooms[roomName].player2.name))
            waitingRestart = 0;
        }
    })
}