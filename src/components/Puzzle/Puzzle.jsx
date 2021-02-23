import React from 'react';
// import './Puzzle.css';
import Draggable from 'react-draggable';
import Piece from '../Piece/Piece'

class Puzzle extends React.Component {
    constructor() {
        super();
        this.state = {
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

    onStart = () => {
        this.setState({activeDrags: ++this.state.activeDrags});
      };
    
    onStop = (e, ui) => {
      this.setState({activeDrags: --this.state.activeDrags});
      this.checkPlacement(ui.node.id)
    };

    checkPlacement =(p) => {
      const T = 15 //set tolerance in pixels
      if (this.state.puzzlePiece[p].x < this.state.puzzlePiece[p].finalX + T && this.state.puzzlePiece[p].x > this.state.puzzlePiece[p].finalX - T) {
        if (this.state.puzzlePiece[p].y < this.state.puzzlePiece[p].finalY + T && this.state.puzzlePiece[p].y > this.state.puzzlePiece[p].finalY - T) {
          let newPuzzlePiece = this.state.puzzlePiece
          newPuzzlePiece[p] = {...this.state.puzzlePiece[p], x: this.state.puzzlePiece[p].finalX, y: this.state.puzzlePiece[p].finalY, drag: false}
          this.setState({ puzzlePiece: newPuzzlePiece })
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