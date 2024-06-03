// const WebSocket = require("ws");
const { GAME_OVER, INIT_GAME, MOVE } = require("./messages");

class Game {
  constructor(player1, player2,room,mode,state) {
    this.player1 = player1;
    this.room=room;
    this.mode=mode;
    this.state=state;
    this.player2 = player2;
    this.startTime = new Date();
    this.moveCount = 0;

    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          room:room,
          color: "white",
          turns:0,
          mode:mode

        },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          room:room,
          color: "black",
          turns:0,
          mode:mode
        },
      })
    );
    // this.player2.send(
    //   JSON.stringify({
    //     type: "updateData",
    //     state: this.state,
    //   })
    // );

    // this.player1.send(
    //   JSON.stringify({
    //     type: "updateData",
    //     state: this.state,
    //   })
    // );

  }
  // changemode(socket ,selectMode){
  //   this.mode=selectMode;
  //   this.player1.send(JSON.stringify({
  //     type:"selectedChange",
  //     room:this.room,
  //     selectedIndex:this.mode,
  //   }))
  //   this.player2.send(JSON.stringify({
  //     type:"selectedChange",
  //     room:this.room,
  //     selectedIndex:this.mode,
  //   }))
  // }
  makeMoves(socket, state) {
    // Validate the type of move using zod

    try {
      this.moveCount++;
      if(this.player2!==socket){

        this.player2.send(
          JSON.stringify({
            type: "updateData",
            state: state,
          })
        );
        this.player2.send(
            JSON.stringify({
                type:"turnUpdate",

            })
        )   
      }
      if(this.player1!==socket){

        this.player1.send(
          JSON.stringify({
            type: "updateData",
            state: state,
          })
        );
        this.player1.send(
            JSON.stringify({
                type:"turnUpdate",
            })
        )
      }
      
    } catch (e) {
      console.log(e);
      return;
    }

    // if (isGameOver()) {
    //     // Send the game over message to both players
    //     this.player1.emit(JSON.stringify({
    //         type: GAME_OVER,
    //         payload: {
    //             winner: this.board.turn() === "w" ? "black" : "white"
    //         }
    //     }));
    //     this.player2.emit(JSON.stringify({
    //         type: GAME_OVER,
    //         payload: {
    //             winner: this.board.turn() === "w" ? "black" : "white"
    //         }
    //     }));
    // }
  }
}

module.exports = { Game };
