const WebSocket = require("ws");
const { INIT_GAME, MOVE } = require("./messages");
const { Game } = require("./Game");

class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser =null;  //[['1',socket],['2',socket]]
        this.users = [];
    }

    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
        // Stop the game here because the user left
    }

    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());

            if (message.type === INIT_GAME) {
                if (this.pendingUser) {
                    console.log("pendingUser");
                    const game = new Game(this.pendingUser, socket ,message.room,message.mode,message.state);
                    this.games.push(game);
                    
                } else {
                    console.log("otherUser");
                    this.pendingUser = socket;
                }
            }

            if (message.type === "update") {
                console.log("inside move");
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    console.log("inside makemove");
                    game.makeMoves(socket, message.state);
                }
            }
            if(message.type==="selectedChange"){
                const game = this.games.find(game => game.code===message.room || game.player1 === socket || game.player2 === socket);
                game.changemode(socket, message.selectedIndex);
            }


        });
    }
}

module.exports = { GameManager };
