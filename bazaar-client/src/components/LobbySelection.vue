<template>
<div>
    <h1>Accueil</h1>

    <h2>Créer un salon</h2>
    <form id="createRoom" action="">
        <input type="submit" value="Créer">
    </form>
    
    <h2>Rejoindre un salon</h2>
    <form id="joinRoom" action="">
        <input type="text" placeholder="Nom du salon">
        <input type="submit" value="Rejoindre">
    </form>

</div>
</template>

<script>
export default {
    name: "LobbySeletion",
    props: ['socket'],
    mounted () {
        console.log(this.socket)
        const roomCreation = document.querySelector('#createRoom')
        const roomJoin = document.querySelector('#joinRoom')
        roomCreation.addEventListener('submit', e => {
            e.preventDefault()
            this.socket.emit("createroom");
        })
        roomJoin.addEventListener('submit', e => {
            e.preventDefault()
            this.socket.emit('joinroom', {room: e.target[0].value})
        })
        this.socket.on('roomjoined', data => {
            console.log("rejoint la salle "+ data.room)
        })
        this.socket.on('noroom', data => {
            console.log('La room '+ data.room + ' n\'existe pas');
        })
    },
}
</script>

<style>

</style>