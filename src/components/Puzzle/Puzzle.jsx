import React from 'react';
// import './Puzzle.css';
import Draggable from 'react-draggable';
import Piece from '../Piece/Piece'
import socketIOClient from "socket.io-client";


var socket;
class Puzzle extends React.Component {
    constructor() {
        super();
        this.state = {
            endpoint: 'http://localhost:4000/',
            activeDrags: 0,
            puzzlePiece: [
                {x: 0, y: 0, drag: true, finalX: 350, finalY: 100}, 
                {x: 0, y: 0, drag: true, finalX: 450, finalY: 100},
                {x: 0, y: 0, drag: true, finalX: 550, finalY: 100},
                {x: 0, y: 0, drag: true, finalX: 650, finalY: 100},
                {x: 0, y: 0, drag: true, finalX: 750, finalY: 100},

                {x: 0, y: 0, drag: true, finalX: 350, finalY: 200},
                {x: 0, y: 0, drag: true, finalX: 450, finalY: 200},
                {x: 0, y: 0, drag: true, finalX: 550, finalY: 200},
                {x: 0, y: 0, drag: true, finalX: 650, finalY: 200},
                {x: 0, y: 0, drag: true, finalX: 750, finalY: 200},

                {x: 0, y: 0, drag: true, finalX: 350, finalY: 300},
                {x: 0, y: 0, drag: true, finalX: 450, finalY: 300},
                {x: 0, y: 0, drag: true, finalX: 550, finalY: 300},
                {x: 0, y: 0, drag: true, finalX: 650, finalY: 300},
                {x: 0, y: 0, drag: true, finalX: 750, finalY: 300},

                {x: 0, y: 0, drag: true, finalX: 350, finalY: 400},
                {x: 0, y: 0, drag: true, finalX: 450, finalY: 400},
                {x: 0, y: 0, drag: true, finalX: 550, finalY: 400},
                {x: 0, y: 0, drag: true, finalX: 650, finalY: 400},
                {x: 0, y: 0, drag: true, finalX: 750, finalY: 400},

                {x: 0, y: 0, drag: true, finalX: 350, finalY: 500},
                {x: 0, y: 0, drag: true, finalX: 450, finalY: 500},
                {x: 0, y: 0, drag: true, finalX: 550, finalY: 500},
                {x: 0, y: 0, drag: true, finalX: 650, finalY: 500},
                {x: 0, y: 0, drag: true, finalX: 750, finalY: 500},
            ],
        };
      }
    async componentDidMount(){
      //when mounted, push state to server.
      socket = socketIOClient(this.state.endpoint, {query: this.props.roomId});
      await socket.emit("init",{roomId:this.props.roomId});
      socket.once("init" , async (check) =>{
        //if(!check){
          //first player joining the room/ you scatter the pieces of puzzle
          this.scatter(this.state.puzzlePiece);
          this.state.puzzlePiece.forEach( async (p,i) => {
            //map through the whole pieces to scatter them
            await socket.emit("pushState", {piece:p, index:i})
            //25 piece emit
          })
        //}
        //else{
          //we need to request to recieve state from other user( since this is new player)
          await socket.emit("newPlayer")//1 anounce new player arrived(not create)
          await socket.on("fullPuzzleRecieve", (data) => {
            this.setState({puzzlePiece: data.pieces})
            //3
        })
      //}
    })
      //2
      await socket.on("newPlayerFound", async (data) => {
        await socket.emit("fullPuzzle", {
          pieces:this.state.puzzlePiece
        })
      })
      socket.on("callState", (data) =>{
        let newPuzzlePiece = [...this.state.puzzlePiece];
        newPuzzlePiece[data.index] = data.piece;
        this.setState({
          puzzlePiece: newPuzzlePiece
        })
      })
    }

    scatter = (pieces) => {
      pieces.forEach((p,pIndex) => {
        let randX = Math.floor(Math.random() * 1000); 
        let randY = Math.floor(Math.random() * 450) + 75;
        this.movePiece(pIndex, randX, randY);
      })
    }

    onStart = () => {
        this.setState({activeDrags: ++this.state.activeDrags});
      };
    
    onStop = (e, ui) => {
      this.setState({activeDrags: --this.state.activeDrags});
      this.checkPlacement(ui.node.id)
      // clearInterval(update)
    };

    checkPlacement =(p) => {
      const T = 15 //set tolerance in pixels
      if (this.state.puzzlePiece[p].x < this.state.puzzlePiece[p].finalX + T && this.state.puzzlePiece[p].x > this.state.puzzlePiece[p].finalX - T) {
        if (this.state.puzzlePiece[p].y < this.state.puzzlePiece[p].finalY + T && this.state.puzzlePiece[p].y > this.state.puzzlePiece[p].finalY - T) {
          let newPuzzlePiece = this.state.puzzlePiece
          newPuzzlePiece[p] = {...this.state.puzzlePiece[p], x: this.state.puzzlePiece[p].finalX, y: this.state.puzzlePiece[p].finalY, drag: false}
          this.setState({ puzzlePiece: newPuzzlePiece })
          socket.emit("pushState", {piece:newPuzzlePiece[p], index:p})
        }
      }
    }

    movePiece =(p, x, y) => {
      let newPuzzlePiece = this.state.puzzlePiece
      newPuzzlePiece[p] = {...this.state.puzzlePiece[p], x: x, y: y}
      this.setState({ puzzlePiece: newPuzzlePiece })
    }

    handleDrag = (e, ui) => {
        const i = ui.node.id
        let newPuzzlePiece = this.state.puzzlePiece
        newPuzzlePiece[i] = {...this.state.puzzlePiece[i],
        x: ui.x,
        y: ui.y}
        socket.emit("pushState", {piece:newPuzzlePiece[i], index:i})
        
        // socket.emit("update",{
        //   piece:newPuzzlePiece[i],
        //   index:i
        // });


        this.setState({
          puzzlePiece : newPuzzlePiece
    });
  };

  render(){
      const board = {x: "350px", y: "100px", size: "500px"};
      return(
        <div>
          <Draggable onStart={() => false}>
              <div className="board"
              style={{position: 'absolute', top: board.y, left: board.x, border: "1px dotted black", width: board.size, height: board.size}}>Puzzle Board</div>
          </Draggable >
          {this.state.puzzlePiece.map((p, i) => 
          <Piece 
          key={i}
          id={i}
          handleDrag={this.handleDrag}
          onStop={this.onStop}
          onStart={this.onStart}
          movePiece={this.movePiece}
          puzzlePiece={p} />
          )}
        </div>
        
      )

  }
}

export default Puzzle;