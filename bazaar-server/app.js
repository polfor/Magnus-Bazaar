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
        console.log('le socket ' + socket.id + ' a rejoit la salle ' + roomname);
        SocketIo.to(roomname).emit("roomjoined", { room: roomname });
    })

    socket.on('joinroom', data => {
        let roomname = data.room
        let exists = false;
        rooms.forEach(existingroom => {
            if (existingroom == roomname) {
                exists = true;
                socket.join(roomname);
                console.log('le socket ' + socket.id + ' a rejoit la salle ' + roomname);
                SocketIo.to(roomname).emit("roomjoined", { room: roomname });
            }
        })
        if (exists == false) {
            socket.emit("noroom", { room: roomname })
            console.log('le socket ' + socket.id + ' a essayé de rejoindre la salle ' + roomname + ' mais elle n\'existe pas');
        }
    })
})


Http.listen(3000, () => {
    console.log('listening at 3000');
})